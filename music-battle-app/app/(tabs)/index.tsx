import React, { useState, useEffect } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";

// 👇 방금 만든 컴포넌트 불러오기 (경로: ../../components)
import RadarBackground from "../../components/RadarBackground";
import CenterUser from "../../components/CenterUser";
import FriendItem from "../../components/FriendItem";

export default function HomeScreen() {
  const route = useRoute();
  const { userId } = (route.params as any) || { userId: "내 기기" };

  const [friends, setFriends] = useState([
    { id: 1, name: "권*미", x: 50, y: -50 },
    { id: 2, name: "보너스 친구", x: -40, y: 20 },
    { id: 3, name: "사*훈", x: 0, y: 80 },
  ]);

  // 움직이는 로직
  useEffect(() => {
    const interval = setInterval(() => {
      setFriends((currentFriends) => {
        return currentFriends.map((friend) => ({
          ...friend,
          x: friend.x + (Math.random() * 20 - 10),
          y: friend.y + (Math.random() * 20 - 10),
        }));
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* 1. 배경 깔기 */}
        <RadarBackground />

        {/* 2. 내 기기 표시 */}
        <CenterUser userId={userId} />

        {/* 3. 친구들 표시 */}
        {friends.map((friend) => (
          <FriendItem
            key={friend.id}
            name={friend.name}
            x={friend.x}
            y={friend.y}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 맵 스크린은 지금 잠깐 안 쓸 거니까 주석 처리 해둘게요!
// import MapScreen from "./src/screens/MapScreen";

const { width } = Dimensions.get("window");

export default function App() {
  // --- 여기부터 레이더 로직 시작 ---
  const [friends, setFriends] = useState([
    { id: 1, name: "권*미", x: 50, y: -50 },
    { id: 2, name: "보너스 친구", x: -40, y: 20 },
    { id: 3, name: "사*훈", x: 0, y: 80 },
  ]);

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
  // --- 레이더 로직 끝 ---

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* 레이더 화면 UI */}
      <View style={styles.container}>
        {/* 1. 배경 원들 */}
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
        <View style={[styles.circle, styles.circle3]} />

        {/* 2. 내 기기 (가운데) */}
        <View style={styles.centerDevice}>
          <Image
            source={require("./assets/sogeun.png")}
            style={{ width: 40, height: 40, borderRadius: 10 }}
          />
        </View>

        {/* 3. 움직이는 친구들 */}
        {friends.map((friend) => (
          <View
            key={friend.id}
            style={[
              styles.friendContainer,
              {
                transform: [{ translateX: friend.x }, { translateY: friend.y }],
              },
            ]}
          >
            <Image
              source={require("./assets/sogeun.png")}
              style={styles.friendImage}
            />
            <Text style={styles.nameText}>{friend.name}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 999,
  },
  circle1: { width: width * 0.9, height: width * 0.9 },
  circle2: { width: width * 0.65, height: width * 0.65 },
  circle3: { width: width * 0.4, height: width * 0.4 },
  centerDevice: {
    width: 60,
    height: 60,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  friendContainer: {
    position: "absolute",
    alignItems: "center",
  },
  friendImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  nameText: {
    fontSize: 12,
    color: "#555",
    fontWeight: "bold",
  },
});

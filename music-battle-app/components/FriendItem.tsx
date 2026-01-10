import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface FriendProps {
  name: string;
  x: number;
  y: number;
}

export default function FriendItem({ name, x, y }: FriendProps) {
  return (
    <View
      style={[
        styles.friendContainer,
        { transform: [{ translateX: x }, { translateY: y }] },
      ]}
    >
      <Image
        // 🚨 위치가 바뀌어서 ../assets 입니다!
        source={require("../assets/images/tomato.png")}
        style={styles.friendImage}
      />
      <Text style={styles.nameText}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  friendContainer: { position: "absolute", alignItems: "center" },
  friendImage: { width: 50, height: 50, borderRadius: 25, marginBottom: 5 },
  nameText: { fontSize: 12, color: "#555", fontWeight: "bold" },
});

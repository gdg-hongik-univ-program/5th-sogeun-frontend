import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface CenterUserProps {
  userId: string;
}

export default function CenterUser({ userId }: CenterUserProps) {
  return (
    <View style={styles.centerDevice}>
      <Image
        // 🚨 여기도 ../assets 입니다!
        source={require("../assets/images/tomato.png")}
        style={{ width: 40, height: 40, borderRadius: 10 }}
      />
      <Text style={styles.centerText}>{userId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centerDevice: {
    width: 80,
    height: 80,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
  },
  centerText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "bold",
    color: "#FF7043",
  },
});

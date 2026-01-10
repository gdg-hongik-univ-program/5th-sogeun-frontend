import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function RadarBackground() {
  return (
    <>
      <View style={[styles.circle, styles.circle1]} />
      <View style={[styles.circle, styles.circle2]} />
      <View style={[styles.circle, styles.circle3]} />
    </>
  );
}

const styles = StyleSheet.create({
  circle: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 999,
  },
  circle1: { width: width * 0.9, height: width * 0.9 },
  circle2: { width: width * 0.65, height: width * 0.65 },
  circle3: { width: width * 0.4, height: width * 0.4 },
});

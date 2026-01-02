import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function MapScreen() {
  const [location, setLocation] = useState(null); // 내 위치 저장
  const [errorMsg, setErrorMsg] = useState(null); // 에러 메시지

  useEffect(() => {
    (async () => {
      // 1. 위치 권한 요청
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("위치 추적 권한을 허용해주세요!");
        return;
      }

      // 2. 현재 위치 한 번 가져오기 (초기 로딩용)
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      // 3. 실시간 위치 추적 시작 (여기가 핵심!)
      // 내가 움직일 때마다 location 상태를 업데이트함
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High, // 가장 높은 정확도
          timeInterval: 1000, // 1초마다 갱신
          distanceInterval: 1, // 1미터 움직일 때마다 갱신
        },
        (newLocation) => {
          setLocation(newLocation);
        }
      );
    })();
  }, []);

  // 위치를 못 가져왔을 때 로딩 화면
  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
        <Text>{errorMsg || "위치를 찾는 중..."}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        // 아이폰은 애플지도, 안드로이드는 구글지도가 뜸
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005, // 줌 레벨 (작을수록 확대)
          longitudeDelta: 0.005,
        }}
        showsUserLocation={true} // 내 위치 파란 점 표시 (지도 자체 기능)
        followsUserLocation={true} // 지도가 나를 따라다님
      >
        {/* 예시: 여기에 나중에 '적' 마커를 추가하면 됨 */}
        <Marker
          coordinate={{
            latitude: location.coords.latitude + 0.001, // 내 위치 살짝 위
            longitude: location.coords.longitude + 0.001,
          }}
          title="가상의 적"
          description="배틀을 신청하시겠습니까?"
          pinColor="red"
        />
      </MapView>

      <View style={styles.overlay}>
        <Text style={styles.text}>실시간 추적 중!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: "100%" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  overlay: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 10,
    borderRadius: 20,
  },
  text: { color: "white", fontWeight: "bold" },
});

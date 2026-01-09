import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const SERVER_URL = "http://15.164.164.66:8080/api/auth/login";

  const handleLogin = async () => {
    // 1. 빈칸 검사
    if (!id || !pw) {
      Alert.alert("알림", "아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      console.log("로그인 시도 중...", id);

      // 2. 서버로 전송
      const response = await axios.post(SERVER_URL, {
        loginId: id, // 🚨 서버가 'userId'를 원하면 여기를 'userId: id'로 바꾸세요!
        password: pw,
      });

      // 3. 성공 시 (200 OK 또는 201 Created)
      if (response.status === 200 || response.status === 201) {
        console.log("🎉 로그인 성공!", response.data);

        Alert.alert("환영합니다!", "소근소근에 오신 것을 환영해요.", [
          {
            text: "확인",
            onPress: () => {
              console.log("👉 (tabs) 폴더 안의 radar 화면으로 이동합니다.");

              // ✅ [핵심] (tabs) 네비게이터 안에 있는 radar 스크린으로 이동!
              navigation.replace("(tabs)", {
                screen: "radar",
                params: { userId: id }, // radar.tsx 로 아이디 전달
              });
            },
          },
        ]);
      }
    } catch (error) {
      // 4. 실패 시 에러 처리
      console.log("로그인 에러:", error);

      if (error.response) {
        // 서버가 거절한 경우 (비번 틀림 등)
        Alert.alert("로그인 실패", "아이디 또는 비밀번호를 확인해주세요.");
        console.log("서버 메시지:", error.response.data);
      } else if (error.request) {
        // 서버로 전송조차 못한 경우 (네트워크 문제)
        Alert.alert(
          "연결 오류",
          "서버와 연결할 수 없습니다. 와이파이를 확인해주세요."
        );
      } else {
        // 알 수 없는 오류
        Alert.alert("오류", "알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>

      {/* 아이디 입력 */}
      <TextInput
        style={styles.input}
        placeholder="아이디"
        placeholderTextColor="#A09085"
        value={id}
        onChangeText={setId}
        autoCapitalize="none"
      />

      {/* 비밀번호 입력 */}
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor="#A09085"
        value={pw}
        onChangeText={setPw}
        secureTextEntry
      />

      {/* 로그인 버튼 */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>

      {/* --- 회원가입 버튼 --- */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>계정이 없으신가요? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("signup")}>
          <Text style={styles.signupButtonText}>회원가입하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#5D4037",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: "#FFFDF9",
    fontSize: 16,
    color: "#5D4037",
  },
  button: {
    backgroundColor: "#FFAB91",
    padding: 18,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  // 회원가입 버튼 스타일
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  signupText: { color: "#A1887F", fontSize: 15 },
  signupButtonText: {
    color: "#FF7043",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 5,
    textDecorationLine: "underline",
  },
});

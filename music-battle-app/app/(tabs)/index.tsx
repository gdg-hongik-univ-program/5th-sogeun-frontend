import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router"; // 1. 네비게이션 기능 가져오기

export default function LoginScreen() {
  const router = useRouter(); // 2. 라우터 사용 준비

  // 사용자가 입력한 아이디와 비밀번호를 저장할 공간(State)
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 버튼 눌렀을 때 실행될 함수
  const handleLogin = () => {
    // 나중에 여기에 실제 서버 로그인 로직을 넣으면 됩니다.
    // 지금은 버튼 누르면 바로 레이더 화면으로 이동(replace)하게 했습니다.
    // replace는 '뒤로 가기'를 했을 때 로그인 화면으로 다시 안 돌아오게 합니다.
    router.replace("/radar");
  };

  return (
    <View style={styles.container}>
      {/* 1. 타이틀 */}
      <Text style={styles.title}>Sogeun</Text>
      <Text style={styles.subtitle}>로그인하여 시작하기</Text>

      {/* 2. 입력창 (아이디) */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="아이디를 입력하세요"
          value={id}
          onChangeText={setId} // 글자가 바뀔 때마다 id 변수에 저장
          autoCapitalize="none" // 첫 글자 자동 대문자 방지
        />
      </View>

      {/* 3. 입력창 (비밀번호) */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true} // 비밀번호 가리기 (****)
        />
      </View>

      {/* 4. 로그인 버튼 */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

// 스타일(디자인) 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007AFF", // 파란색 버튼
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

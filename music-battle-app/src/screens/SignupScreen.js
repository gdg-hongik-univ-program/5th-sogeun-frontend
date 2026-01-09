import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function SignupScreen() {
  const navigation = useNavigation();

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const [nickname, setNickname] = useState('');

  const SERVER_URL = 'http://15.164.164.66:8080/api/auth/signup';

  const handleSignup = async () => {
    // 1. 빈 칸 확인
    if (!id || !pw || !pwCheck || !nickname) {
      Alert.alert('알림', '모든 정보를 입력해주세요.');
      return;
    }

    // 2. 비밀번호 일치 확인
    if (pw !== pwCheck) {
      Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      console.log("회원가입 요청 보냄... 🚀", SERVER_URL);

    // 3. 서버로 데이터 전송 (진짜 회원가입!)
      const response = await axios.post(SERVER_URL, {
        loginId: id,        // 백엔드는 보통 'userId'나 'username'을 원함
        password: pw,      
        nickname: nickname,
      });

  // 4. 성공 처리 (200 OK 또는 201 Created)
      if (response.status === 200 || response.status === 201) {
        console.log("가입 성공!", response.data);
        Alert.alert('환영합니다!', '회원가입이 완료되었습니다.\n로그인 화면으로 이동합니다.', [
          { 
            text: '확인', 
            onPress: () => navigation.goBack() // 로그인 화면으로 복귀
          }
        ]);
      }

    } catch (error) {
      // 5. 에러 처리
      console.log("회원가입 에러:", error);
      if (error.response) {
        console.log("❌ 서버 응답 상세(여기 보세요):", error.response.data);
        console.log("❌ 상태 코드:", error.response.status);
      }

      if (error.response) {
        // 백엔드에서 "이미 있는 아이디입니다" 같은 메시지를 보냈을 때
        // (백엔드 설정에 따라 error.response.data.message 일 수도 있음)
        Alert.alert('가입 실패', '이미 존재하는 아이디거나 입력값이 잘못되었습니다.');
      } else {
        Alert.alert('오류', '서버와 연결할 수 없습니다.\n잠시 후 다시 시도해주세요.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      
      {/* 아이디 */}
      <TextInput 
        style={styles.input} 
        placeholder="아이디"
        placeholderTextColor="#A09085" 
        value={id}
        onChangeText={setId}
        autoCapitalize="none"
      />
      
      {/* 닉네임 */}
      <TextInput 
        style={styles.input} 
        placeholder="닉네임"
        placeholderTextColor="#A09085" 
        value={nickname}
        onChangeText={setNickname} 
      />

      {/* 비밀번호 */}
      <TextInput 
        style={styles.input} 
        placeholder="비밀번호"
        placeholderTextColor="#A09085" 
        value={pw}
        onChangeText={setPw} 
        secureTextEntry 
      />

      {/* 비밀번호 확인 */}
      <TextInput 
        style={styles.input} 
        placeholder="비밀번호 확인"
        placeholderTextColor="#A09085" 
        value={pwCheck}
        onChangeText={setPwCheck} 
        secureTextEntry 
      />
      
      {/* 가입 완료 버튼 */}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>가입하기</Text>
      </TouchableOpacity>

      {/* 뒤로가기 버튼 */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>로그인 화면으로 돌아가기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#5D4037' },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#FFFDF9',
    fontSize: 16,
    color: '#5D4037',
    },
  button: {
    backgroundColor: '#FFAB91',
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 15
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  
  backButton: { marginTop: 25, alignItems: 'center' },
  backButtonText: { color: '#A1887F', fontSize: 15, textDecorationLine: 'underline' },
});
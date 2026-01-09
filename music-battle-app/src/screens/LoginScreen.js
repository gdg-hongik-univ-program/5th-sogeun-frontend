import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function LoginScreen() {
  const navigation = useNavigation();

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const SERVER_URL = 'http://15.164.164.66:8080/api/auth/login';

  const handleLogin = async () => {
    // 1. 빈칸 검사
    if (!id || !pw) {
      Alert.alert('알림', '아이디와 비밀번호를 입력해주세요.');
      return;
    }

    try {
      console.log("로그인 시도 중...", id);

      // 2. 서버로 아이디/비번 전송 (가짜 로그인 대신 진짜 로그인!)
      /* 아직 서버가 준비 안 됐다면 아래 axios 코드는 주석 처리하고
         바로 navigation.replace('map')만 남겨두세요.
      */
      const response = await axios.post(SERVER_URL, {
        loginId: id,    // 백엔드가 원하는 변수명으로 수정 (예: email, username 등)
        password: pw,  // 백엔드가 원하는 변수명으로 수정
      });

      // 3. 성공 시 (상태코드 200)
      if (response.status === 200) {
        console.log("로그인 성공!", response.data);
        
        // (선택사항) 여기서 토큰 저장 로직이 들어갈 수 있음
        
        Alert.alert('환영합니다!', '소근소근에 오신 것을 환영해요.', [
          { text: '확인', onPress: () => navigation.replace('map') } 
          // 주의: 만약 이동이 안 되면 'map' 대신 'tabs' 또는 '(tabs)'로 바꿔보세요.
        ]);
      }

    } catch (error) {
      // 4. 실패 시 (서버 에러, 비번 틀림 등)
      console.log("로그인 에러:", error);
      
      // 임시로 화면 넘어가게 하려면 아래 줄 주석을 푸세요 (테스트용)
      // navigation.replace('map'); 

      if (error.response) {
        // 서버가 "너 틀렸어!"라고 응답을 준 경우
        Alert.alert('로그인 실패', '아이디 또는 비밀번호를 확인해주세요.');
      } else {
        // 인터넷이 끊겼거나 서버 주소가 틀린 경우
        Alert.alert('오류', '서버와 연결할 수 없습니다. 주소를 확인해주세요.');
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
        <TouchableOpacity onPress={() => navigation.navigate('signup')}>
          <Text style={styles.signupButtonText}>회원가입하기</Text>
        </TouchableOpacity>
      </View>
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
  
  // 회원가입 버튼 스타일
  signupContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
  signupText: { color: '#A1887F', fontSize: 15 },
  signupButtonText: { color: '#FF7043', fontSize: 15, fontWeight: 'bold', marginLeft: 5, textDecorationLine: 'underline' },
});
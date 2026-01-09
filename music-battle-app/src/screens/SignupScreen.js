import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen() {
  const navigation = useNavigation();

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const [nickname, setNickname] = useState('');

  const handleSignup = () => {
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

    // 3. 회원가입 성공 처리 (나중에는 서버로 데이터 전송)
    console.log("회원가입 정보:", { id, pw, nickname });
    Alert.alert('성공', '회원가입이 완료되었습니다!', [
      { 
        text: '확인', 
        onPress: () => navigation.goBack() // 확인 누르면 로그인 화면으로 복귀
      }
    ]);
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
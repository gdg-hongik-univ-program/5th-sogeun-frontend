import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleLogin = () => {
    // 나중에 여기에 서버로 로그인 요청 보내는 코드가 들어감
    // 지금은 그냥 무조건 통과!
    console.log("로그인 시도:", id, pw);

    navigation.replace('map'); 
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
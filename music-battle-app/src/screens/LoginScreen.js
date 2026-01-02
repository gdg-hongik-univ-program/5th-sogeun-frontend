import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleLogin = () => {
     // 나중에 여기에 서버로 로그인 요청 보내는 코드가 들어갑니다.
     // 지금은 그냥 무조건 통과!
     console.log("로그인 시도:", id, pw);
     navigation.replace('Map'); // 지도로 이동하면서 뒤로가기 방지
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Music Battle</Text>
      <TextInput 
        style={styles.input} 
        placeholder="아이디" 
        value={id}
        onChangeText={setId} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="비밀번호" 
        value={pw}
        onChangeText={setPw} 
        secureTextEntry 
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 40, textAlign: 'center' },
  input: { height: 50, borderColor: '#ddd', borderWidth: 1, marginBottom: 15, paddingHorizontal: 10, borderRadius: 8 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
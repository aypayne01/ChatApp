import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function Signup({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isEmailValid = () => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isPasswordValid = () => {
    return password.length >= 6;
  };

  const onHandleSignup = () => {
    if (isEmailValid() && isPasswordValid()) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log('Signup success');
        })
        .catch(err => {
          setError('Email address already in use');
          console.log(`Signup err: ${err}`);
        });
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create new account</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter email'
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Enter password'
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={true}
        textContentType='password'
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button onPress={onHandleSignup} color='#f57c00' title='Signup' />
      <Text style={styles.errorText}>{error}</Text>
      <Button onPress={() => navigation.navigate('Login')} title='Go to Login' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#444',
    alignSelf: 'center',
    paddingBottom: 24
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 12
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  }
});
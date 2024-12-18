import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function LoginScreen({ navigation }: { navigation: any }) : React.JSX.Element {

  // local state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  const handleLogin = async () => {
    try {
      if (email.length > 0 && password.length > 0) {
        const isUserLogin = await auth().signInWithEmailAndPassword(email, password);
        setMessage('');
  
      
        const userDoc = await firestore().collection('users').doc(isUserLogin.user.uid).get();
        const userData = userDoc.data();
  
        if (userData && userData.name) {
          setName(userData.name); 
        } else {
          setName('No name available'); 
        }
  
        
        navigation.navigate('MainTabs', {
          email: isUserLogin.user.email, 
          uid: isUserLogin.user.uid, 
          name: userData?.name || 'No name available', 
        });
      } else {
        Alert.alert("Please fill out all the required fields");
      }
    } catch (err) {
      console.log(err);
      setMessage((err as Error).message || 'An error occurred during login.');
    }
  };
  

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View>

        {/* Heading */}
        <Text style={styles.header}>Login</Text>

        {/* Email field */}
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Your Email"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password field */}
        <TextInput
          style={styles.inputBox}
          placeholder="Enter Your Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        {/* Login button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleLogin}
        >
          <Text style={{ color: '#fff' }}>Login</Text>
        </TouchableOpacity>

        {/* Display any error message */}
        {message ? <Text style={styles.errorMessage}>{message}</Text> : null}

        {/* Button to navigate to SignUp */}
        <TouchableOpacity
          style={styles.signup}
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          <Text style={{ color: 'blue' }}>Create profile?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputBox: {
    width: width - 30,
    borderRadius: 15,
    borderWidth: 2,
    marginVertical: 10,
    padding: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
  },
  signup: {
    alignItems: 'center',
    marginTop: 10,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;

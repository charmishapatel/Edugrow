import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, StatusBar, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function SignUpScreen({ navigation }: { navigation: any }) : React.JSX.Element {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    
    const handleSignup = async () => {
        if (!email || !password || !name) {
          Alert.alert('Please fill out all required data');
          return;
        }
        try {
          const response = await auth().createUserWithEmailAndPassword(email, password);
          await firestore().collection('users').doc(response.user.uid).set({
            id: response.user.uid,
            name,
            email,
          });
          setMessage('');
          navigation.navigate('Login');
        } catch (err) {
          console.log(err);
          setMessage((err as Error).message);
        }
      };
      
    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <View>
                {/* App Name */}
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
                    EDUGROW
                </Text>

                {/* Name */}
                <TextInput
                    style={styles.inputBox}
                    placeholder="Enter Your Name"
                    value={name}
                    onChangeText={setName}
                />

                {/* Email */}
                <TextInput
                    style={styles.inputBox}
                    placeholder="Enter Your Email"
                    value={email}
                    onChangeText={setEmail}
                />

                {/* Password */}
                <TextInput
                    style={styles.inputBox}
                    placeholder="Enter Your Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />

                {/* SignUp button */}
                <TouchableOpacity style={styles.addButton} onPress={handleSignup}>
                    <Text style={{ color: '#fff' }}>SignUp</Text>
                </TouchableOpacity>

                {/* Existing user */}
                <TouchableOpacity style={styles.login} onPress={() => navigation.navigate('Login')}>
                    <Text style={{ color: 'blue' }}>Existing user?</Text>
                </TouchableOpacity>

                <Text>{message}</Text>
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
    login: {
        alignItems: 'center',
        marginTop: 10,
    },
});

export default SignUpScreen;

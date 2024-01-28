import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface VerificationPageProps {
  onVerify: (verificationData: VerificationData) => void;
}

interface VerificationData {
  phone_number: string;
  otp: string;
}

export default function VerificationPage({ onVerify }: VerificationPageProps) {
  const [verificationData, setVerificationData] = useState<VerificationData>({
    phone_number: '',
    otp: '',
  });

  useEffect(() => {
    // Retrieve user data from AsyncStorage and update the state
    const retrieveUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('user_phone_number');
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          setVerificationData((prevData) => ({
            ...prevData,
            phone_number: parsedUserData.phone_number,
          }));
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    retrieveUserData();
  }, []);

  const handleVerify = async () => {
    try {
      const response = await axios.post(
        'http://192.168.3.43:3000/verify',
        verificationData
      );
      console.log('Verification successful:', response.data);
      // Handle successful verification, maybe navigate to another screen
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    inputContainer: {
      marginBottom: 20,
      width: '80%',
    },
    input: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      paddingHorizontal: 100,
      paddingVertical: 10,
      borderRadius: 10,
      color: '#003366',
      fontSize: 18,
      width: '100%',
    },
    actionButton: {
      backgroundColor: '#49be25',
      padding: 15,
      borderRadius: 10,
      paddingHorizontal:90,
      marginTop: 20,
      width: '80%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#49be25',
      marginBottom: 20,
    },
  });

  return (
    <ImageBackground
      source={require('../assets/mobile-forest.jpg')}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Enter OTP</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="OTP"
              value={verificationData.otp}
              onChangeText={(text) => {
                setVerificationData({ ...verificationData, otp: text });
              }}
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity style={styles.actionButton} onPress={handleVerify}>
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

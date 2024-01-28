import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SignUpPageProps {
  onSignUp: (userData: UserData) => void;
  onSignIn: () => void;
}

interface UserData {
  name: string;
  surname: string;
  email: string;
  phone_number: string;
}

export default function SignUpPage({ onSignUp, onSignIn }: SignUpPageProps) {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    surname: '',
    email: '',
    phone_number: '',
  });

  const [isSignIn, setIsSignIn] = useState(true);

  const handleToggleSwitch = () => {
    setIsSignIn(!isSignIn);
  };

  const handleSignUp = async () => {
    try {
      // Format the phone number for storage
      const formattedPhoneNumber = `+27${userData.phone_number.substring(1)}`;

      // Update userData with the formatted phone number
      const updatedUserData = {
        ...userData,
        phone_number: formattedPhoneNumber,
      };

      // Assuming userData.phone_number is unique and used as a key
      const storageKey = `user_${userData.phone_number}`;
      console.log({ 'STORAGE KEY': storageKey });
      await AsyncStorage.setItem(storageKey, JSON.stringify(updatedUserData));

      // Log the stored data
      const storedUserData = await AsyncStorage.getItem(storageKey);
      console.log('Stored User Data:', storedUserData);

      const response = await axios.post(
        'http://192.168.3.43:3000/register-user',
        updatedUserData // send the updated user data
      );
      console.log('SignUp successful:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'flex-start',
    },
    scrollViewContent: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    switchContainer: {
      marginTop: 20,
      alignItems: 'center',
    },
    segmentedControlContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '80%',
    },
    switchOptionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '80%',
    },
    switchOption: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 10,
      marginHorizontal: 5,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      textAlign: 'center',
    },
    activeSwitch: {
      backgroundColor: '#fff',
    },
    switchText: {
      color: '#49be25',
      fontSize: 18,
      fontWeight: 'bold',
    },
    inputContainer: {
      marginBottom: 15,
    },
    input: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      color: '#003366',
      fontSize: 18,
    },
    actionButton: {
      backgroundColor: '#49be25',
      padding: 15,
      borderRadius: 10,
      marginTop: 20,
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
    },
  });

  return (
    <ImageBackground
      source={require('../assets/mobile-forest.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.switchContainer}>
        {Platform.OS === 'ios' ? (
          <View style={styles.segmentedControlContainer}>
            <Text
              style={[
                styles.switchOption,
                isSignIn ? styles.activeSwitch : null,
              ]}
              onPress={() => handleToggleSwitch()}
            >
              Sign In
            </Text>
            <Text
              style={[
                styles.switchOption,
                !isSignIn ? styles.activeSwitch : null,
              ]}
              onPress={() => handleToggleSwitch()}
            >
              Sign Up
            </Text>
          </View>
        ) : (
          <View style={styles.switchOptionContainer}>
            <TouchableOpacity
              style={[
                styles.switchOption,
                isSignIn ? styles.activeSwitch : null,
              ]}
              onPress={() => handleToggleSwitch()}
            >
              <Text style={styles.switchText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.switchOption,
                !isSignIn ? styles.activeSwitch : null,
              ]}
              onPress={() => handleToggleSwitch()}
            >
              <Text style={styles.switchText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {isSignIn ? (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                value={userData.phone_number}
                onChangeText={(text) => {
                  console.log('Input Text:', text);
                  setUserData({ ...userData, phone_number: text });
                }}
                keyboardType="phone-pad"
              />
            </View>
          ) : (
            <>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={userData.name}
                  onChangeText={(text) =>
                    setUserData({ ...userData, name: text })
                  }
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Surname"
                  value={userData.surname}
                  onChangeText={(text) =>
                    setUserData({ ...userData, surname: text })
                  }
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={userData.email}
                  onChangeText={(text) =>
                    setUserData({ ...userData, email: text })
                  }
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Mobile Number"
                  value={userData.phone_number}
                  onChangeText={(text) =>
                    setUserData({ ...userData, phone_number: text })
                  }
                  keyboardType="phone-pad"
                />
              </View>
            </>
          )}

          <TouchableOpacity
            style={styles.actionButton}
            onPress={isSignIn ? onSignIn : handleSignUp}
          >
            <Text style={styles.buttonText}>
              {isSignIn ? 'Sign In' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

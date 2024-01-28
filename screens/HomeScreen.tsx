// Import necessary components from 'react-native'
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const handleExploreFleet = () => {
    // Implement navigation or action for exploring the fleet
    navigation.navigate('SignUp');
    console.log('Explore Fleet');
  };

  return (
    <ImageBackground
      source={require('../assets/mobile-forest.jpg')} // Use the path to your image
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Road Wallet</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.welcomeText}>Welcome Aboard!</Text>
          <Text style={styles.description}>
            Elevate your vehicle management experience with RoadWallet, your
            go-to solution for fleet operations.
          </Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={handleExploreFleet}
          >
            <Text style={styles.buttonText}>Explore Fleet</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 RoadWallet</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(30, 39, 46, 0.7)', // Dark Gray with reduced opacity
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  headerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#49be25', // Avo Green
    marginTop: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ecf0f1', // White                      #ecf0f1 #49be25 #2c3e50 #fff
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#fff', // White
  },
  exploreButton: {
    backgroundColor: '#49be25', // Avo Green
    padding: 15,
    width: '80%',
    borderRadius: 10,
  },
  buttonText: {
    color: '#1e272e', // Dark Gray
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#2c3e50', // Dark Gray
    backgroundColor: '#49be25', // Avo Green
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#1e272e', // Avo Green
  },
});

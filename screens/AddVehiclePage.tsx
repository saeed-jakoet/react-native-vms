// screens/AddVehiclePage.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

export default function AddVehiclePage({ navigation }) {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');

  const handleAddVehicle = async () => {
    try {
      const response = await axios.post(
        'http://192.168.3.43:8000/register-vehicle',
        {
          make,
          model,
          year: parseInt(year), // Ensure year is an integer
          tank_capacity: '50', // Assuming a constant value for tank_capacity
        }
      );

      console.log('Vehicle added:', response.data);
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Add New Vehicle</Text>
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Make</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter make"
            value={make}
            onChangeText={(text) => setMake(text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Model</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter model"
            value={model}
            onChangeText={(text) => setModel(text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Year</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter year"
            keyboardType="numeric"
            value={year}
            onChangeText={(text) => setYear(text)}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddVehicle}>
        <Text style={styles.buttonText}>Add Vehicle</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1e272e', // Midnight Blue
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  form: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#34495e', // Wet Asphalt
    color: '#ecf0f1', // Clouds
    padding: 15,
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: '#3498db', // Belize Hole
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

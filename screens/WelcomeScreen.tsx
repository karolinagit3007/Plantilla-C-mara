import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {signOut } from "firebase/auth";
import { auth } from '../config/Config';

export default function WelcomeScreen({ navigation }: any) {

  const cerrar = () => {
    if (auth) {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          navigation.navigate("Login");
        })
        .catch((error) => {
          // Handle errors here
          console.error('Error al cerrar sesión:', error);
        });
    } else {
      console.error('Firebase auth is not initialized');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WelcomeScreen</Text>
      <TouchableOpacity style={styles.button} onPress={cerrar}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#405D72'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#758694',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: '#F7E7DC',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
import { Button, StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';

export default function LoginScreen({ navigation }: any) {

  const [correo, setCorreo] = useState('')
  const [contrasenia, setContrasenia] = useState('')

  function login() {
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        navigation.navigate('Drawer')
        //Alert.alert("ACCESO")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        let titulo = ""
        let mensaje = ""

        if (errorCode == "auth/wrong-password") {
          titulo = "Error de contraseña"
          mensaje = "Contraseña incorrecta, revisar credenciales"

        } else if (errorCode == "auth/user-not-found") {
          titulo = "Error de usuario"
          mensaje = "Usuario no encontrado, revisar el correo electrónico"

        } else {
          titulo = "Error de acceso"
          mensaje = "Revisar credenciales de correo y contraseña"

        }

        Alert.alert(errorCode, errorMessage)
      });

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder='Ingresa tu correo electrónico'
        onChangeText={(texto) => (setCorreo(texto))}
        keyboardType='email-address'
      />
      <TextInput
        style={styles.input}
        placeholder='Ingresa contraseña'
        onChangeText={(texto) => (setContrasenia(texto))}
      />

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      <Text onPress={() => navigation.navigate('Registro')}> 👉 Regístrate aquí 👈</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#999B84',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    
  },
  input: {
    width: '80%',
    padding: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#2F3645',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 20,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    
  },
})
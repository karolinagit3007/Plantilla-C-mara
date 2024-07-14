import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';

export default function LoginScreen({ navigation }: any) {

    const [correo, setCorreo] = useState('')
    const [contrasenia, setContrasenia] = useState('')

    function login() {
        signInWithEmailAndPassword(auth, correo, contrasenia)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigation.navigate('Drawer');
                limpiarCampos();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                let titulo = ""
                let mensaje = ""

                switch (errorCode) {
                    case "auth/wrong-password":
                        titulo = "Error de contraseña";
                        mensaje = "Contraseña incorrecta, revisa tus credenciales";
                        break;
                    case "auth/user-not-found":
                        titulo = "Error de usuario";
                        mensaje = "Usuario no encontrado, revisa el correo electrónico";
                        break;
                    default:
                        titulo = "Error de acceso";
                        mensaje = "Revisa tus credenciales de correo y contraseña";
                        break;
                }

                Alert.alert(titulo, mensaje);
            });
    }

    function limpiarCampos() {
        setCorreo('');
        setContrasenia('');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder='Ingresa tu correo electrónico'
                value={correo}
                onChangeText={(texto) => (setCorreo(texto))}
                keyboardType='email-address'
            />
            <TextInput
                style={styles.input}
                placeholder='Ingresa contraseña'
                value={contrasenia}
                onChangeText={(texto) => (setContrasenia(texto))}
                secureTextEntry
            />

            <Button title='Ingresar' onPress={login} />
            <Text onPress={() => navigation.navigate('Registro')}>👉 Regístrate aquí 👈</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1E9DB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2F3645',
    },
    input: {
        width: '80%',
        padding: 15,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        backgroundColor: '#fff',
    },
});

import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Config';

export default function RegistroScreen({ navigation }: any) {

    const [correo, setCorreo] = useState('')
    const [contrasenia, setContrasenia] = useState('')

    function registro() {
        createUserWithEmailAndPassword(auth, correo, contrasenia)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigation.navigate("Login");
                limpiarCampos();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
            });
    }

    function limpiarCampos() {
        setCorreo('');
        setContrasenia('');
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30 }}>REGISTRO</Text>

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
            />

            <Button title='Registrar' onPress={registro} />
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

import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { ref, set, onValue, update, remove } from "firebase/database";
import { db } from '../config/Config';

export default function MascotaScreen() {
    const [id, setid] = useState("");
    const [nombre, setnombre] = useState("");
    const [especie, setespecie] = useState("");
    const [edad, setedad] = useState("");

    function guardarData() {
        set(ref(db, 'mascotas/' + id), {
          name: nombre,
          especie: especie,
          edad : edad
        });
    }

    function leerMascota(){
        try{
            const starCountRef = ref(db, 'mascotas/' + id);
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                console.log(data);
                console.log(data.name);
                console.log(data.especie);
                console.log(data.edad);
            });
        }catch (error){
            console.log(error);
        }
    }

    function editar() {
        update(ref(db, 'mascotas/' + id), {
          name: nombre,
          especie: especie,
          edad : edad
        });
        setnombre("");
        setespecie("");
        setedad("");
    }

    function eliminar() {
        remove(ref(db,'mascotas/' + id))
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/*------------------ GUARDAR -------------------------- */}
            <View style={styles.guardar}>
                <Text style={styles.titulos}>GUARDAR</Text>
                <TextInput
                    placeholder='Ingresar id'
                    style={styles.txt}
                    onChangeText={(texto)=> setid(texto)}
                />
                <TextInput
                    placeholder='Ingresar nombre'
                    style={styles.txt}
                    onChangeText={(texto)=> setnombre(texto)}
                />
                <TextInput
                    placeholder='Ingresar especie'
                    style={styles.txt}
                    onChangeText={(texto)=> setespecie(texto)}
                />
                <TextInput
                    placeholder='Ingresar edad'
                    style={styles.txt}
                    onChangeText={(texto)=> setedad(texto)}
                />
                <Button title='Guardar' onPress={()=>guardarData()} />
            </View>

            <View style={styles.separador} />

            {/*------------------ EDITAR-------------------------- */}
            <View style={styles.editar}>
                <Text style={styles.titulos}>EDITAR</Text>
                <View style={styles.fila}>
                    <TextInput
                        placeholder='Ingresar id'
                        style={styles.idInput}
                        onChangeText={(texto)=> setid(texto)}
                    />
                    <Button title='Buscar' color={'#299979'} onPress={()=>leerMascota()}/>
                </View>
                <TextInput
                    placeholder='Ingresar nombre'
                    style={styles.txt}
                    onChangeText={(texto)=> setnombre(texto)}
                    value={nombre}
                />
                <TextInput
                    placeholder='Ingresar especie'
                    style={styles.txt}
                    onChangeText={(texto)=> setespecie(texto)}
                    value={especie}
                />
                <TextInput
                    placeholder='Ingresar edad'
                    style={styles.txt}
                    onChangeText={(texto)=> setedad(texto)}
                    value={edad}
                />
                <Button title='Guardar' color={'green'} onPress={editar}/>
            </View>

            <View style={styles.separador} />

            {/*------------------ ELIMINAR------------------------- */}
            <View style={styles.eliminar}>
                <Text style={styles.titulos}>ELIMINAR</Text>
                <TextInput
                    placeholder='Ingresar id'
                    style={styles.txt}
                    onChangeText={(texto)=> setid(texto)}
                />
                <Button title='ELIMINAR' color={'red'} onPress={()=>eliminar()}/>
            </View>

            <View style={styles.separador} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
    },
    separador: {
        borderWidth: 1,
        width: '90%',
        alignSelf: 'center',
        marginVertical: 20,
    },
    titulos: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    fila: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    guardar: {
        backgroundColor: '#a1c5f7',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    editar: {
        backgroundColor: '#b5f7a1',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
    },
    eliminar: {
        backgroundColor: '#f7a1a1',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    txt: {
        width: '100%',
        backgroundColor: '#fff',
        height: 40,
        borderRadius: 10,
        marginVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    idInput: {
        width: '70%',
        backgroundColor: '#fff',
        height: 40,
        borderRadius: 10,
        marginVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
});

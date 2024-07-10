import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { getDatabase, ref, onValue } from "firebase/database";
import { db } from '../config/Config';

export default function ListaMascotaScreen() {

    const [lista, setlista] = useState([])

    let listaQuemada: any = [

    ]

    function leer(){
        const starCountRef = ref(db, 'mascotas/' );
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          console.log(data);


          //TRANSFORMACIÓN
          const listaTemporal:any=Object.keys(data).map((id)=>({
            id, ...data[id]
          }))
          console.log(listaTemporal)
          setlista(listaTemporal)
        }); 
    }

    useEffect(() => {
        leer()
    }, [])



    return (
        <View>
            <FlatList
                data={lista}
                renderItem={({item }) =>
                    <Card data={item} />
        }
            />
        </View>
    )
}

const styles = StyleSheet.create({})
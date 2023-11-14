import React from "react";
import { useLayoutEffect, useState, useEffect } from "react";
import {firestore, collection, query, onSnapshot, doc, USERS, where} from "../Firebase/Config"
import { QuerySnapshot } from "firebase/firestore";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function HomeScreen({navigation}){
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerStyle:{
                backgroundColor: 'steelblue'
            }
            
        })
    }, [])

const [sent, setSent]= useState([])

useEffect(()=>{
const q = query(collection(firestore, USERS))

const unsubscribe = onSnapshot(q,(querySnapshot)=>{
    const tempSent = []

    querySnapshot.forEach((doc)=>{
        const sentObject={
            id: doc.id,
            title: doc.data().Otsikko,
            state: doc.data().Tila

        }
        tempSent.push(sentObject)
    })
    setSent(tempSent)
    console.log(sent)
})
return()=>{
    unsubscribe()
}
}, [])

return(
    <SafeAreaView>
        <ScrollView>
            <Text>Alla näet lähettämäsi vahinkoilmoitukset sekä niiden tilat. Klikkaamalla näet lisätietoja.</Text>
            {
                sent.map((report)=>(
                    <View key={report.id}>
                        <Text>{report.title}</Text>
                        <Text>{report.state}</Text>
                    </View>
                ))
            }
        </ScrollView>
    </SafeAreaView>
)
}
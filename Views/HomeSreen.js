import React from "react";
import { useLayoutEffect, useState, useEffect } from "react";
import {firestore, collection, query, onSnapshot, doc, USERS, where, serverTimestamp} from "../Firebase/Config"
import { QuerySnapshot } from "firebase/firestore";
import { SafeAreaView, ScrollView, Text, View,StyleSheet } from "react-native";
import { convertFirebaseTimeStampToJS } from "../Helpers/Timestamp";
import Screen from "../components/Screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({navigation}){
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerStyle:{
                backgroundColor: 'steelblue'
            }
            
        })
    }, [])

const [sent, setSent]= useState([])


//tämä käyttöön kunhan autentikointi on olemassa
/*
const [userData, setUserData] = useState(null);
const [userDataLoaded, setUserDataLoaded] = useState(false);
useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        if (jsonValue !== null) {
          const parsedUser = JSON.parse(jsonValue);
          setUserData(parsedUser);
          setUserDataLoaded(true); // Mark user data as loaded
        }
      } catch (error) {
        console.log("Error in homescreen AsyncStorage read: " + error);
      }
    };
    fetchData();
}, []);*/


useEffect(()=>{
const q = query(collection(firestore, USERS, 'QTiTthHdbnTiVUx1XPvJSKcfRbo1', "ilmoitukset"))

const unsubscribe = onSnapshot(q,(querySnapshot)=>{
    const tempSent = []

    querySnapshot.forEach((doc)=>{
        const sentObject={
            id: doc.id,
            title: doc.data().typeTitle,
            created: convertFirebaseTimeStampToJS(doc.data().created),
            state: doc.data().tila
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
    <Screen>
        <ScrollView>
            <Text>Alla näet lähettämäsi vahinkoilmoitukset sekä niiden tilat. Klikkaamalla näet lisätietoja.</Text>
            {
                sent.map((report)=>(
                    <View key={report.id} style={styles.clickable}>
                        
                        <Text style={styles.title}>{report.title} {report.created}</Text>
                        <Text>{report.state}</Text>
                        
                    </View>
                ))
            }
        </ScrollView>
    </Screen>
)
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    clickable:{
        backgroundColor: 'white',
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: "center"

    },
    title: {
        textDecorationColor: 'salmon'
    }
  });
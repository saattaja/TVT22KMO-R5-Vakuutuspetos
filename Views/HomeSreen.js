import React from "react";
import { useLayoutEffect, useState, useEffect } from "react";
import {firestore, collection, query, onSnapshot, doc, USERS, getDoc, getDocs} from "../Firebase/Config"
import { SafeAreaView, ScrollView, Text, View,StyleSheet, Button } from "react-native";
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
const [userData, setUserData] = useState(null);
const [userDataLoaded, setUserDataLoaded] = useState(false);
const [ilmoitusDataLoaded, setIlmoitusDataLoaded] = useState(false);

useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
          const parsedUser = JSON.parse(jsonValue);
          setUserData(parsedUser);
          setUserDataLoaded(true); // Mark user data as loaded
      } catch (error) {
        console.log("Error in homescreen AsyncStorage read: " + error);
      }
    };
    fetchData();
}, []);


useEffect(()=>{
    if (userDataLoaded){
        const fetchIlmoitukset = async() => {
const q = query(collection(firestore, USERS, userData.uid, "ilmoitukset"))

const querySnapshot = await getDocs(q);
const documents = querySnapshot.docs.map((doc)=> ({
    id: doc.id,
    created: convertFirebaseTimeStampToJS(doc.data().created),
    state: doc.data().tila,
    title: doc.data().title
    
}))

setSent(documents)
setIlmoitusDataLoaded(true)
        }
    fetchIlmoitukset();

}}, [userData, userDataLoaded])


if(!ilmoitusDataLoaded){
return <Screen><Text>Loading..</Text></Screen>}
else{
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
import React, { useEffect, useState } from "react";
import { useLayoutEffect } from "react";
import Screen from "../components/Screen";
import { FlatList, View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, onSnapshot, query, firestore, USERS } from "../Firebase/Config"


function AccountInfo({navigation}){
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerStyle:{
                backgroundColor: 'steelblue'
            }
            
        })
    }, [])

const [userinfo, setUserinfo] = useState(null)
const [account, setAccount] = useState([])
const [userDataLoaded, setUserDataLoaded]=useState(false)

useEffect(()=>{
    const fetchdata  = async ()=>{
        try{
            const jsonValue = await AsyncStorage.getItem('user')
            const parsedUser = JSON.parse(jsonValue)
            setUserinfo(parsedUser)
            setUserDataLoaded(true)
        } catch(error){
            console.log(error)
        }
    }
    fetchdata()
}, []) 

useEffect(()=>{
    if (userDataLoaded){
        const unsub = onSnapshot(doc(firestore, USERS, userinfo.uid), (doc)=>{
            setAccount(doc.data())
            console.log(account)
        })
        }

}, [userinfo, userDataLoaded])


    return(
        <Screen>
        <View>
            <Text style={styles.text}>Nimi: {account.name}</Text>
            <Text style={styles.text}>Käyttäjätunnus: {account.email}</Text>
        </View>
        </Screen>
    )
}
export default AccountInfo;

const styles = StyleSheet.create({
    text: {
        margin: 20,
        fontSize: 15,
        textAlign: 'center',
        fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    }
})
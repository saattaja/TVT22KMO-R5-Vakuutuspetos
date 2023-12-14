import React from "react";
import { useLayoutEffect, useState, useEffect } from "react";
import { Text, FlatList } from "react-native";
import {collection, doc, USERS, where, firestore, query, getDocs, onSnapshot} from '../Firebase/Config'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import { convertFirebaseTimeStampToJS } from "../Helpers/Timestamp";
import Icon from "../components/Icon";

export default function BrokerHome({navigation}){
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerStyle:{
                backgroundColor: 'steelblue'
            }
            
        })
    }, [])

const [userDataLoaded, setUserDataLoaded] = useState(false);
const [ilmoitusDataLoaded, setIlmoitusDataLoaded] = useState(false);
const [userData, setUserData] = useState(null);
const [role, setRole] = useState("");
const [cars, setCars] = useState(false);
const [property, setProperty] = useState(false);
const [other, setOther] = useState(false);
const [sent, setSent]= useState([])

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
        const unsub = onSnapshot(doc(firestore, USERS, userData.uid), (doc)=>{
            setRole(doc.data().type)
            console.log(doc.data().type)
            console.log("rooli",role)
            
        })
        }

}, [userData, userDataLoaded])



/*if(role === "Auto"){
setCars(true)
}
else if(role === "Omaisuus"){
    setProperty(true)
}
else{
    setOther(true)
}*/
useEffect(()=>{
    if (userDataLoaded){
        const q = query(collection(firestore, USERS))
    
        const unsubscribe = onSnapshot(q,(querySnapshot)=>{
            const tempSent = []

            querySnapshot.forEach((doc)=>{
                const sentObject={
                    id: doc.id,
                    created: convertFirebaseTimeStampToJS(doc.data().created),
                    state: doc.data().tila,
                    title: doc.data().name,
                    price: doc.data().damageValue,
                    description: doc.data().description,
                    picture: doc.data().picture
                }
                tempSent.push(sentObject)
            })
                setSent(tempSent)
               setIlmoitusDataLoaded(true)
            })
            return () =>{
                unsubscribe()
            }
        }

}, [role, userDataLoaded])
return(
    <Screen><Text>Olet meklari.</Text>
    <FlatList 
    data={sent}
    keyExtractor={message => message.id.toString()}
    renderItem={({item}) => 
    <ListItem
    title={item.title}
    subTitle={item.description}
    sended={item.created}
    state={item.state}
    IconComponent={
        <Icon 
        name= "email"
        backgroundColor="gray"
        />
    }
    onPress={() => navigation.navigate("listingdetails", item)}
    />
    }
    ItemSeparatorComponent={ListItemSeparator}
    /></Screen>
)
}
import React from "react";
import { useLayoutEffect, useState, useEffect } from "react";
import {firestore, collection, query, onSnapshot, doc, USERS, getDoc, getDocs, orderBy} from "../Firebase/Config"
import { SafeAreaView, ScrollView, Text, View,StyleSheet, Button, FlatList} from "react-native";
import { convertFirebaseTimeStampToJS } from "../Helpers/Timestamp";
import Screen from "../components/Screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListItem from "../components/ListItem";
import Icon from "../components/Icon";
import ListItemSeparator from "../components/ListItemSeparator";

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
        const q = query(collection(firestore, USERS, userData.uid, "ilmoitukset"), orderBy('created', 'desc'))
        const unsubscribe = onSnapshot(q,(querySnapshot)=>{
            const tempSent = []

            querySnapshot.forEach((doc)=>{
                const sentObject={
                    id: doc.id,
                    created: convertFirebaseTimeStampToJS(doc.data().created),
                    state: doc.data().tila,
                    title: doc.data().title,
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

}, [userData, userDataLoaded])




if(!ilmoitusDataLoaded){
return <Screen><Text>Loading..</Text></Screen>}
else{
return(
    <View style={styles.container}>
    <Text style={styles.text}>Alla näet lähettämäsi vahinkoilmoitukset sekä niiden tilat. Klikkaamalla näet lisätietoja.</Text>
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
    />
    </View>
)
}

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingBottom: 10
      
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
    },
    text: {
        margin: 20,
        fontSize: 15,
        textAlign: 'center',
        fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
        color: '#0c0c0c'
    }
  });
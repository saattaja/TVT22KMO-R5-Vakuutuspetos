import React, {useState, useEffect, useLayoutEffect } from 'react';
import { FlatList, StyleSheet, SafeAreaView, ScrollView, Text, View, Button, Modal } from 'react-native';
import { convertFirebaseTimeStampToJS } from "../Helpers/Timestamp";
import {firestore, collection, query, onSnapshot, doc, USERS, getDoc, getDocs, orderBy} from "../Firebase/Config"
import ListItem from '../components/ListItem';
import Screen from '../components/Screen';
import ListItemSeparator from '../components/ListItemSeparator';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from '../components/Icon';
import Card from '../components/Card';


function MessagesScreen(props) {

    const [sent, setSent]= useState([])
    const [userData, setUserData] = useState(null);
    const [userDataLoaded, setUserDataLoaded] = useState(false);
    const [ilmoitusDataLoaded, setIlmoitusDataLoaded] = useState(false);
    const [refreshing, setRefreshing] = useState(false)
    const [modalVisible, setModalVisible] = useState(false) 
    const [selectedMessage, setSelectedMessage] = useState('') 


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
            const q = query(collection(firestore, USERS, userData.uid, "viestit"), orderBy('created', 'desc'))
            const unsubscribe = onSnapshot(q,(querySnapshot)=>{
                const tempSent = []
    
                querySnapshot.forEach((doc)=>{
                    const sentObject={
                        id: doc.id,
                        created: convertFirebaseTimeStampToJS(doc.data().created),
                        typeTitle: doc.data().typeTitle,
                        title: doc.data().title,
                        message: doc.data().message,
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
    

    const handeDelete = message => {
    //Delete message from messages
    setMessages(sent.filter(m => m.id !== message.id))

    //Call the server
    }

    if(!ilmoitusDataLoaded){
        return <Screen><Text>Loading..</Text></Screen>}
        else{
    return (
       <Screen>
            <FlatList 
            data={sent}
            keyExtractor={message => message.id.toString()}
            renderItem={({item}) => 
            <ListItem
            title={item.title}
            subTitle={item.message}
            sended={item.created}
            type={item.typeTitle}
            IconComponent={
                <Icon 
                name= "email"
                backgroundColor="gray"
                />
            }
            onPress={() => {
                setModalVisible(true)
                setSelectedMessage(item)
            }}
            />
            }
            ItemSeparatorComponent={ListItemSeparator}
          /*   refreshing={refreshing}
            onRefresh={() => } */
            />

<Modal visible={modalVisible} animationType='slide'>
            <Screen>
            <Button title="sulje" onPress={() => setModalVisible(false)}/>
            <Card 
            title={selectedMessage.title}
            message={selectedMessage.message} 
            typeTitle={selectedMessage.typeTitle}
            created={selectedMessage.created}
            />
            </Screen>
        </Modal>
            </Screen>
            
    ); }
}

const styles = StyleSheet.create({
   
})

export default MessagesScreen;
import React from "react";
import { useLayoutEffect } from "react";
import Screen from "../components/Screen";
import { FlatList } from "react-native";
import AccountInfoItem from "../components/AccountInfoItem";
import Icon from "../components/Icon";
import ListItemSeparator from "../components/ListItemSeparator";
import { signOut } from "firebase/auth";
import {auth} from "../Firebase/Config"
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./LoginScreen";

export default function Account({navigation}){
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerStyle:{
                backgroundColor: 'steelblue'
            }
            
        })
    }, [])



function logOut(){
    signOut(auth)
    AsyncStorage.removeItem('user')
    .then(()=>{
        navigation.navigate("login");
    })
    .catch((error)=>{
        console.log("errori:", error)
    })
}
    return(
        <Screen>
        <AccountInfoItem
        title="Käyttäjätiedot"
        IconComponent={
            <Icon 
            name= "account-details-outline"
            backgroundColor="gray"
            />
        }
        onPress={() => navigation.navigate("accinfo")}
        />
        <ListItemSeparator></ListItemSeparator>
        <AccountInfoItem
        title="Vaihda salasana"
        IconComponent={
            <Icon 
            name= "account-key-outline"
            backgroundColor="gray"
            />
        }
        onPress={() => navigation.navigate("changepassword")}
        />
        <ListItemSeparator></ListItemSeparator>
        <AccountInfoItem
        title="Poista käyttäjätunnus"
        IconComponent={
            <Icon 
            name= "account-remove-outline"
            backgroundColor="gray"
            />
        }
        onPress={() => navigation.navigate("")}
        />
        <ListItemSeparator></ListItemSeparator>
        <AccountInfoItem
        title="Kirjaudu ulos"
        IconComponent={
            <Icon 
            name= "logout"
            backgroundColor="gray"
            />
        }
        onPress={logOut}
        />
        </Screen>
    )
}
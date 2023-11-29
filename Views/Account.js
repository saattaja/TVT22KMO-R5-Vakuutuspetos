import React from "react";
import { useLayoutEffect } from "react";
import Screen from "../components/Screen";
import { FlatList } from "react-native";
import AccountInfoItem from "../components/AccountInfoItem";
import Icon from "../components/Icon";
import ListItemSeparator from "../components/ListItemSeparator";
import { signOut } from "firebase/auth";
import {auth} from "../Firebase/Config"
import LoginScreen from "./LoginScreen";

export default function Account({navigation}){
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerStyle:{
                backgroundColor: 'steelblue'
            }
            
        })
    }, [])

/*const logOut = ()=>{
try{signOut(auth)
console.log("logout")}
catch(error){
    console.log(error)
}

 }*/

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
        onPress={""}
        />
        </Screen>
    )
}
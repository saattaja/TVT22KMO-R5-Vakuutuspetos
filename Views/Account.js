import React from "react";
import { useLayoutEffect } from "react";
import Screen from "../components/Screen";
import { FlatList } from "react-native";
import AccountInfoItem from "../components/AccountInfoItem";
import Icon from "../components/Icon";
import ListItemSeparator from "../components/ListItemSeparator";

export default function Account({navigation}){
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerStyle:{
                backgroundColor: 'steelblue'
            }
            
        })
    }, [])

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
        title="Kirjaudu ulos"
        IconComponent={
            <Icon 
            name= "logout"
            backgroundColor="gray"
            />
        }
        onPress={() => navigation.navigate("")}
        />
        </Screen>
    )
}
import React from "react";
import { useLayoutEffect } from "react";
import Screen from "../components/Screen";
import { FlatList, View } from "react-native";


function AccountInfo({navigation}){
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerStyle:{
                backgroundColor: 'steelblue'
            }
            
        })
    }, [])


    return(
        <Screen>
        <View>
            <Text>Nimi: Ukkeli</Text>
            <Text>Käyttäjätunnus: ukkeli@yahoo.fi</Text>
        </View>
        </Screen>
    )
}
export default AccountInfo;
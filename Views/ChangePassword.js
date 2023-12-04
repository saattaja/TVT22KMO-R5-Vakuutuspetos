import React from "react";
import { useLayoutEffect } from "react";
import Screen from "../components/Screen";
import { FlatList, View, Text } from "react-native";


function ChangePassword({navigation}){
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
            <Text>Vaihda salasana</Text>
        </View>
        </Screen>
    )
}
export default ChangePassword;
import React from "react";
import { useLayoutEffect } from "react";

export default function BrokerHome({navigation}){
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerStyle:{
                backgroundColor: 'steelblue'
            }
            
        })
    }, [])
}
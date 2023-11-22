import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, SafeAreaView, View } from "react-native";

//komponentti jolla voi laittaa tavaraa safeareaviewin sisälle että ei tarvi sitä uusiksi määritellä joka paikkaan

function Screen({children, style}) {
    return (
        <SafeAreaView style={[styles.screen, style]}>
       <View style={style}>{children}</View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      padding: 10
    },
  });
  
export default Screen;
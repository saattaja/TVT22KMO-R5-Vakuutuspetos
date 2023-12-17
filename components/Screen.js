import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, SafeAreaView, View, KeyboardAvoidingView, ScrollView } from "react-native";

//komponentti jolla voi laittaa tavaraa safeareaviewin sisälle että ei tarvi sitä uusiksi määritellä joka paikkaan

function Screen({children, style}) {
    return (
        <ScrollView style={[styles.screen, style]}>
       <View style={style}>{children}</View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      padding: 10,
      paddingBottom: 105, //ettei peitä bottom tabseja
      paddingTop: Constants.statusBarHeight,
    },
  });
  
export default Screen;
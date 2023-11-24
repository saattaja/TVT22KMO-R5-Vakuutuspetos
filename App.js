import { StatusBar } from 'expo-status-bar';
import {useState, useEffect, useMemo} from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { firestore } from 'firebase/firestore';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {AntDesign} from '@expo/vector-icons'
import HomeScreen from './Views/HomeSreen';
import Lomake from './Views/Lomake';
import Account from './Views/Account';
import Contact from './Views/ContactInfo';
import LoginScreen from './Views/LoginScreen';
import RegisterScreen from './Views/RegisterScreen';
import { auth } from './Firebase/Config';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthContext from './Helpers/AuthContext';

export default function App() {

  const Tab = createBottomTabNavigator();
  const [authenticated, setAuthenticated] = useState(false);

  const authContextValue= useMemo(
    ()=>({
      signIn: () => setAuthenticated(true),
    }),
    []
  );

  //return <RegisterScreen />
   return (
    <AuthContext.Provider value={authContextValue}>
      {authenticated ? (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Home'
      screenOptions={{
        tabBarActiveTintColor: 'palevioletred',
      }}>
        <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerTitle: 'Home',
          tabBarIcon: ({color,size})=>(
            <AntDesign name="home" size={size} color="steelblue"></AntDesign>
          )
        }}></Tab.Screen>
        <Tab.Screen
        name="lomake"
        component={Lomake}
        options={{
          title: 'Lomake',
          headerTitle: 'Lähetä vahinkoilmoituslomake',
          tabBarIcon: ({color,size})=>(
            <AntDesign name="plus" size={size} color="steelblue"></AntDesign>
          )
        }}></Tab.Screen>
        <Tab.Screen
        name="account"
        component={Account}
        options={{
          title: 'Käyttäjä',
          headerTitle: 'Käyttäjäasetukset',
          tabBarIcon: ({color,size})=>(
            <AntDesign name="user" size={size} color="steelblue"></AntDesign>
          )
        }}></Tab.Screen>
        <Tab.Screen
        name="contact"
        component={Contact}
        options={{
          title: 'Viesti',
          headerTitle: 'Lähetä viesti',
          tabBarIcon: ({color,size})=>(
            <AntDesign name="mail" size={size} color="steelblue"></AntDesign>
          )
        }}></Tab.Screen>
      </Tab.Navigator>
      
    </NavigationContainer>):(
      <LoginScreen></LoginScreen>)}
    </AuthContext.Provider>
  );
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
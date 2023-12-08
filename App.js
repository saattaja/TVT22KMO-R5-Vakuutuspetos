import { StatusBar } from 'expo-status-bar';
import {useState, useEffect, useMemo} from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { firestore } from 'firebase/firestore';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {AntDesign} from '@expo/vector-icons'
import HomeScreen from './Views/HomeSreen';
import Lomake from './Views/Lomake';
import Account from './Views/Account';
import Contact from './Views/ContactInfo';
import LoginScreen from './Views/LoginScreen';
import RegisterScreen from './Views/RegisterScreen';
import { auth } from './Firebase/Config';
import { signInWithEmailAndPassword, onAuthStateChanged, signInWithCustomToken } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthContext from './Helpers/AuthContext';
import FeedNavigator from './navigation/FeedNavigation';
import AccInfoNavigation from './navigation/AccInfoNavigation';



export default function App() {

  const Tab = createBottomTabNavigator();
  const [authenticated, setAuthenticated] = useState(false);

  const Stack = createStackNavigator();
  const authContextValue= useMemo(
    ()=>({
      signIn: () => setAuthenticated(true),
      signOuts: ()=> setAuthenticated(false)
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
        name="Home"
        component={FeedNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({color,size})=>(
            <AntDesign name="home" size={size} color="steelblue"></AntDesign>
          )
        }
      }
      ></Tab.Screen>
        <Tab.Screen
        name="lomake"
        component={Lomake}
        options={{
          title: 'Lomake',
          headerTitle: 'Lähetä vahinkoilmoituslomake',
          headerTitleStyle: { color: 'white' },
          tabBarIcon: ({color,size})=>(
          <AntDesign name="plus" size={size} color="steelblue"></AntDesign>
          )
        }}></Tab.Screen>
        <Tab.Screen
        name="account"
        component={AccInfoNavigation}
        options={{
          title: 'Käyttäjä',
          headerTitle: 'Käyttäjäasetukset',
          headerShown: false,
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
          headerTitleStyle: { color: 'white' },
          tabBarIcon: ({color,size})=>(
            <AntDesign name="mail" size={size} color="steelblue"></AntDesign>
          )
        }}></Tab.Screen>
      </Tab.Navigator>
      
    </NavigationContainer>):(
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
      </NavigationContainer>
      )}
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
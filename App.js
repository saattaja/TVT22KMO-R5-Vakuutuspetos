import { StatusBar } from 'expo-status-bar';
import {useState, useEffect, useMemo} from 'react'
import { StyleSheet, Text, View, TextInput, Button, Pressable } from 'react-native';
import { firestore } from 'firebase/firestore';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {AntDesign} from '@expo/vector-icons'
import HomeScreen from './Views/HomeSreen';
import Lomake from './Views/Lomake';
import AdminHome from './Views/AdminHome';
import Account from './Views/Account';
import Contact from './Views/ContactInfo';
import LoginScreen from './Views/LoginScreen';
import RegisterScreen from './Views/RegisterScreen';
import { auth, onSnapshot, doc, USERS } from './Firebase/Config';
import { signInWithEmailAndPassword, onAuthStateChanged, signInWithCustomToken } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthContext from './Helpers/AuthContext';
import FeedNavigator from './navigation/FeedNavigation';
import AccInfoNavigation from './navigation/AccInfoNavigation';
import BrokerNavigator from './navigation/BrokerHomeNavigation';




export default function App() {

  const Tab = createBottomTabNavigator();
  const [authenticated, setAuthenticated] = useState(false);
  const [isBroker, setIsBroker] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const Stack = createStackNavigator();
  const authContextValue= useMemo(
    ()=>({
      signIn: () => setAuthenticated(true),
      signOuts: ()=> setAuthenticated(false),
      logOffBroker: () =>setIsBroker(false),
      isBroker: ()=> setIsBroker(true),
      isAdmin: ()=> setIsAdmin(true)
    }),
    []
  );

 
   return (
    <AuthContext.Provider value={authContextValue}>
      {authenticated ? (
       isAdmin ? ( //admin = true
        <NavigationContainer>
        <Tab.Navigator initialRouteName='Käsittelijä'
          screenOptions={{
            tabBarActiveTintColor: 'palevioletred',
            tabBarHideOnKeyboard: true
          }}>
          <Tab.Screen
            name="Admin"
            component={AdminHome}
            options={{
              headerShown: false,
              tabBarIcon: ({color,size})=>(
                <AntDesign name="home" size={size} color="steelblue"></AntDesign>
              )
            }}
          ></Tab.Screen>
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
          </Tab.Navigator>
        </NavigationContainer>
        ):( //admin = false
        isBroker ? ( //broker = true
          <NavigationContainer>
            <Tab.Navigator initialRouteName='Käsittelijä'
              screenOptions={{
                tabBarActiveTintColor: 'palevioletred',
                tabBarHideOnKeyboard: true
              }}>
              <Tab.Screen
                name="Käsittelijä"
                component={BrokerNavigator}
                options={{
                  headerShown: false,
                  tabBarIcon: ({color,size})=>(
                    <AntDesign name="home" size={size} color="steelblue"></AntDesign>
                  )
                }}
              ></Tab.Screen>
              <Tab.Screen
                name="lomake"
                component={Lomake}
                options={{
                  title: 'Lomake',
                  headerTitle: 'Lähetä vahinkoilmoitus',
                  headerTitleStyle: { color: 'white' },
                  tabBarIcon: ({color,size})=>(
                    <AntDesign name="plus" size={size} color="steelblue"></AntDesign>
                  ),
                  headerRight: ()=> (
                    <Pressable title="empty" style={styles.empty}></Pressable>
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
            </NavigationContainer>
        ):( //broker = false
      <NavigationContainer>
        <Tab.Navigator initialRouteName='Home'
        screenOptions={{
          tabBarActiveTintColor: 'palevioletred',
          tabBarHideOnKeyboard: true
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
            headerTitle: 'Lähetä vahinkoilmoitus',
            headerTitleStyle: { color: 'white' },
            tabBarIcon: ({color,size})=>(
            <AntDesign name="plus" size={size} color="steelblue"></AntDesign>
            ),
            headerRight: ()=> (
              <Pressable title="empty" style={styles.empty}></Pressable>
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
        
      </NavigationContainer>) ) //-peruskäyttäjä tai broker loppuu -- Admin tai ei loppuu
    ):(  //-kirjautuminen = false
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
  empty:{
    width: 100
  }
});
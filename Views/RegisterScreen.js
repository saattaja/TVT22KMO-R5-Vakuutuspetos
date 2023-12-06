import React, {useState}  from 'react';
import {StyleSheet, Image, Text, Pressable} from 'react-native';
import * as Yup from 'yup';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Screen from '../components/Screen';
import {AppForm, SubmitButton, AppFormField} from '../components/forms';
import { setDoc, doc, collection, addDoc } from 'firebase/firestore';
import { firestore } from '../Firebase/Config';

//Käytetää yup kirjastoa määrittelemään ehtoja inputeille
const validationSchema = Yup.object().shape( {
  name: Yup.string().required().label("Nimi"),
  email: Yup.string().required().email().label("Sähköposti"),
  password: Yup.string().required().min(4).label("Salasana"),
} )

function RegisterScreen(props) {
  const [userCreated, setUserCreated] = useState(false);

  function handleSubmit(values) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log(user);
        if (user) {
          const userDocRef = doc(firestore, 'users', user.uid);

          await setDoc(userDocRef, {
            name: values.name,
            email: values.email,
          });
  
          async function createEmptyCollection() {
            const ilmoitukset = collection(firestore, 'ilmoitukset');
          }
          createEmptyCollection();
          setUserCreated(true);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage, errorCode);
      });
  }

    return (
      
        <Screen style={styles.container}>
            <Image style={styles.logo} source={require("../assets/add-user-302.png")} />
            {!userCreated ? (
            <AppForm
            initialValues={{name: '', email: '', password: ''}}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            >
          <AppFormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Nimi"
        />
          <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Sähköposti"
          textContentType="emailAddress"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Salasana"
          secureTextEntry
          textContentType="password"
        />    
            <SubmitButton title="Rekisteröidy"/>
            </AppForm>
            ) : (
              <Text>Käyttäjä luotu!</Text>
              )
          }
            <Text style={styles.rText}>Onko sinulla jo käyttäjä?</Text>
            <Pressable 
                title="Kirjaudu" style={styles.rButton}  
                onPress={() => props.navigation.navigate('Login')}
              >
              <Text style={styles.rButtonText}>Kirjaudu</Text>
            </Pressable>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingTop: 40
    },
    logo: {
        width: 80,
        height: 80,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20
    },
    rButton: {
      backgroundColor: 'gray',
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 15,
      width: '100%',
      marginVertical: 10
  }, rButtonText: {
    color: 'white',
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }, rText: {
    marginTop: 20,
    fontSize: 15,
    textAlign: 'center',
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    color: '#0c0c0c'
  },
})

export default RegisterScreen;
import React from 'react';
import {StyleSheet, Image, Text, Pressable} from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import {AppForm, SubmitButton, AppFormField} from '../components/forms';

//Käytetää yup kirjastoa määrittelemään ehtoja inputeille
const validationSchema = Yup.object().shape( {
  name: Yup.string().required().label("Nimi"),
  email: Yup.string().required().email().label("Sähköposti"),
  password: Yup.string().required().min(4).label("Salasana"),
} )


function RegisterScreen(props) {

    return (
        <Screen style={styles.container}>
            <Image style={styles.logo} source={require("../assets/add-user-302.png")} />
            <AppForm
            initialValues={{name: '', email: '', password: ''}}
            onSubmit={values => console.log(values)}
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
        paddingTop: 80
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
    marginTop: 20
  },
})

export default RegisterScreen;
import React, {useState, useEffect} from "react";
import { StyleSheet, Image, View } from "react-native";
import * as Yup from "yup";
import { auth } from "../Firebase/Config";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Käytetää yup kirjastoa määrittelemään ehtoja inputeille
const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Sähköposti"),
    password: Yup.string().required().min(4).label("Salasana"),
  });

  function LoginScreen(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authenticated, setAuthenticated] = useState(false);
  
    const storeUserData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('user', jsonValue);
      }
      catch (e){
        console.log("Error in signin:" + e)
      }
    }
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        AsyncStorage.removeItem('user');
        setAuthenticated(false);
      });
      return () => unsubscribe();
    }, [auth]);
  
    function handleSubmit(email, password){
      //event.preventDefault();
      console.log(email);
      console.log(password);
      console.log(auth);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
  
          const user = userCredential.user;
          console.log(auth);
          console.log("login succeeded");
          console.log(user);
          storeUserData(user);
  
          setAuthenticated(true);
          //console.log(user);
        })
        .catch((error) => {
          console.log("Login FAIL on user");
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage, errorCode)
        });
    }
  

    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../assets/user-login-305.png")} />
  
        <AppForm
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
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
          <SubmitButton title="Kirjaudu sisään" />
        </AppForm>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      padding: 10,
      paddingTop: 150
    },
    logo: {
      width: 80,
      height: 80,
      alignSelf: "center",
      marginTop: 50,
      marginBottom: 20,
    },
  });
  
  export default LoginScreen;
  
import React, {useLayoutEffect} from "react";
import { StyleSheet, Alert} from "react-native";
import {
    AppForm as Form,
    AppFormField as FormField,
    AppFormPicker as Picker,
    SubmitButton,
  } from "../components/forms";
  import Screen from "../components/Screen";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { collection, firestore, query, addDoc, getDoc, serverTimestamp } from "../Firebase/Config";
  import * as Yup from "yup";


const categories = [
    { label: "Lisäselvitys", value: 1 },
    { label: "Korvausasiat", value: 2 },
    { label: "Laskutusasiat", value: 3 },
    {label: "Asiakkuus", value: 4},
    {label: "Yhteydenottopyyntö", value: 5},
    {label: "Muu asia", value: 6},
  ];

  const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Otsikko"),
    category: Yup.object().required().nullable().label("Valitse kategoria"),
    description: Yup.string().label("Kirjoita viesti")
  });

export default function Contact({navigation}){
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerStyle:{
                backgroundColor: 'steelblue'
            }
            
        })
    }, [])


    const sendMessage = async (message) => {
      try {
        const load = await AsyncStorage.getItem('user');
        const userinf = JSON.parse(load);
        console.log("user", userinf.uid);
    
        if (userinf) {
          const docRef = collection(firestore, 'users', userinf.uid, 'viestit');
    
          // Lisää dokumentti Firestoreen ja hae sen ID
          const addedDocRef = await addDoc(docRef, {
            created: serverTimestamp(),
            typenumber: message.category.value,
            typeTitle: message.category.label,
            message: message.message,
            title: message.title,
          });
    
          // Hae lisätyn dokumentin tiedot käyttämällä dokumentin ID:tä
          const addedDocSnapshot = await getDoc(addedDocRef);
  
          if (addedDocSnapshot.exists()) {
            Alert.alert('Lähetys onnistui', 'Viesti lähetetty onnistuneesti.');
    
          } else {
            Alert.alert('Virhe', 'Viestin lähetys epäonnistui');
          }
        }
      } catch (error) {
        console.log("errori tapahtui:", error);
      }
    
      console.log("viesti lähetetty:", message);
    };
    return(
        <Screen style={styles.container}>
        {/* määritellään aloitusarvot */}
        <Form
          initialValues={{
            title: "",
            description: "",
            category: null,
          }}
          onSubmit={sendMessage}
          validationSchema={validationSchema}
          
        >
          <FormField maxLength={255} name="title" placeholder="Otsikko" />
          <Picker items={categories} name="category" placeholder="Valitse kategoria" />
          <FormField
            maxLength={255}
            multiline
            name="message"
            numberOfLines={3}
            placeholder="Kirjoita viesti"
          />
          <SubmitButton title="Lähetä viesti" color="#96bf44"/>
        </Form>
      </Screen>
    )
}
const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
  });
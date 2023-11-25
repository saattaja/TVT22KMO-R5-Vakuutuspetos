import React, { useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import {
  AppForm as Form,
  AppFormField as FormField,
  AppFormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import Screen from "../components/Screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, firestore, query } from "../Firebase/Config";
import { addDoc, serverTimestamp } from "firebase/firestore";

//Käytetää yup kirjastoa määrittelemään ehtoja inputeille
  const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label("Otsikko"),
    category: Yup.object().required().nullable().label("Valitse kategoria"),
    price: Yup.number().required().min(1).max(10000).label("Vahingon arvo"),
    description: Yup.string().label("Kuvaus tapahtuneesta")
  });

  //määritellään halutut kategoriat jotka annetaan propsina valikko komponentille
  const categories = [
    { label: "Autot", value: 1 },
    { label: "Koti ja irtaimisto", value: 2 },
    { label: "Muu omaisuus", value: 3 },
  ];

export default function Lomake({navigation}){
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerStyle:{
                backgroundColor: 'steelblue'
            }
            
        })
    }, [])


    const addReport = async(reportinfo)=>{
      try{
        const load = await AsyncStorage.getItem('user');
        const userinf = JSON.parse(load)
        console.log("user", userinf.uid)

        if(userinf){
          const docRef = collection(firestore, 'users', userinf.uid, 'ilmoitukset')
          await addDoc(docRef, {
            created: serverTimestamp(),
            tila: "Lähetetty",
            typenumber: reportinfo.category.value,
            typeTitle: reportinfo.category.label,
            description: reportinfo.description,
            damageValue: reportinfo.price,
            title: reportinfo.title
            
          })


        }
              }
              catch(error){
                console.log(error)
              }
      console.log("lomaketiedot", reportinfo)
      
    }

    return (

        <Screen style={styles.container}>
          {/* määritellään aloitusarvot */}
          <Form
            initialValues={{
              title: "",
              price: "",
              description: "",
              category: null,
            }}
            onSubmit={addReport}
            validationSchema={validationSchema}
            
          >
            <FormField maxLength={255} name="title" placeholder="Otsikko" />
            <Picker items={categories} name="category" placeholder="Valitse kategoria" />
            <FormField
              keyboardType="numeric"
              maxLength={8}
              name="price"
              placeholder="Vahingon arvo"
              
            />
            <FormField
              maxLength={255}
              multiline
              name="description"
              numberOfLines={3}
              placeholder="Kuvaus tapahtuneesta"
            />
            <SubmitButton title="Lähetä" color="#96bf44"/>
          </Form>
        </Screen>
      );
    }

const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
  });
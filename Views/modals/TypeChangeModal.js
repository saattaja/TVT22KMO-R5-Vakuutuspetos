import React, { useState } from "react";
//import { Alert, TextInput } from "react-native";
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { AppForm, AppFormField, SubmitButton } from '../../components/forms'
import * as Yup from "yup";
import Modal from "react-native-modal";
import { ref, set } from "firebase/database";
import {collection,doc, firestore, onSnapshot, query, USERS,} from "../../Firebase/Config";

const TypeChangeModal = ({ isVisible, userId, onCancel, onOK }) => {
  const [newType, setNewType] = useState("");

  const validationSchema = Yup.object().shape({
    type: Yup.string().required().label("New Type"),
  });

  const handleOK = (values) => {
    onOK(userId, values.type);
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onCancel}>
        <View>
        <AppForm
          initialValues={{ type: "" }}
          onSubmit={handleOK}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            name="type"
            placeholder="Tyyppi"
          />
          <SubmitButton title="Vaihda tyyppi" />
        </AppForm>
        <Pressable style={styles.rButton} title="ok" onPress={handleOK} >
            <Text style={styles.rButtonText}>jee</Text>
        </Pressable>
        <Pressable style={styles.rButton} title="Cancel" onPress={onCancel} >
            <Text style={styles.rButtonText}>Peru</Text>
        </Pressable>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 10,
      paddingTop: 40
    },
    rButton: {
      backgroundColor: 'gray',
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 15,
      width: '100%',
      marginVertical: 10
    },
    rButtonText: {
      color: 'white',
      fontSize: 18,
      textTransform: 'uppercase',
      fontWeight: 'bold'
    },
    rText: {
      marginTop: 20
    },
  });

export default TypeChangeModal;
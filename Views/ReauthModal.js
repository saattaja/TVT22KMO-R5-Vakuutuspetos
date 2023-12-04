import React, { useState } from 'react';
import { Pressable , View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import * as Yup from "yup";
import {reauthenticateWithCredential, EmailAuthProvider} from "firebase/auth";
import {auth} from "../Firebase/Config";

function ReauthModal({ isVisible, onClose, onReauth }) {
    const [errorMessage, setErrorMessage] = useState('');

    const validationSchema = Yup.object().shape({
        email: Yup.string().required().email().label("Sähköposti"),
        password: Yup.string().required().min(4).label("Salasana"),
      });

  const handleReauth = (values) => {
    user = auth.currentUser;
    const credentials = EmailAuthProvider.credential(values.email, values.password);
    reauthenticateWithCredential(user, credentials)
    .then(() => {
        console.log('Success');
        setErrorMessage('');
        onReauth();
        onClose();
      })
      .catch((error) => {
        console.error('Reauthentication error:', error);
        setErrorMessage('Väärä sähköposti tai salasana.');
      });
  };

  const handleCancel = () => {
    setErrorMessage('');
    onClose();
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
        <View>
        {errorMessage ? (
            <Text style={{ marginBottom: 10, color: 'red' }}>{errorMessage}</Text>
        ) : null}
        <AppForm
          initialValues={{ email: "", password: "" }}
          onSubmit={handleReauth}
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
          <SubmitButton title="Poista käyttäjä" />
        </AppForm>
        <Pressable style={styles.rButton} title="Cancel" onPress={handleCancel} >
            <Text style={styles.rButtonText}>Peru</Text>
        </Pressable>
        </View>
    </Modal>
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
      alignSelf: "center",
      marginTop: 50,
      marginBottom: 20,
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
  });
export default ReauthModal;
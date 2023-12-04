import React, { useState } from 'react';
import { Button } from 'react-native';
import Modal from 'react-native-modal';
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import * as Yup from "yup";
import {reauthenticateWithCredential, EmailAuthProvider} from "firebase/auth";
import {auth} from "../Firebase/Config";

function ReauthModal({ isVisible, onClose, onReauth }) {
    const validationSchema = Yup.object().shape({
        email: Yup.string().required().email().label("Sähköposti"),
        password: Yup.string().required().min(4).label("Salasana"),
      });
/*
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
*/
  const handleReauth = (values) => {
    user = auth.currentUser;
    const credentials = EmailAuthProvider.credential(values.email, values.password);
    reauthenticateWithCredential(user, credentials)
    .then(() => {
        console.log('Reauthentication successful');
        onReauth();
        onClose();
      })
      .catch((error) => {
        console.error('Reauthentication error:', error);
      });
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
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
          <SubmitButton title="Kirjaudu sisään" />
        </AppForm>
    </Modal>
  );
}

export default ReauthModal;
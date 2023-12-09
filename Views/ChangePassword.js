import React, { useState } from 'react';
import { StyleSheet, Text, Pressable, Alert } from 'react-native';
import * as Yup from 'yup';
import {
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
} from 'firebase/auth';
import Screen from '../components/Screen';
import { AppForm, SubmitButton, AppFormField } from '../components/forms';
import { auth } from '../Firebase/Config';

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required().min(4).label('Nykyinen salasana'),
  newPassword: Yup.string().required().min(4).label('Uusi salasana'),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('newPassword'), null], 'Salasanat eivät täsmää')
    .label('Vahvista salasana'),
});

function ChangePassword(props) {
  const [passwordChanged, setPasswordChanged] = useState(false);

  async function handleSubmit(values) {
    const authInstance = getAuth();
    const user = authInstance.currentUser;

    try {
      await reauthenticateWithCredential(
        user,
        EmailAuthProvider.credential(user.email, values.currentPassword)
      );

      await updatePassword(user, values.newPassword);
      setPasswordChanged(true);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage, errorCode);
      Alert.alert('Virhe salasanan vaihdossa', errorMessage);
    }
  }

  return (
    <Screen style={styles.container}>
      {!passwordChanged ? (
        <AppForm
          initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="currentPassword"
            placeholder="Nykyinen salasana"
            secureTextEntry
            textContentType="password"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="newPassword"
            placeholder="Uusi salasana"
            secureTextEntry
            textContentType="password"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="confirmPassword"
            placeholder="Vahvista salasana"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Vaihda salasana" />
        </AppForm>
      ) : (
        <Text>Salasana vaihdettu onnistuneesti!</Text>
      )}
      <Pressable
        title="Palaa"
        style={styles.rButton}
        onPress={() => props.navigation.goBack()}
      >
        <Text style={styles.rButtonText}>Palaa</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 40,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
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
    marginVertical: 10,
  },
  rButtonText: {
    color: 'white',
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default ChangePassword;
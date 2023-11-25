import React from "react";
import { StyleSheet, Text } from "react-native";

//palauttaa error viestin jos käyttäjä yrittää lähettää formin väärillä tiedoilla
function ErrorMessage({ error, visible }) {
  if (!visible || !error) return null;

  return <Text style={styles.text}>{error}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    color: "red"
}
});

export default ErrorMessage;

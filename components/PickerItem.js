import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

//Valikkoon ilmestyvä vaihtoehto. Voi antaa propsina otsikon ja sitten
//funktion että mitä tekee kun painaa. 

function PickerItem({label, onPress}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        padding: 20,
        fontSize: 18,
        fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
        color: '#0c0c0c'
    }
})

export default PickerItem;
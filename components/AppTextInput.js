import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//input kenttä, joka ottaa vastaan ikonin ja muut määrittelyt
function AppTextInput({icon, ...otherProps}) {
    return (
        <View style={styles.container}>
          { icon &&  <MaterialCommunityIcons name={icon} size={20} color='#6e6969' style={styles.icon}/>}
            <TextInput 
            placeholderTextColor='#6e6969'
            style={styles.text}
            {...otherProps}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f8f4f4',
      borderRadius: 25,
      flexDirection: 'row',
      width: '100%',
      padding: 15,
      marginVertical: 10
    },
    icon: {
        marginRight: 10
    },
    text: {
        fontSize: 18,
        fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
        color: '#0c0c0c'
    }
})

export default AppTextInput;
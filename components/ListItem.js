import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function ListItem({title, subTitle, IconComponent, onPress, sended, state}) {
    return (
       <TouchableHighlight
       onPress={onPress}
       underlayColor='#f8f4f4'
       >
       <View style={styles.container}>
        {IconComponent}
        <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
        {subTitle && <Text style={styles.subTitle} numberOfLines={2}>{subTitle}</Text>}
        {sended && <Text style={styles.time} numberOfLines={1}>{sended}</Text>}
        {state && <Text style={styles.state} numberOfLines={1}>{state}</Text>}
        </View>
        <MaterialCommunityIcons name="chevron-right"
        size={25}
        color='#c54840'/>
       </View>
       </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15,
        backgroundColor: "#fff"
    },
    title: {
        fontWeight: '500',
        fontSize: 18,
        fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
        color: '#0c0c0c'
    },
    subTitle: {
        color: '#6e6969',
        fontSize: 16
    },
    time: {
        marginBottom: 4,
        marginTop: 4,
        color: '#0c0c0c'
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center'
    },
    state: {
        color: "#96bf44"
    }

})

export default ListItem;
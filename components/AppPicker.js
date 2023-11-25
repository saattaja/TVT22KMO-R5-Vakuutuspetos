import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Modal, Button, FlatList, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import PickerItem from './PickerItem';
import Screen from './Screen';

//valikko komponentti
/* 
ottaa propseina iconin jos haluaa näkymään, itemsit mitkä näytetää valikossa,
funktio mitä tehdään jos painetaan jotain itemiä, placeholderin sekä myös jos
on jo valittuna joku itemi 
 */
function AppPicker({icon, items, onSelectItem, placeholder, selectedItem}) {
    const [modalVisible, setModalVisible] = useState(false) 
    //näytetää valikko jos on true ja piilotetaan falsena
    
    return (
        <>
    <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.container}>
          { icon &&  <MaterialCommunityIcons name={icon} size={20} color='#6e6969' style={styles.icon}/>}
          {selectedItem ? (
            <Text style={styles.text}>{selectedItem.label}</Text>
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}

            <MaterialCommunityIcons name="chevron-down" size={20} color='#6e6969'/>
        </View>
        </TouchableWithoutFeedback>
        <Modal visible={modalVisible} animationType='slide'>
            <Screen>
            <Button title="sulje" onPress={() => setModalVisible(false)}/>
           {/* Flatlistilla renderöidään halutut itemsit näkymään */}
            <FlatList
            data={items}
            keyExtractor={item => item.value.toString()}
            renderItem={({item}) => 
        <PickerItem 
           label={item.label}
           onPress={() => {
            setModalVisible(false)
            onSelectItem(item)
           }}
        />}
            />
            </Screen>
        </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f8f4f4',
      borderRadius: 25,
      flexDirection: "row",
      width: "100%",
      padding: 15,
      marginVertical: 10,
    },
    icon: {
      marginRight: 10,
    },
    placeholder: {
      color: '#6e6969',
      flex: 1,
    },
    text: {
      flex: 1,
      fontSize: 18,
      fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
      color: '#0c0c0c'
    },
  });
  
  export default AppPicker;
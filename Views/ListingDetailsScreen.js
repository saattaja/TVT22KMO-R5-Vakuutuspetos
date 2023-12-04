
import React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';


function ListingDetailsScreen({ route } ) {

const listing = route.params;

    return (
        <View>
 <Image style={styles.image} source={require('../assets/joo.webp')}/>
 <View style={styles.detailsContainer}>
 <Text style={styles.title}>{listing.title}</Text>
 <Text style={styles.desc}>{listing.description}</Text>
 <Text style={styles.price}>{"Korvaus pyyntö: " + listing.price + "€"}</Text>
 <Text style={styles.price}>{"Tila: " + listing.state}</Text>
 </View>
        </View>
    );
}

const styles = StyleSheet.create({
    detailsContainer: {
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: '500'
    },
    desc: {
         marginTop: 10,
         fontSize: 15,
    },
    image: {
        width: '100%',
        height: 300
    },
    price: {
     color: '#000',
     fontSize: 20,
     marginVertical: 10
    }
})

export default ListingDetailsScreen;
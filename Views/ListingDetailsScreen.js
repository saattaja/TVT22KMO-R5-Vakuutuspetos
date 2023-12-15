import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Text, Button } from 'react-native';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { USERS, collection, firestore, doc, updateDoc, getDoc } from "../Firebase/Config";

function ListingDetailsScreen({ route, navigation }) {
  const listing = route.params;
  const [imageUrl, setImageUrl] = useState();
  const [listingState, setListingState] = useState(listing.state); // Lisätty paikallinen tila

  const storage = getStorage();
  const userRef = ref(storage, "users");
  const filename = listing.picture ? ref(userRef, listing.picture) : null;
  const filePath = filename ? filename.fullPath : null;

  if (filePath) {
    getDownloadURL(ref(storage, filePath))
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function updateListingStatus(newStatus) {
    const listingDocRef = doc(firestore, 'users', listing.userId, 'ilmoitukset', listing.id);

    try {
      await updateDoc(listingDocRef, { tila: newStatus });
      console.log('Ilmoituksen tila päivitetty onnistuneesti.');
      setListingState(newStatus); // Päivitetään paikallinen tila
      
    } catch (error) {
      console.error('Virhe päivitettäessä ilmoituksen tilaa:', error);
    }
  }

  return (
    <View>
      {imageUrl ? (
        <Image style={styles.image} source={{ uri: imageUrl }} />
      ) : (
        <Image style={styles.image} source={require('../assets/noimage.jpg')} />
      )}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{listing.title}</Text>
        <Text style={styles.desc}>{listing.description}</Text>
        {listing.sender && <Text style={styles.price}>{"Lähettäjän nimi: " + listing.sender}</Text>}
        {listing.email && <Text style={styles.price}>{"Sähköposti: " + listing.email}</Text>}
        <Text style={styles.price}>{"Korvaus pyyntö: " + listing.price + "€"}</Text>
        <Text style={styles.price}>{"Tila: " + listingState}</Text>
        <Button title="Vaihda tilaksi: käsittelyssä" onPress={() => updateListingStatus('Käsittelyssä')} />
        <Button title="Vaihda tilaksi: ratkaistu" onPress={() => updateListingStatus('Ratkaistu')} />
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
});

export default ListingDetailsScreen;
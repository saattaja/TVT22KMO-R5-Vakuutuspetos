import React, { useState, useEffect } from "react";
import { Text, FlatList, Pressable, Alert } from "react-native";
import {collection, doc, firestore, onSnapshot, USERS,} from "../Firebase/Config";
import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TypeChangeModal from "./modals/TypeChangeModal";
import { setDoc } from "firebase/firestore";

export default function AdminHome({ navigation }) {
    const [userDataLoaded, setUserDataLoaded] = useState(false);
    const [userData, setUserData] = useState(null);
    const [usersData, setUsersData] = useState([]);
    const [role, setRole] = useState("");
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleUserPress = (userId) => {
        setSelectedUserId(userId);
        setModalVisible(true);
      };
    
      const handleModalCancel = () => {
        setModalVisible(false);
        setSelectedUserId(null);
      };
    
      const handleModalOK = (userId, newType) => {
        setModalVisible(false);
        changeUserType(userId, newType);
        setSelectedUserId(null);
      };

      const changeUserType = async (userId, newType) => {
        try {
            const userDocRef = doc(firestore, 'users', userId);
            await setDoc(userDocRef, { type: newType }, { merge: true });

            Alert.alert('Success', 'User type changed successfully.');
            } catch (error) {
                console.error('Error updating user type:', error);
                Alert.alert('Error', 'An error occurred while updating user type.');
            }
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem("user");
          const parsedUser = JSON.parse(jsonValue);
          setUserData(parsedUser);
          setUserDataLoaded(true);
        } catch (error) {
          console.log("Error in homescreen AsyncStorage read: " + error);
        }
      };
      fetchData();
    }, []);
  
    useEffect(() => {
        if (userDataLoaded) {
            const unsub = onSnapshot(
                doc(firestore, USERS, userData.uid),
                (doc) => {
                    setRole(doc.data().type);
                },
                (error) => {
                    console.error("Error fetching user role:", error);
                }
            );
    
            const usersQuery = collection(firestore, USERS);
            const usersUnsub = onSnapshot(usersQuery, (querySnapshot) => {
                const tempUsersData = [];
                querySnapshot.forEach((doc) => {
                    const tempUserData = {
                        id: doc.id,
                        email: doc.data().email,
                        type: doc.data().type,
                    };
                    tempUsersData.push(tempUserData);
                });
                setUsersData(tempUsersData);
            });
    
            return () => {
                unsub();
                usersUnsub();
                setSelectedUserId(null);
            };
        }
    }, [userData, userDataLoaded]);
    
      return (
            <Screen>
            <Text>Welcome, Admin!</Text>
            <FlatList
                data={usersData}
                keyExtractor={(user) => user.id}
                renderItem={({ item }) => (
                    <ListItem
                        title={item.email}
                        subTitle={`Type: ${item.type}`}
                        onPress={() => handleUserPress(item.id, item.type)}
                    />
                )}
                ItemSeparatorComponent={ListItemSeparator}
                keyboardShouldPersistTaps="handled"
                />
            {selectedUserId && (
            <TypeChangeModal
                isVisible={modalVisible}
                userId={selectedUserId}
                onCancel={handleModalCancel}
                onOK={handleModalOK}
            />
        )}
        </Screen>
    );
  }
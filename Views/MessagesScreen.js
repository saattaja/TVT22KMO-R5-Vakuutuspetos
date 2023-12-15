import React, {useState} from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ListItem from '../components/ListItem';
import Screen from '../components/Screen';
import ListItemSeparator from '../components/ListItemSeparator';
import ListItemDeleteActions from '../components/ListItemDeleteActions';

function MessagesScreen(props) {

    const initialMessages = [
        {
            id: 1,
            title: 'T1',
            description: 'D1',
            image: require('../assets/person.webp')
        },
        {
            id: 2,
            title: 'T2',
            description: 'D2',
            image: require('../assets/person.webp')
        }
    ]

    const [messages, setMessages] = useState(initialMessages)
    const [refreshing, setRefreshing] = useState(false)

    const handeDelete = message => {
    //Delete message from messages
    setMessages(messages.filter(m => m.id !== message.id))

    //Call the server
    }

    return (
 
       <Screen>
            <FlatList 
            data={messages}
            keyExtractor={message => message.id.toString()}
            renderItem={({item}) => 
            <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => console.log("Message selected", item)}
            renderRightActions={() => 
            <ListItemDeleteActions onPress={() => handeDelete(item)}/>}
            />
            }
            ItemSeparatorComponent={ListItemSeparator}
            refreshing={refreshing}
            onRefresh={() => setMessages([{
            id: 2,
            title: 'T2',
            description: 'D2',
            image: require('../assets/person.webp')
            }])}
            />
            </Screen>
    );
}

const styles = StyleSheet.create({
   
})

export default MessagesScreen;
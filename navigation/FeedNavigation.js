import react from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../Views/HomeSreen';
import ListingDetailsScreen from '../Views/ListingDetailsScreen';

const Stack = createStackNavigator();

const FeedNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="feed" component={HomeScreen}   options={{
          title: 'Home',
          headerTitle: 'Home',
          headerTitleStyle: { color: 'white' },

        }}/>
        <Stack.Screen name="listingdetails" component={ListingDetailsScreen}   options={{
          headerTitle: 'Lähetetty lomake',
          headerTitleStyle:{ color: 'white'},
          headerStyle:{
            backgroundColor: 'steelblue'
          },
          headerTintColor: 'white'
        }}/>
    </Stack.Navigator>
)

export default FeedNavigator; 
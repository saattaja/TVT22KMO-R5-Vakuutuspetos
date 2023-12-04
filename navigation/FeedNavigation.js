import react from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../Views/HomeSreen';
import ListingDetailsScreen from '../Views/ListingDetailsScreen';

const Stack = createStackNavigator();

const FeedNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="home" component={HomeScreen}   options={{
          title: 'Home',
          headerTitle: 'Home'
        }}/>
        <Stack.Screen name="listingdetails" component={ListingDetailsScreen}   options={{
          headerTitle: 'Lähetetty lomake'
        }}/>
    </Stack.Navigator>
)

export default FeedNavigator; 
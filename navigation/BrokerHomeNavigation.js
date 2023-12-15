import react from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import BrokerHome from '../Views/BrokerHome';
import ListingDetailsScreen from '../Views/ListingDetailsScreen';

const Stack = createStackNavigator();

const BrokerNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="feed" component={BrokerHome}   options={{
          title: 'Vakuutuskäsittelijä',
          headerTitle: 'Vakuutuskäsittelijä',
          headerTitleStyle: { color: 'white' },
        }}/>
        <Stack.Screen name="listingdetails" component={ListingDetailsScreen}   options={{
          headerTitle: 'Lähetetty lomake'
        }}/>
    </Stack.Navigator>
)

export default BrokerNavigator; 
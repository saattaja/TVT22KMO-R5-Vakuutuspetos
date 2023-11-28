import react from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import AccountInfo from '../Views/AccountInfo';
import Account from '../Views/Account';


const Stack = createStackNavigator();

const AccInfoNavigation = () => (
    <Stack.Navigator>
        <Stack.Screen name="acc" component={Account}   options={{
          title: 'yes',
          headerTitle: 'no'
        }}/>
        <Stack.Screen name="accinfo" component={AccountInfo}   options={{
          headerTitle: 'Käyttäjätiedot'
        }}/>
        <Stack.Screen name="changepassword" component={ChangePassword}   options={{
          headerTitle: 'Vaihda salasana'
        }}/>
    </Stack.Navigator>
)

export default AccInfoNavigation; 
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';

// Import screens
import Home from './src/screens/Home';
import Events from './src/screens/Events';
import Details from './src/screens/Details';
import Contacts from './src/screens/Contacts';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: '#1a1a1a'},
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Events" component={Events} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Contacts" component={Contacts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App; 
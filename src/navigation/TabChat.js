import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import ChatScreen from '../screens/ChatBot';
import WelcomeScreen from '../screens/WelcomeScreen';


ChatScreen
const Stack = createNativeStackNavigator();

function TabChat() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Welcome">
      <Stack.Screen name="Home" component={ChatScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
  );
}

export default TabChat;

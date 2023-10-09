import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
// import ChatScreen from '../screens/ChatBot';
import WelcomeScreen from '../screens/WelcomeScreen';




const Stack = createNativeStackNavigator();

function Test() {
  return (
    // <NavigationContainer>
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Welcome">
      {/* <Stack.Screen name="TabChat" component={TabChat} /> */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}

export default Test;

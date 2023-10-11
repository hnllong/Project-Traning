import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import LoginScreen from '../screens/AuthenApp/LoginScreen';
import SignupScreen from '../screens/AuthenApp/SignUpScreen';
import {
  default as ChatBotScreen,
  default as ChatScreen,
} from '../screens/ChatBot';

ChatScreen;
const Stack = createNativeStackNavigator();

function TabAuthen() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="LoginApp">
        <Stack.Screen name="LoginApp" component={LoginScreen} />
        {/* <Stack.Screen name="ChatWithBot" component={ChatWithBot} />
      <Stack.Screen name="ChatWithfriend" component={ChatWithFriend} /> */}
        {/* <Stack.Screen name="SignApp" component={Sig} /> */}
        <Stack.Screen
          name="SignUpApp"
          component={SignupScreen}
          screenOptions={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default TabAuthen;

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Signup from '../screens/Authentication/SignUp';
import Login from '../screens/Authentication/login';

import Chat from '../screens/ChatWithFriend/Chat';
import Main from '../screens/ChatWithFriend/Main';

// import Splash from '../screens/Splash';
const Stack = createStackNavigator();
const ChatWithFriend = () => {
  return (
      <Stack.Navigator initialRouteName='Login'>
        {/* <Stack.Screen
          name={'Splash'}
          component={Splash}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name={'Signup'}
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Login'}
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Main'}
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Chat'}
          component={Chat}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
  
  );
};

export default ChatWithFriend;

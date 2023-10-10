import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import Signup from '../screens/Authentication/SignUp';
import Login from '../screens/Authentication/login';
import {
  default as ChatBotScreen,
  default as ChatScreen,
} from '../screens/ChatBot';
import Chat from '../screens/ChatWithFriend/Chat';
import Main from '../screens/ChatWithFriend/Main';
import IntroChat from '../screens/IntroChat';
import WelcomeChatBotScreen from '../screens/WelcomeChatBotScreen';

ChatScreen;
const Stack = createNativeStackNavigator();

function TabChat() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="IntroChat">
      <Stack.Screen name="IntroChat" component={IntroChat} />
      {/* <Stack.Screen name="ChatWithBot" component={ChatWithBot} />
      <Stack.Screen name="ChatWithfriend" component={ChatWithFriend} /> */}
      <Stack.Screen name="IntroBot" component={WelcomeChatBotScreen} />
      <Stack.Screen name="ChatBot" component={ChatBotScreen} />
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
}

export default TabChat;

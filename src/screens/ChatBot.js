import React, {useCallback, useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
// import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ChatFaceData from '../service/ChatFaceData';

let CHAT_BOT_FACE =
  'https://res.cloudinary.com/dknvsbuyy/image/upload/v1685678135/chat_1_c7eda483e3.png';
export default function ChatBotScreen() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatFaceColor, setChatFaceColor] = useState();
  const [idBot, setIdBot] = useState();

  useEffect(() => {
    checkFaceId();
  }, []);

  const checkFaceId = async () => {
    const id = await AsyncStorage.getItem('chatFaceId');
    setIdBot(id);
    CHAT_BOT_FACE = id ? ChatFaceData[id]?.image : ChatFaceData[0]?.image;
    setChatFaceColor(ChatFaceData[id]?.primary);
    setMessages([
      {
        _id: 1,
        text: 'Hello, I am ' + ChatFaceData[id]?.name + ', How Can I help you?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: CHAT_BOT_FACE,
        },
      },
    ]);
  };

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    if (messages[0].text) {
      getBardResp(messages[0].text);
    }
  }, []);

  const getBardResp = async msg => {
    setLoading(true);
    await axios.get(`http://192.168.1.4:8080/bot?ques=${msg}`)?.then(
      resp => {
        if (resp.data.resp[1].content) {
          setLoading(false);
          const chatAIResp = {
            _id: Math.random() * (9999999 - 1),
            text: resp.data.resp[1].content,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: CHAT_BOT_FACE,
            },
          };
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, chatAIResp),
          );
        } else {
          setLoading(false);
          const chatAIResp = {
            _id: Math.random() * (9999999 - 1),
            text: 'Sorry, I can not help with it',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: CHAT_BOT_FACE,
            },
          };
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, chatAIResp),
          );
        }
      },
      error => {
        console.log('error', error);
      },
    );
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#671ddf',
          },
          left: {},
        }}
        textStyle={{
          right: {
            // fontSize:20,
            padding: 2,
          },
          left: {
            color: '#671ddf',
            // fontSize:20,
            padding: 2,
          },
        }}
      />
    );
  };

  const renderInputToolbar = props => {
    //Add the extra styles via containerStyle
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: chatFaceColor,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: chatFaceColor,
          // marginTop: 60,
          color: '#fff',
        }}
        textInputStyle={{color: '#fff'}}
      />
    );
  };

 

  return (
    <View style={{flex: 1, paddingBottom: 100}}>
      <View className=" flex-1">
        <View style={{alignItem: 'center'}}>
          <Image
            source={{uri: ChatFaceData[idBot]?.image}}
            style={{
              height: 100,
              width: 100,
              marginTop: 10,
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              fontWeight: 'bold',
              color: chatFaceColor,
            }}>
            How Can I help you?
          </Text>
        </View>
        <View
          style={{flexGrow: 1, marginLeft: 10, marginRight: 10, borderWidth: 1, borderColor:chatFaceColor }}
          className="bg-neutral-200 rounded-3xl p-4">
          <GiftedChat
            messages={messages}
            isTyping={loading}
            multiline={true}
            onSend={messages => onSend(messages)}
            user={{
              _id: 1,
            }}
            renderBubble={renderBubble}
            renderInputToolbar={renderInputToolbar}
      
          />
        </View>
      </View>
    </View>
  );
}

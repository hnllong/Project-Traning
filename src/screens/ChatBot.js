import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';
import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import {useState, useRef, useEffect, useCallback} from 'react';
import {getBardApi} from '../service/chatbotApi';
// import { FontAwesome } from '@expo/vector-icons';
import ChatFaceData from '../service/ChatFaceData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

CHAT_BOT_FACE =
  'https://res.cloudinary.com/dknvsbuyy/image/upload/v1685678135/chat_1_c7eda483e3.png';
export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatFaceColor, setChatFaceColor] = useState();
  const [idBot, setIdBot] = useState();
  const scrollViewRef = useRef();

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
    console.log('messages[0].text', messages[0].text);
    if (messages[0].text) {
      getBardResp(messages[0].text);
    }
  }, []);

  const getBardResp = async msg => {
    setLoading(true);
    console.log('msg', msg);
    // console.log('hi')

    await axios.get(`http://192.168.1.4:3000/api/bardapi?ques=${msg}`)?.then(
      resp => {
        console.log('3');
        if (resp.data.resp[1].content) {
          console.log('resp.data.resp[1].content', resp.data.resp[1].content);
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
        console.log('vao');
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
          padding: 3,

          backgroundColor: '#671ddf',
          color: '#fff',
        }}
        textInputStyle={{color: '#fff'}}
      />
    );
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <View style={{}}>
          {/* <FontAwesome name="send" size={24} color="white" resizeMode={'center'} /> */}
          <Text>Send</Text>
        </View>
      </Send>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff', paddingBottom:20}}>
      <View className=" flex-1">
        <View style={{alignItem: 'center'}}>
          <Image
            source={{uri: ChatFaceData[idBot]?.image}}
            style={{height: 150, width: 150, marginTop: 20, alignSelf: 'center'}}
          />
          <Text style={{marginTop: 10, fontSize: 25, textAlign:"center"}}>How Can I help you?</Text>
        </View>
        <View
          style={{flexGrow:1, marginLeft:10, marginRight:10}}
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
            // renderInputToolbar={renderInputToolbar}
            renderSend={renderSend}
          />
        </View>
      </View>
    </View>
  );
}

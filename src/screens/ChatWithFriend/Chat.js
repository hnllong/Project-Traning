import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';

const Chat = () => {
  const navigation = useNavigation();
  const [messageList, setMessageList] = useState([]);
  const route = useRoute();
  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .doc(route?.params?.id + route?.params?.data?.userId)
      .collection('messages')
      .orderBy('createdAt', 'desc');
    subscriber.onSnapshot(querysnapshot => {
      const allmessages = querysnapshot.docs.map(item => {
        return {...item._data, createdAt: item._data.createdAt};
      });
      setMessageList(allmessages);
    });
    // return () => subscriber();
    return () => {
      return subscriber;
    };
  }, []);

  const onSend = useCallback(async (messages = []) => {
    const msg = messages[0];
    const myMsg = {
      ...msg,
      sendBy: route.params.id,
      sendTo: route.params.data.userId,
      createdAt: Date.parse(msg.createdAt),
    };
    setMessageList(previousMessages =>
      GiftedChat.append(previousMessages, myMsg),
    );
    firestore()
      .collection('chats')
      .doc('' + route.params.id + route.params.data.userId)
      .collection('messages')
      .add(myMsg);
    firestore()
      .collection('chats')
      .doc('' + route.params.data.userId + route.params.id)
      .collection('messages')
      .add(myMsg);
  }, []);

  const handleCall = () => {
    navigation.navigate('VideoCall');
  };

  return (
    <>
      <View style={styles.viewHeader}>
        <Image
          source={require('../../../src/assets/ic_back.png')}
          style={styles.styleImage}
        />
        <TouchableOpacity onPress={handleCall}>
          <Image
            source={require('../../../src/assets/ic_call.png')}
            style={styles.styleImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={{flex: 6, backgroundColor: 'pink'}}>
          <GiftedChat
            messages={messageList}
            onSend={messages => onSend(messages)}
            user={{
              _id: route?.params?.id,
            }}
            showUserAvatar
          />
        </View>
        <View style={{flex: 1}}></View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  styleImage: {
    width: 30,
    height: 30,
  },
  viewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingHorizontal: 10,
  },
});

export default Chat;

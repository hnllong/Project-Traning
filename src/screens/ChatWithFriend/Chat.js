import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View,Text} from 'react-native';
import {GiftedChat,InputToolbar} from 'react-native-gifted-chat';

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
    console.log('msg', msg)
    const myMsg = {
      ...msg,
      sendBy: route.params.id,
      sendTo: route.params.data.userId,
      createdAt: Date.parse(msg.createdAt),
      avatar:  route.params.data.avatar
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

  const renderInputToolbar = props => {
    //Add the extra styles via containerStyle
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          // backgroundColor: chatFaceColor,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "black",
          // marginTop: 60,
          color: 'black',
        }}
        textInputStyle={{color: 'black'}}
      />
    );
  };
console.log('route?.params?.data?.avatar',route?.params?.data?.avatar)

  return (
    <>
      <View style={styles.viewHeader}>
        <TouchableOpacity style={{ flexDirection: 'row',  alignItems: 'center'}} onPress={()=> navigation.goBack()}>
        <Image
          source={require('../../../src/assets/ic_back.png')}
          style={styles.styleImage}
        />
        <Text style={{marginLeft :8, fontSize:20, fontWeight:"bold"}}>{route?.params?.data?.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCall}>
          <Image
            source={require('../../../src/assets/ic_call.png')}
            style={styles.styleImage}
          />
        </TouchableOpacity>
      </View>

      

      <View style={styles.container}>
        <View style={{flex: 6, borderRadius: 10}}>
          <GiftedChat
            messages={messageList}
            onSend={messages => onSend(messages)}
            user={{
              _id: route?.params?.id,
              avatar: route?.params?.data?.avatar
            }}
            renderInputToolbar={renderInputToolbar}
            // renderSend={renderSend}
          />
        </View>
        <View style={{flex:1.15}}></View>
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

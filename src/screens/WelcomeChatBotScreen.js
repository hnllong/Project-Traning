import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Button,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import ChatFaceData from '../service/ChatFaceData';
export default function WelcomeChatBotScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [visible, setVisible] = useState(false);
  const [chatFaceData, setChatFaceData] = useState([]);
  const [selectedChatFace, setSelectedChatFace] = useState([]);
  const navgitaion = useNavigation();
  useEffect(() => {
    setChatFaceData(ChatFaceData);
    checkFaceId();
  }, []);

  const checkFaceId = async () => {
    const id = await AsyncStorage.getItem('chatFaceId');
    id
      ? setSelectedChatFace(ChatFaceData[id])
      : setSelectedChatFace(ChatFaceData[0]);
  };

  const onChatFacePress = async id => {
    setSelectedChatFace(ChatFaceData[id - 1]);
    await AsyncStorage.setItem('chatFaceId', (id - 1).toString());
  };

  const handleShowModal = () => {
    setVisible(true);
  };

  const toggleModal = () => {
    setVisible(!visible);
    navigation.navigate('ChatBot', {
      name: 'Long',
    });
  };
  console.log('test');
  return (
    <ScrollView>
      <Modal isVisible={visible}>
        <View style={{flex: 1}}>
          <Text>Hello!</Text>
          <View
            className="bg-white/3 p-2 rounded-3xl w-full "
            style={{backgroundColor: '#fff'}}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={'gray'}
              onChangeText={txt => setName(txt)}
              value={name}
            />
          </View>
          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
      <View style={{alignItems: 'center', paddingTop: 20}}>
        <Text style={[{color: selectedChatFace?.primary}, {fontSize: 30}]}>
          Hello,
        </Text>
        <Text
          style={[
            {color: selectedChatFace?.primary},
            {fontSize: 30, fontWeight: 'bold'},
          ]}>
          I am {selectedChatFace.name}
        </Text>
        <Image
          source={{uri: selectedChatFace.image}}
          style={{height: 150, width: 150, marginTop: 20}}
        />
        <Text style={{marginTop: 10, fontSize: 25, color: 'green'}}>
          How Can I help you?
        </Text>

        <View
          style={{
            // marginTop: 20,
            backgroundColor: '#F5F5F5',
            alignItems: 'center',
            height: 110,
            padding: 10,
            borderRadius: 10,
          }}>
          <FlatList
            data={chatFaceData}
            horizontal={true}
            renderItem={({item}) =>
              item.id != selectedChatFace.id && (
                <TouchableOpacity
                  style={{margin: 15}}
                  onPress={() => onChatFacePress(item.id)}>
                  <Image
                    source={{uri: item.image}}
                    style={{width: 40, height: 40}}
                  />
                </TouchableOpacity>
              )
            }
          />
          <Text style={{marginTop: 5, fontSize: 17, color: '#B0B0B0'}}>
            Choose Your Fav ChatBuddy
          </Text>
        </View>
        <TouchableOpacity
          style={[
            {backgroundColor: selectedChatFace.primary},
            {
              marginTop: 40,
              padding: 17,
              width: Dimensions.get('screen').width * 0.6,
              borderRadius: 100,
              alignItems: 'center',
            },
          ]}
          onPress={handleShowModal}>
          <Text style={{fontSize: 16, color: '#fff'}}>Let's Chat</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

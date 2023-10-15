import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Button,
  View,
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

// import { FontAwesome } from '@expo/vector-icons';

export default function IntroChat() {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <Image
        source={require('../../assets/images/intro_chat_friend.gif')}
        resizeMode="cover"
        style={styles.imgFriend}
      />
      {/* <ImageBackground
        source={require('../../assets/images/intro_chat.jpg')}
        resizeMode="cover"
        style={styles.image}> */}
      <View style={[styles.image, {backgroundColor: '#ECEDFF'}]}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Main')}>
          <Text style={styles.btnText}>Friend</Text>
        </TouchableOpacity>

        <View style={styles.flexRow}>
          <View style={styles.imgBot}>
            <Image
              source={require('../../assets/images/intro_chat_bot.gif')}
              resizeMode="cover"
              style={styles.imgBot}
            />
          </View>
          {/* <Button
        title="Chat With Bot"
        onPress={() => navigation.navigate('IntroBot')}
      /> */}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('IntroBot')}>
            <Text style={styles.btnText}>Bot</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </ImageBackground> */}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  imgFriend: {
    height: 300,
    width: '100%',
  },
  flexRow: {
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
    marginTop: 10,
  },
  imgBot: {
    height: 250,
    width: 250,
  },
  btn: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
    borderWidth: 1,
    backgroundColor: 'white',
    marginTop: 8,
  },
});

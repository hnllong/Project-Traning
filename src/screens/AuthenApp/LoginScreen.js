import React, {useContext, useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View,Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
import {MyContext} from '../../context/MyContext';

export default function LoginScreen() {
  const {setToken} = useContext(MyContext);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigation = useNavigation();
  console.log({email, pass});
  const handleLogin = async () => {
    try {
      const resLogin = await axios.post(`http://192.168.1.4:8080/auth/login`, {
        email,
        password: pass,
      });
       if (!resLogin?.data?.authentication?.sessionToken) return;
      setToken(resLogin?.data?.authentication?.sessionToken);
    } catch (error) {
      console.log('eror', error?.code)
      Alert.alert('Error', error?.code)
    }
  };

  return (
    <View className="bg-white h-full w-full">
      {/* <StatusBar style="light" /> */}
      <Image
        className="h-full w-full absolute"
        source={require('../../../src/assets/background.png')}
      />

      {/* lights */}
      <View className="flex-row justify-around w-full absolute">
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify()}
          source={require('../../../src/assets/light.png')}
          className="h-[225] w-[90]"
        />
        <Animated.Image
          entering={FadeInUp.delay(400).duration(1000).springify()}
          source={require('../../../src/assets/light.png')}
          className="h-[160] w-[65] opacity-75"
        />
      </View>

      {/* title and form */}
      <View className="h-full w-full flex justify-around pt-40 pb-10">
        {/* title */}

        {/* form */}
        <View className="flex items-center mx-5 space-y-4 mt-60">
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="bg-black/5 p-3 rounded-2xl w-full "  style={{borderWidth:1}}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={'gray'}
              onChangeText={txt => setEmail(txt)}
              value={email}

            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            className="bg-black/5 p-3 rounded-2xl w-full mb-3"  style={{borderWidth:1}}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={'gray'}
              secureTextEntry
              onChangeText={txt => setPass(txt)}
              value={pass}
            />
          </Animated.View>

          <Animated.View
            className="w-full"
            entering={FadeInDown.delay(400).duration(1000).springify()}>
            <TouchableOpacity
              className="w-full bg-sky-400 p-3 rounded-2xl mb-3"
              onPress={handleLogin}>
              <Text className="text-xl font-bold text-white text-center">
                Login
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="flex-row justify-center">
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.push('SignUpApp')}  style={{marginLeft:10}}>
              <Text className="text-sky-600">SignUp</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.push('ForgotApp')} style={{marginLeft:10}}>
              <Text className="text-sky-600">Forgot</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

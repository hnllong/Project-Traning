import React , {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
// import {StatusBar} from 'expo-status-bar';
import {useNavigation} from '@react-navigation/native';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';

export default function SignupScreen() {
  const navigation = useNavigation();
  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const [username,setUsername]= useState('');

  const handleSignUp = async()=>{
    try{
      const resLogin = await axios.post(`http://192.168.1.4:8080/auth/register`,{
        email,
        password,
        username,
      })
      await AsyncStorage.setItem('token',resLogin?.data?.authentication?.sessionToken);
     
    }
    catch(error){
     console.log('err', error)
    }
  }

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
      <View className="h-full w-full flex justify-around pt-48 mt-20">
        {/* title */}

        {/* form */}
        <View className="flex items-center mx-5 space-y-4">
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="bg-black/5 p-3 rounded-2xl w-full"  style={{borderWidth:1}}>
            <TextInput placeholder="Username" placeholderTextColor={'black'} value={username} onChangeText={(txt)=>setUsername(txt)}/>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            className="bg-black/5 p-3 rounded-2xl w-full"  style={{borderWidth:1}}>
            <TextInput placeholder="Email" placeholderTextColor={'black'} value={email} onChangeText={(txt)=>setEmail(txt)}/>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className="bg-black/5 p-3 rounded-2xl w-full mb-3"  style={{borderWidth:1}}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={'black'}
              secureTextEntry
              value={password}
              onChangeText={(txt)=>setPassword(txt)}
            />
          </Animated.View>

          <Animated.View
            className="w-full"
            entering={FadeInDown.delay(600).duration(1000).springify()}>
            <TouchableOpacity className="w-full bg-sky-400 p-3 rounded-2xl mb-3" onPress={handleSignUp}>
              <Text className="text-xl font-bold text-white text-center">
                SignUp
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(800).duration(1000).springify()}
            className="flex-row justify-center">
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.push('LoginApp')}>
              <Text className="text-sky-600">Login</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

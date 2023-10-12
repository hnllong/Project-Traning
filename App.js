import React ,{useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import NavigatorOne from './src/navigation';
import TabAuthen from './src/navigation/TabAuthen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Screen1 = () => {
  return <View style={styles.screen1} />;
};

const Screen2 = () => {
  return <View style={styles.screen2} />;
};
const a = 1;
export default function App() {
  const [token, setToken]= useState()
  useEffect(() => {
    renderToken()
  });
  const renderToken =async()=>{
   const resToken = await AsyncStorage.getItem('chatFaceId');
   setToken(resToken)
  }
  console.log('token',token)
  if (a === 1) {
    return <TabAuthen />;
  }
  return NavigatorOne;
}
export const styles = StyleSheet.create({});

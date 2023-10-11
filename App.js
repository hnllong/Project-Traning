import React from 'react';
import {StyleSheet, View} from 'react-native';
import NavigatorOne from './src/navigation';
import TabAuthen from './src/navigation/TabAuthen';

const Screen1 = () => {
  return <View style={styles.screen1} />;
};

const Screen2 = () => {
  return <View style={styles.screen2} />;
};
const a = 1;
export default function App() {
  if (a === 1) {
    return <TabAuthen />;
  }
  return NavigatorOne;
}
export const styles = StyleSheet.create({});

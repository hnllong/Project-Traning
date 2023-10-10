import React from 'react';
import {StyleSheet, View} from 'react-native';
import NavigatorOne from './src/navigation';

const Screen1 = () => {
  return <View style={styles.screen1} />;
};

const Screen2 = () => {
  return <View style={styles.screen2} />;
};

export default function App() {
  return <NavigatorOne />;
}
export const styles = StyleSheet.create({});

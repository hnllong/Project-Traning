import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {MyContext} from './src/context/MyContext';
import NavigatorOne from './src/navigation';
import TabAuthen from './src/navigation/TabAuthen';

export default function App() {
  const [token, setToken] = useState();

  console.log('Valuee token', token);

  return (
    <View style={{flex: 1}}>
      <MyContext.Provider value={{token, setToken}}>
        {!token ? <TabAuthen /> : <NavigatorOne />}
      </MyContext.Provider>
    </View>
  );
}

export const styles = StyleSheet.create({});

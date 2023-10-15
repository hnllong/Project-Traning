import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused,useNavigation} from '@react-navigation/native';

const Setting = () => {
  const [mode, setMode] = useState('LIGHT');
  const navigation = useNavigation();
  const isFocued = useIsFocused();
  const changeMode = async x => {
    await AsyncStorage.setItem('MODE', x);
  };
  useEffect(() => {
    getMode();
  }, [isFocued]);
  const getMode = async () => {
    setMode(await AsyncStorage.getItem('MODE'));
  };
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: mode == 'LIGHT' ? 'white' : '#212121'},
      ]}>
      <View style={styles.themChangeView}>
        <Text
          style={{
            color: mode == 'LIGHT' ? 'black' : 'white',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Change Mode
        </Text>
        <TouchableOpacity
          style={[
            styles.btn,
            {backgroundColor: mode == 'LIGHT' ? 'black' : 'white'},
          ]}
          onPress={() => {
            setMode(mode == 'LIGHT' ? 'DARK' : 'LIGHT');
            changeMode(mode == 'LIGHT' ? 'DARK' : 'LIGHT');
          }}>
          <Text style={{color: mode == 'LIGHT' ? 'white' : 'black'}}>
            Dark Mode
          </Text>
        </TouchableOpacity>
       
      </View>
      <TouchableOpacity
          style={styles.btn2}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
    </View>
  );
};

export default Setting;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  themChangeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight: 30,
    height: 50,
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 50,
  },
  btn: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 6,
    borderColor: 'blue',
  },
  btn2: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'blue',
    
  },
  btnText: {
    color: 'white',
    fontSize: 20,
  },
});

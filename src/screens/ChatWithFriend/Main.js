import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';

import Setting from './Setting';
import Users from './Users';

const Main = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <View style={styles.container}>
      {selectedTab == 0 ? <Users /> : <Setting />}
      <View style={styles.bottomTab}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setSelectedTab(0);
          }}>
          <Image
            source={require('../../assets/icons/user.png')}
            style={[
              styles.tabIcon,
              {tintColor: selectedTab == 0 ? 'white' : '#A09F9F'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setSelectedTab(1);
          }}>
          <Image
            source={require('../../assets/icons/setting.png')}
            style={[
              styles.tabIcon,
              {tintColor: selectedTab == 1 ? 'white' : '#A09F9F'},
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    
  },
  bottomTab: {
    position: 'absolute',
    bottom: 60,
    width: '80%',
    height: 80,
    backgroundColor: 'purple',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf:'center',
    borderTopLeftRadius:40,
    borderTopRightRadius:40
  },
  tab: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    width: 30,
    height: 30,
  },
});

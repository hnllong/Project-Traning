import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import TabChat from './src/navigation/TabChat';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import TabMovies from './src/navigation/TabMovies';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Test from './src/navigation/Test';
import NavigatorOne from './src/navigation';


const Screen1 = () => {
  return <View style={styles.screen1} />;
};

const Screen2 = () => {
  return <View style={styles.screen2} />;
};

export default function App() {
  // return (
  //   // <AppNavigation />
  // )
  const Stack = createNativeStackNavigator();
  const _renderIcon = (routeName, selectedTab) => {
    let icon = '';

    switch (routeName) {
      case 'title1':
        icon = 'Movies';
        break;
      case 'title2':
        icon = 'Weather';
        break;
    }

    return <Text>{icon}</Text>;
  };

  const renderTabBar = ({routeName, selectedTab, navigate}) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}>
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };


  return (
    <NavigatorOne />
   
  
  );
}
export const styles = StyleSheet.create({
  
});

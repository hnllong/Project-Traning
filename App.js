import React from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import TabChat from './src/navigation/TabChat';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import TabMovies from './src/navigation/TabMovies';

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
    <NavigationContainer>
      <CurvedBottomBar.Navigator
        type="UP"
        style={styles.bottomBar}
        shadowStyle={styles.shawdow}
        height={55}
        circleWidth={50}
        bgColor="#F08437"
        initialRouteName="title1"
        borderTopLeftRight
        screenOptions={{headerShown: false}}
        renderCircle={({selectedTab, navigate}) => (
          <Animated.View style={styles.btnCircleUp}>
            {console.log('selectedTab', selectedTab)}
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigate('Movie-App')}>
              {/* <Ionicons name={'apps-sharp'} color="gray" size={25} /> */}
              <Text
                style={{
                  color: '#F08437',
                  fontSize: selectedTab === 'Movie-App' ? 20 : 15,
                  fontWeight: selectedTab === 'Movie-App' ? 'bold' : 500,
                }}>
                Bot
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={renderTabBar}>
        <CurvedBottomBar.Screen
          name="title1"
          position="LEFT"
          component={() => <TabMovies />}
        />
        <CurvedBottomBar.Screen
          name="title2"
          component={() => <Screen2 />}
          position="RIGHT"
        />
        <CurvedBottomBar.Screen
          name="Movie-App"
          component={() => <TabChat />}
          position="CIRCLE"
        />
      </CurvedBottomBar.Navigator>
    </NavigationContainer>
  );
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    bottom: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 30,
    height: 30,
  },
  screen1: {
    flex: 1,
    backgroundColor: '#BFEFFF',
  },
  screen2: {
    flex: 1,
    backgroundColor: '#FFEBCD',
  },
});

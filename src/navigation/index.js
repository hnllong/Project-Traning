import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import TabChat from './TabChat';
import TabMovies from './TabMovies';
import WeatherScreen from '../screens/WeatherScreen';

const Screen1 = () => {
  return <View style={styles.screen1} />;
};

const Screen2 = () => {
  return <View style={styles.screen2} />;
};

export default function NavigatorOne() {
  const [routeName, setRouteName] = useState();
  console.log('routeName', routeName);
  // return (
  //   // <AppNavigation />
  // )
  useEffect(() => {
    return () => {
      tabBarRef.current.setVisible(true);
    };
  }, []);

  const Stack = createNativeStackNavigator();
  const tabBarRef = useRef();
  const navigationRef = useRef();
  const _renderIcon = (routeName, selectedTab) => {
    console.log('selectedTab', selectedTab);
    let icon = '';
    let customStyle = {};
    switch (routeName) {
      case 'title1':
        icon = require('../../assets/images/ic_movie.png');
        customStyle = {
          height: selectedTab === 'title1' ? 50 : 40,
          width: selectedTab === 'title1' ? 50 : 40,
          tintColor: '#ffffffff',
        };
        break;
      case 'title2':
        icon = require('../../assets/images/ic_weather.png');
        customStyle = {
          height: selectedTab === 'title2' ? 60 : 40,
          width: selectedTab === 'title2' ? 60 : 40,
          tintColor: '#ffffffff',
        };
        break;
    }

    return <Image source={icon} style={customStyle} resizeMode="contain" />;
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
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        const currentRoute = navigationRef.current.getCurrentRoute();
        console.log('currentRoute', currentRoute);
        setRouteName(currentRoute.name);
        // Do whatever you want with navigation here!.
      }}>
      <CurvedBottomBar.Navigator
        ref={tabBarRef}
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
          component={() => <WeatherScreen />}
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

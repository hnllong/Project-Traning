import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, View} from 'react-native';
// import { FontAwesome } from '@expo/vector-icons';

export default function IntroChat() {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: 'pink', justifyContent: 'center'}}>
      <Button
        title="Chat With Bot"
        onPress={() => navigation.navigate('IntroBot')}
      />
      <Button
        title="Chat With Friend"
        onPress={() => navigation.navigate('Main')}
      />
    </View>
  );
}

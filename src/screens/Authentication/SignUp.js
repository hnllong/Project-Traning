import {
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGoXtzg12kbkhmTUnm1AsqRMAGYhUQARe7mQ&usqp=CAU');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const registerUser = () => {
    const userId = uuid.v4();
    firestore()
      .collection('users')
      .doc(userId)
      .set({
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        userId: userId,
        avatar:avatar
      })
      .then(res => {
        console.log('user created ');
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log(error);
      });
  };
  const validate = () => {
    let isValid = true;
    if (name == '') {
      isValid = false;
    }
    if (email == '') {
      isValid = false;
    }
    if (mobile == '') {
      isValid = false;
    }
    if (password == '') {
      isValid = false;
    }
    if (confirmPassword == '') {
      isValid = false;
    }
    if (confirmPassword !== password) {
      isValid = false;
    }
    return isValid;
  };
  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom:200}}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        placeholder="Enter Name"
        style={[styles.input, {marginTop: 50}]}
        value={name}
        onChangeText={txt => setName(txt)}
      />
      <TextInput
        placeholder="Enter Email"
        style={[styles.input, {marginTop: 20}]}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
       <TextInput
        placeholder="Enter Avatar"
        style={[styles.input, {marginTop: 20}]}
        value={avatar}
        onChangeText={txt => setAvatar(txt)}
      />
      <TextInput
        placeholder="Enter Mobile"
        keyboardType={'number-pad'}
        style={[styles.input, {marginTop: 20}]}
        value={mobile}
        onChangeText={txt => setMobile(txt)}
      />
      <TextInput
        placeholder="Enter Password"
        style={[styles.input, {marginTop: 20}]}
        value={password}
        onChangeText={txt => setPassword(txt)}
      />
      <TextInput
        placeholder="Enter Confirm Password"
        style={[styles.input, {marginTop: 20}]}
        value={confirmPassword}
        onChangeText={txt => setConfirmPassword(txt)}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          if (validate()) {
            registerUser();
          } else {
            Alert.alert('Please Enter Correct Data');
          }
        }}>
        <Text style={styles.btnText}>Sign up</Text>
      </TouchableOpacity>
      <Text
        style={styles.orLogin}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        Or Login
      </Text>
    </ScrollView>
  );
};

export default Signup;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    color: 'black',
    alignSelf: 'center',
    marginTop: 100,
    fontWeight: '600',
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,

    alignSelf: 'center',
    paddingLeft: 20,
  },
  btn: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: 'purple',
  },
  btnText: {
    color: 'white',
    fontSize: 20,
  },
  orLogin: {
    alignSelf: 'center',
    marginTop: 50,
    fontSize: 20,
    textDecorationLine: 'underline',
    fontWeight: '600',
    color: 'black',
  },
});

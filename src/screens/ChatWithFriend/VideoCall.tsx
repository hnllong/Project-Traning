import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  IRtcEngine,
  RtcSurfaceView,
  createAgoraRtcEngine,
} from 'react-native-agora';

const appId = '7a7cc00cee23443dbf0ed8185bee91ad';
const channelName = 'Test Video Call';
const token =
  '007eJxTYEhmW2zYerj/2KSggqMsUZKnBeMbd08RY7nuKXfRQm7WlFoFBvNE8+RkA4Pk1FQjYxMT45SkNIPUFAtDC9Ok1FRLw8SU0wKqqQ2BjAzyudasjAyMDCxADOIzgUlmMMkCJvkZQlKLSxTCMlNS8xWcE3NyGBgANgAjFQ==';
const uid = 0;

const VideoCall = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const agoraEngineRef = useRef<IRtcEngine>(); // Agora engine instance
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [message, setMessage] = useState(''); // Message to the user

  useEffect(() => {
    // Initialize Agora engine when the app starts
    setupVideoSDKEngine();
  });

  const handleInit = () => {
    setLoading(false);
    join();
  };

  useEffect(() => {
    setTimeout(() => {
      return handleInit();
    }, 1000);

    return () => {
      leave();
    };
  }, []);

  const setupVideoSDKEngine = async () => {
    try {
      // use the helper function to get permissions
      if (Platform.OS === 'android') {
        await getPermission();
      }
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          showMessage('Successfully joined the channel ' + channelName);
          setIsJoined(true);
        },
        onUserJoined: (_connection, Uid) => {
          showMessage('Remote user joined with uid ' + Uid);
          setRemoteUid(Uid);
        },
        onUserOffline: (_connection, Uid) => {
          showMessage('Remote user left the channel. uid: ' + Uid);
          setRemoteUid(0);
        },
      });
      agoraEngine.initialize({
        appId: appId,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });
      agoraEngine.enableVideo();
    } catch (e) {
      console.log(e);
    }
  };

  const join = async () => {
    console.log('vao');
    if (isJoined) {
      return;
    }
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileCommunication,
      );
      agoraEngineRef.current?.startPreview();
      agoraEngineRef.current?.joinChannel(token, channelName, uid, {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const leave = () => {
    console.log('leave');
    try {
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      showMessage('You left the channel');
    } catch (e) {
      console.log(e);
    }
  };

  function showMessage(msg: string) {
    setMessage(msg);
  }

  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  };

  const handleOut = () => {
    leave();
    navigation.navigate('Chat');
  };

  return (
    <SafeAreaView style={styles.main}>
      {loading ? (
        <Image
          source={require('../../../assets/images/loading.gif')}
          style={{height: 300, width: 300}}
          resizeMode="cover"
        />
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContainer}>
          {isJoined ? (
            <React.Fragment key={0}>
              <RtcSurfaceView canvas={{uid: 0}} style={[styles.videoView]} />
              <Text>Local user uid: {uid}</Text>
            </React.Fragment>
          ) : (
            <Text>Join a channel</Text>
          )}
          {isJoined && remoteUid !== 0 ? (
            <React.Fragment key={remoteUid}>
              <RtcSurfaceView
                canvas={{uid: remoteUid}}
                style={[styles.videoViewFromOther]}
              />
              <Text>Remote user uid: {remoteUid}</Text>
            </React.Fragment>
          ) : (
            <Text>Waiting for a remote user to join</Text>
          )}
          <Text style={styles.info}>{message}</Text>
        </ScrollView>
      )}
      <TouchableOpacity style={styles.viewFooter} onPress={handleOut}>
        <Image
          source={require('../../../src/assets/ic_decline.png')}
          style={styles.styleImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#0055cc',
    margin: 5,
  },
  main: {flex: 1, alignItems: 'center', backgroundColor: '#fff'},
  scroll: {flex: 1, backgroundColor: '#ddeeff', width: '100%'},
  scrollContainer: {alignItems: 'center'},
  videoView: {width: '100%', flex: 1, flexGrow: 1, height: 1000},
  btnContainer: {flexDirection: 'row', justifyContent: 'center'},
  head: {fontSize: 20},
  info: {backgroundColor: '#ffffe0', color: '#0000ff'},
  styleImage: {
    width: '100%',
    height: '100%',
  },
  viewFooter: {
    position: 'absolute',
    bottom: 70,
    width: 100,
    height: 100,
  },
  videoViewFromOther: {
    height: 200,
    width: '35%',
    top: 20,
    right: 20,
    position: 'absolute',
  },
});
export default VideoCall;

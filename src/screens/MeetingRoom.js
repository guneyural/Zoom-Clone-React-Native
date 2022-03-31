import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  SafeAreaView,
  Text,
  Modal,
} from 'react-native';
import StartMeeting from '../components/StartMeeting';
import io from 'socket.io-client';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Chat from '../components/Chat';

const menuIcons = [
  {
    id: 1,
    name: 'microphone',
    title: 'mute',
  },
  {
    id: 2,
    name: 'video-camera',
    title: 'Stop Video',
  },
  {
    id: 3,
    name: 'upload',
    title: 'Share Content',
  },
  {
    id: 4,
    name: 'group',
    title: 'Participants',
  },
];

function DismissKeyboard({children}) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
}

function MeetingRoom() {
  const [name, setName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [activeUsers, setActiveUsers] = useState([]);
  const [startCamera, setStartCamera] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const socketRef = useRef();

  const device = useCameraDevices('wide-angle-camera')['front'];

  const openCamera = async () => {
    const cameraPermission = await Camera.requestCameraPermission();
    const microphonePermission = await Camera.requestMicrophonePermission();

    if (
      cameraPermission == 'authorized' &&
      microphonePermission == 'authorized'
    ) {
      setStartCamera(true);
    } else {
      Alert.alert('Alert', "Couldn't start meeting because access denied.", [
        'Ok',
      ]);
    }
  };

  const joinRoom = () => {
    openCamera();
    socketRef.current.emit('join-room', {roomId, username: name});
  };

  useEffect(() => {
    const API_URL = 'http://192.168.1.25:3001/';
    socketRef.current = io.connect(API_URL);

    socketRef.current.on('all-users', users => {
      setActiveUsers(users);
    });
  }, []);

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        {startCamera ? (
          <SafeAreaView style={{flex: 1}}>
            <Modal
              animationType="slide"
              transparent={false}
              presentationStyle="fullscreen"
              visible={modalVisible}
              onRequestClose={() => setModalVisible(!modalVisible)}>
              <Chat
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
              />
            </Modal>
            <View style={styles.activeUsersContainer}>
              <View style={styles.cameraContainer}>
                <Camera
                  style={{
                    width: activeUsers.length <= 1 ? '100%' : 200,
                    height: activeUsers.length <= 1 ? 600 : 200,
                  }}
                  device={device}
                  isActive={startCamera}></Camera>

                {activeUsers.length > 1 &&
                  activeUsers.map((user, index) => {
                    return (
                      <View style={styles.activeUserContainer} key={index}>
                        <Text style={{color: 'white'}}>{user.username}</Text>
                      </View>
                    );
                  })}
              </View>
            </View>
            <View style={styles.menu}>
              {menuIcons.map((icon, index) => {
                return (
                  <TouchableOpacity
                    style={styles.tile}
                    activeOpacity={0.6}
                    key={index}>
                    <FontAwesome name={icon.name} size={24} color={'#efefef'} />
                    <Text style={styles.textTile}>{icon.title}</Text>
                  </TouchableOpacity>
                );
              })}
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.tile}
                activeOpacity={0.6}>
                <FontAwesome name={'comment'} size={24} color={'#efefef'} />
                <Text style={styles.textTile}>Chat</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        ) : (
          <StartMeeting
            name={name}
            setName={setName}
            roomId={roomId}
            setRoomId={setRoomId}
            joinRoom={joinRoom}
          />
        )}
      </View>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: '#1c1c1c', flex: 1},
  tile: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  textTile: {color: 'white', marginTop: 10},
  menu: {flexDirection: 'row', justifyContent: 'space-around'},
  cameraContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  activeUserContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeUsersContainer: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MeetingRoom;

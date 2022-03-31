import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ChatHeader from './ChatHeader';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Chat = ({modalVisible, setModalVisible}) => {
  const [message, setMessage] = useState('');

  return (
    <View style={styles.container}>
      <SafeAreaView style={{height: '100%'}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 40 : 0}
          style={{flex: 1}}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{flex: 1}}>
              <ChatHeader setModalVisible={setModalVisible} />
              <View style={styles.chatMessages}></View>
              <View style={styles.chatFormContainer}>
                <Text style={{color: 'white'}}>Send to: Everyone</Text>
                <View style={styles.chatForm}>
                  <TextInput
                    value={message}
                    onChangeText={text => setMessage(text)}
                    placeholder="Tap here to type"
                    placeholderTextColor="#8c8c8c"
                    style={styles.textInput}
                  />
                  <TouchableOpacity
                    style={{
                      ...styles.button,
                      backgroundColor: message ? '#0B71EB' : '#373838',
                    }}>
                    <FontAwesome name="send" size={18} color={'#efefef'} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  chatFormContainer: {
    borderColor: '#2f2f2f',
    borderTopWidth: 1,
    padding: 12,
  },
  textInput: {
    height: 40,
    color: '#efefef',
    borderColor: '#595859',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 12,
    flex: 1,
  },
  chatForm: {flexDirection: 'row'},
  button: {
    height: 40,
    width: 40,
    marginTop: 12,
    marginLeft: 12,
    backgroundColor: '#373838',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  chatMessages: {flex: 1},
});

export default Chat;

import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const contactsMenuButtons = [
  {
    type: 'starred',
  },
  {
    type: 'contact',
    name: 'Çetin Toran',
    photo: require('../assets/cetin_toran.png'),
  },
  {
    type: 'contact',
    name: 'BMW M8 Competition',
    photo: require('../assets/1097931.jpg'),
  },
  {
    type: 'contact',
    name: 'BMW',
    photo: require('../assets/6863719.jpg'),
  },
];

function Contacts() {
  return (
    <View style={styles.container}>
      {contactsMenuButtons.map((contact, index) => {
        return (
          <View style={styles.row} key={index}>
            {contact.type == 'starred' ? (
              <View style={styles.starredIcon}>
                <AntDesign name="star" size={30} color="#efefef" />
              </View>
            ) : (
              <Image source={contact.photo} style={styles.image} />
            )}
            <Text style={styles.text}>
              {contact.type == 'starred' ? 'Starred' : contact.name}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 55,
    height: 55,
    borderRadius: 20,
  },
  text: {
    color: 'white',
    paddingLeft: 15,
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  starredIcon: {
    backgroundColor: '#333',
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});

export default Contacts;

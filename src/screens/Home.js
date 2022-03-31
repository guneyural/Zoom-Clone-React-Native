import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import MenuButtons from '../components/MenuButtons';
import Contacts from '../components/Contacts';

function Home({navigation}) {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{height: '100%'}}>
        <Header />
        <SearchBar />
        <MenuButtons navigation={navigation} />
        <Contacts />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: '#1c1c1c', padding: 15},
});

export default Home;

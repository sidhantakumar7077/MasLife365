import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Index = props => {
  const navigation = useNavigation();

  const open_drawer = () => {
    navigation.openDrawer();
  };

  const confirmLogout = () => {
    AsyncStorage.removeItem('user_details');
    navigation.replace('Login');
  };

  const isLogout = () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to Logout ?', [
      {text: 'cancel'},
      {text: 'OK', onPress: confirmLogout},
    ]);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        width: '92%',
        alignSelf: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {/* <TouchableOpacity onPress={open_drawer} >
                    <MaterialIcons style={{ }} name="segment" size={38} color={'#fff'} />
                </TouchableOpacity> */}
        <Image
          style={{height: 30, width: 150}}
          source={require('../../assets/Logo/mainLogo.png')}
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => props.navigation.navigate('Search')}>
            <Fontisto name="search" size={22} color={'#c4c4c4'} />
          </TouchableOpacity>
          {/* <TouchableOpacity>
                        <Octicons style={{}} name="person" size={25} color={'#c4c4c4'} />
                    </TouchableOpacity> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({});

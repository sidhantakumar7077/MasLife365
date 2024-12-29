import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CallApi } from '../../../component/CallApi/index';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CardView from 'react-native-cardview';
import Fontisto from 'react-native-vector-icons/Fontisto';

const Index = ({ setChecked }) => {

  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const forgot_password = () => {
    navigation.navigate('Forgot_password');
  };

  const createuser = () => {
    let form = new FormData();
    form.append('email', email);
    form.append('password', password);

    try {
      const emailType = /^\w+([\D.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (email === '' || emailType.test(email) === false) {
        Alert.alert('Validation Error', 'Please Enter Your Valid Email');
        return false;
      }
      if (password === '') {
        Alert.alert('Validation Error', 'Please Enter Your Password');
        return false;
      }

      setLoader(true);
      CallApi('POST', `/api/login`, form).then(response => {
        console.log('response', response);
        AsyncStorage.setItem('user_details', JSON.stringify(response));
        var ud = AsyncStorage.getItem('user_details');
        console.log('after set token', JSON.stringify(response));
        setLoader(false);
        if (response.user) {
          navigation.replace('BottomNav');
          // alert(response.message)
        } else {
          alert(response.message);
        }
      });
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={{ marginLeft: 13, marginVertical: 7, marginTop: 18, flexDirection: 'row' }}>
        <FontAwesome onPress={() => props.navigation.goBack()} name="angle-left" color={'#b6b6b6'} size={28} />
      </View>
      <View style={{ backgroundColor: '#88888a', height: 0.4, marginHorizontal: 10 }}></View> */}
      <View style={{ flex: 1, marginTop: 40 }}>
        <View style={{ alignItems: 'center' }}>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                color: '#efefef',
                fontSize: 26,
                fontFamily: 'Roboto-Light',
              }}>
              Welcome Back
            </Text>
            <Text
              style={{
                color: '#efefef',
                fontSize: 16,
                fontFamily: 'Roboto-Light',
              }}>
              Sign in
            </Text>
          </View>
          <View style={{ alignItems: 'center', width: '100%', marginTop: 28 }}>
            <CardView
              style={styles.cardStyle}
              cardElevation={5}
              cardMaxElevation={2}
              cornerRadius={10}>
              <Fontisto
                style={{ alignSelf: 'center' }}
                name="email"
                size={20}
                color={'#88888a'}
              />
              <TextInput
                style={styles.inputs}
                onChangeText={setEmail}
                type="email"
                value={email}
                autoCapitalize="none"
                placeholder="Email"
                placeholderTextColor="#b6b6b6"
                keyboardType="email-address"
                underlineColorAndroid="transparent"
              />
            </CardView>
            <CardView
              style={styles.cardStyle}
              cardElevation={5}
              cardMaxElevation={2}
              cornerRadius={10}>
              <MaterialIcons
                style={{ alignSelf: 'center' }}
                name="lock-outline"
                size={20}
                color={'#88888a'}
              />
              <TextInput
                style={styles.inputs}
                onChangeText={setPassword}
                type="password"
                value={password}
                autoCapitalize="none"
                placeholder="Password"
                placeholderTextColor="#b6b6b6"
                secureTextEntry={true}
                underlineColorAndroid="transparent"
              />
            </CardView>
            <TouchableOpacity
              onPress={forgot_password}
              style={{ alignSelf: 'flex-end' }}>
              <Text
                style={{
                  color: '#88888a',
                  fontSize: 14,
                  fontFamily: 'Roboto-Regular',
                }}>
                Forgot Password
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={createuser} style={styles.createBtn}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Roboto-Bold',
                  fontSize: 16,
                }}>
                SIGN IN
              </Text>
            </TouchableOpacity>
            {/* <View
              style={{
                marginTop: 18,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#aeb0af',
                  height: 0.4,
                  marginHorizontal: 10,
                  width: '30%',
                }}></View>
              <Text
                style={{
                  color: '#88888a',
                  fontSize: 15,
                  fontFamily: 'Roboto-Regular',
                }}>
                Or Sign in With
              </Text>
              <View
                style={{
                  backgroundColor: '#aeb0af',
                  height: 0.4,
                  marginHorizontal: 10,
                  width: '30%',
                }}></View>
            </View>
            <View
              style={{
                marginTop: 18,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#373739',
                  width: '47%',
                  borderRadius: 8,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <EvilIcons
                  style={{alignSelf: 'center'}}
                  name="sc-facebook"
                  size={26}
                  color={'#fff'}
                />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    fontFamily: 'Roboto-Bold',
                  }}>
                  Facebook
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#373739',
                  width: '47%',
                  borderRadius: 8,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <AntDesign
                  style={{alignSelf: 'center', marginRight: 10}}
                  name="google"
                  size={21}
                  color={'#fff'}
                />
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 16,
                    fontFamily: 'Roboto-Bold',
                  }}>
                  Google
                </Text>
              </TouchableOpacity>
            </View> */}
            <Text style={{ color: '#88888a', fontSize: 17, fontFamily: 'Roboto-Regular', marginTop: 25 }}>
              Don't have an account?{' '}
              <Text onPress={() => setChecked('Register')} style={{ color: '#c70e17', fontSize: 19, fontFamily: 'Roboto-Bold' }}> Sign up</Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141416',
  },
  cardStyle: {
    backgroundColor: '#373739',
    width: '100%',
    marginVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
    // borderWidth:0.6,
    // borderColor:'#fff'
  },
  inputs: {
    height: 50,
    width: '80%',
    alignSelf: 'center',
    marginLeft: 10,
    fontSize: 16,
    color: '#b6b6b6',
  },
  createBtn: {
    backgroundColor: '#c70e17',
    marginTop: 20,
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

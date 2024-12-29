import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CallApi } from '../../../component/CallApi/index';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CardView from 'react-native-cardview';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Index = ({ setChecked }) => {

  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');
  const [phone, setPhone] = useState('');

  const CreateUser = () => {
    const formdata = new FormData();
    formdata.append('name', name);
    formdata.append('email', email);
    formdata.append('password', password);
    formdata.append('password_confirmation', password_confirmation);
    formdata.append('phone', phone);

    // console.log("register Data", formdata);
    // return;

    try {
      const emailType = /^\w+([\D.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (name === '') {
        Alert.alert('Validation Error', 'Please Enter Your Name');
        return false;
      }
      if (email === '' || emailType.test(email) === false) {
        Alert.alert('Validation Error', 'Please Enter Your Valid Email');
        return false;
      }
      if (password === '') {
        Alert.alert('Validation Error', 'Please Enter Your Password');
        return false;
      }
      if (password_confirmation === '') {
        Alert.alert('Validation Error', 'Please Enter Your Confirm Password');
        return false;
      }
      if (phone === '') {
        Alert.alert('Validation Error', 'Please Enter Your phoneNumber');
        return false;
      }

      setLoader(true);
      CallApi('POST', `/api/register`, formdata).then(response => {
        console.log(response);
        setLoader(false);
        if (response.data) {
          navigation.navigate('BottomNav');
          alert('Successfully Registered');
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
      <ScrollView>
        {/* <View style={{ marginLeft: 13, marginVertical: 7, marginTop: 18, flexDirection: 'row' }}>
                <FontAwesome onPress={() => props.navigation.goBack()} name="angle-left" color={'#b6b6b6'} size={28} />
            </View>
            <View style={{ backgroundColor: '#88888a', height: 0.4, marginHorizontal: 10 }}></View> */}
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ alignItems: 'center' }}>
            <View style={{ alignItems: 'center', marginTop: 15 }}>
              <Text
                style={{
                  color: '#efefef',
                  fontSize: 26,
                  fontFamily: 'Roboto-Light',
                }}>
                Welcome, Let's Get Started
              </Text>
              <Text
                style={{
                  color: '#efefef',
                  fontSize: 16,
                  fontFamily: 'Roboto-Light',
                }}>
                Create Your MasLife365 Account
              </Text>
            </View>
            <View style={{ alignItems: 'center', width: '100%', marginTop: 28 }}>
              <CardView
                style={styles.cardStyle}
                cardElevation={5}
                cardMaxElevation={2}
                cornerRadius={10}>
                <AntDesign
                  style={{ alignSelf: 'center' }}
                  name="user"
                  size={20}
                  color={'#88888a'}
                />
                <TextInput
                  style={styles.inputs}
                  onChangeText={setName}
                  type="text"
                  value={name}
                  placeholder="Name"
                  placeholderTextColor="#b6b6b6"
                  // autoCapitalize='none'
                  underlineColorAndroid="transparent"
                />
              </CardView>
              <CardView
                style={styles.cardStyle}
                cardElevation={5}
                cardMaxElevation={2}
                cornerRadius={10}>
                <AntDesign
                  style={{ alignSelf: 'center' }}
                  name="phone"
                  size={20}
                  color={'#88888a'}
                />
                <TextInput
                  style={styles.inputs}
                  onChangeText={setPhone}
                  type="text"
                  value={phone}
                  placeholder="Phone"
                  placeholderTextColor="#b6b6b6"
                  // autoCapitalize='none'
                  underlineColorAndroid="transparent"
                  keyboardType="phone-pad"
                />
              </CardView>
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
                  placeholder="Email"
                  placeholderTextColor="#b6b6b6"
                  keyboardType="email-address"
                  autoCapitalize="none"
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
                  placeholder="Create Password"
                  placeholderTextColor="#b6b6b6"
                  secureTextEntry={true}
                  autoCapitalize="none"
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
                  onChangeText={setPassword_confirmation}
                  type="password"
                  value={password_confirmation}
                  placeholder="Confirmation Password"
                  placeholderTextColor="#b6b6b6"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                />
              </CardView>
              <TouchableOpacity onPress={CreateUser} style={styles.createBtn}>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Roboto-Bold',
                    fontSize: 16,
                  }}>
                  CREATE ACCOUNT
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
                    width: '20%',
                  }}></View>
                <Text
                  style={{
                    color: '#b6b6b6',
                    fontSize: 15,
                    fontFamily: 'Roboto-Regular',
                  }}>
                  Or Create Account With
                </Text>
                <View
                  style={{
                    backgroundColor: '#aeb0af',
                    height: 0.4,
                    marginHorizontal: 10,
                    width: '20%',
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
                    borderRadius: 10,
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
                    borderRadius: 10,
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
              <Text style={{ color: '#aaabad', fontSize: 17, fontFamily: 'Roboto-Regular', marginTop: 25 }}>
                Already have an account?{' '}
                <Text onPress={() => setChecked('Login')} style={{ color: '#c70e17', fontSize: 19, fontFamily: 'Roboto-Bold' }}>Sign in</Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
  },
  inputs: {
    height: 45,
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

import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { STORE_ID, CallApi } from '../../component/CallApi/index';
import Spinner from 'react-native-loading-spinner-overlay';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

const Index = props => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [userId, setUserId] = useState('');

  const confirmLogout = () => {
    AsyncStorage.removeItem('user_details');
    navigation.replace('BottomNav');
  };

  const isLogout = () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to Logout ?', [
      { text: 'cancel' },
      { text: 'OK', onPress: confirmLogout },
    ]);
  };

  const get_profile = async () => {
    var ud_json = await AsyncStorage.getItem('user_details');
    const user_detail = JSON.parse(ud_json);
    setUserId(user_detail.user.id);
    try {
      setSpinner(true);
      CallApi('GET', '/api/profile/' + user_detail.user.id).then(res => {
        console.log('ProfileGet', res.profile);
        setData(res.profile);
        setSpinner(false);
      });
    } catch (error) {
      console.log('error', error);
      setSpinner(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      get_profile();
    }
  }, [isFocused]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={{ width: '90%', alignSelf: 'center' }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: '15%', marginVertical: 7, marginTop: 18, flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center' }}>
          <FontAwesome name="angle-left" color={'#b6b6b6'} size={28} />
          <Text style={{ color: '#b6b6b6', fontSize: 18, marginLeft: 10 }}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: '#88888a', height: 0.4, width: '90%', alignSelf: 'center' }}></View>
      <View style={{ width: '90%', alignSelf: 'center', marginTop: 10 }}>
        <Text style={{ color: '#b1b1b1', fontSize: 18, fontFamily: 'Roboto-Regular' }}>My Profile</Text>
      </View>
      {spinner === true ? (
        <Spinner
          visible={spinner}
          animation="slide"
          color="#e00024"
          overlayColor="rgba(0, 0, 0, 0.25)"
          textContent={'Loading...'}
          textStyle={{ color: '#e00024' }}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ marginVertical: 20, alignItems: 'center' }}>
            <View style={styles.profileBorder}>
              <View style={styles.profileContainer}>
                <Octicons name="person" style={styles.profileIcon} size={110} />
              </View>
              <View style={styles.cameraBtm}>
                <Ionicons name="camera-outline" style={{ color: '#fff' }} size={25} />
              </View>
            </View>
            <View style={{ marginTop: 10, alignItems: 'center' }}>
              <Text style={{ fontFamily: 'Roboto-Light', color: '#efefef', fontSize: 18 }}>{data?.name}</Text>
              <Text style={{ color: '#88888a', fontSize: 14 }}>{data?.email}</Text>
              <TouchableOpacity onPress={() => props.navigation.navigate('EditProfile')} style={styles.editProfileBtn}>
                <Text style={{ color: '#fff', fontFamily: 'Roboto-Bold' }}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ backgroundColor: '#88888a', height: 0.4, width: '90%', alignSelf: 'center' }}></View>
          <View style={{ width: '90%', alignSelf: 'center', marginTop: 14 }}>
            <Text style={{ color: '#88888a', marginHorizontal: 5 }}>Name</Text>
            <View style={{ marginTop: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5 }}>
              <Text style={{ color: '#fff' }}>{data?.name}</Text>
            </View>
            <View style={{ backgroundColor: '#88888a', height: 0.4, width: '100%', alignSelf: 'center', marginVertical: 15 }}></View>
            <Text style={{ color: '#88888a', marginHorizontal: 5 }}>Email Address</Text>
            <View style={{ marginTop: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5 }}>
              <Text style={{ color: '#fff' }}>{data?.email}</Text>
            </View>
            <View style={{ backgroundColor: '#88888a', height: 0.4, width: '100%', alignSelf: 'center', marginVertical: 15 }}></View>
            <Text style={{ color: '#88888a', marginHorizontal: 5 }}>Date Of Birth</Text>
            <View style={{ marginTop: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5 }}>
              <Text style={{ color: '#fff' }}>{moment(data?.dob).format("DD/MM/YYYY")}</Text>
            </View>
            <View style={{ backgroundColor: '#88888a', height: 0.4, width: '100%', alignSelf: 'center', marginVertical: 15 }}></View>
            <Text style={{ color: '#88888a', marginHorizontal: 5 }}>Change Password</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Reset_password', userId)} style={{ marginTop: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5 }}>
              <Text style={{ color: '#fff' }}>****************</Text>
              <Entypo style={{ marginTop: 2 }} name="chevron-right" color={'red'} size={20} />
            </TouchableOpacity>
            <View style={{ backgroundColor: '#88888a', height: 0.4, width: '100%', alignSelf: 'center', marginVertical: 15 }}></View>
            <View style={{ marginTop: 6, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 5 }}>
              <Text style={{ color: '#88888a' }}>Register <Text style={{ color: '#fff' }}>October 02, 2023</Text></Text>
              <TouchableOpacity onPress={isLogout} style={styles.logoutBtn}>
                <Text style={{ color: '#88888a', fontFamily: 'Roboto-Regular' }}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141416',
  },
  profileBorder: {
    borderColor: '#88888a',
    borderWidth: 2,
    height: 140,
    width: 140,
    padding: 3,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    backgroundColor: '#a4a4a4',
    width: '100%',
    height: '100%',
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
  },
  profileIcon: {
    color: '#000',
  },
  editProfileBtn: {
    backgroundColor: '#df0225',
    paddingVertical: 8,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginVertical: 14,
  },
  logoutBtn: {
    borderWidth: 1,
    borderColor: '#88888a',
    paddingVertical: 4,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  cameraBtm: {
    position: 'relative',
    // alignSelf: 'flex-end',
    left: 45,
    top: 55,
    backgroundColor: '#df0225',
    borderRadius: 20,
    padding: 6,
  },
});

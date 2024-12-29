import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = props => {

  const [userEmailId, setUserEmailId] = useState(null);

  const getData = async () => {
    var ud_json = await AsyncStorage.getItem('user_details');
    const user_detail = JSON.parse(ud_json);
    console.log('getToken', user_detail);
    setUserEmailId(user_detail.user.email);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: '90%', alignSelf: 'center' }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: '20%', marginVertical: 7, marginTop: 18, flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center' }}>
          <FontAwesome name="angle-left" color={'#b6b6b6'} size={28} />
          <Text style={{ color: '#b6b6b6', fontSize: 18, marginLeft: 10 }}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: '#88888a', height: 0.4, width: '90%', alignSelf: 'center' }}></View>
      <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%', alignSelf: 'center', marginTop: 13 }}>
        <AntDesign name="user" color={'#88888a'} size={32} />
        <View style={{ marginLeft: 12 }}>
          <Text style={{ color: '#d1d1d1', fontSize: 13, fontWeight: 'bold' }}>User Account</Text>
          {userEmailId && <Text style={{ color: '#d1d1d1', fontSize: 15, fontWeight: 'bold' }}>{userEmailId}</Text>}
        </View>
      </View>
      <View style={{ backgroundColor: '#88888a', height: 0.4, width: '90%', alignSelf: 'center', marginTop: 13 }}></View>
      {/* <View style={{ marginTop: 20, width: '90%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Surprises')} style={styles.box}>
          <AntDesign name="gift" color={'#88888a'} size={32} />
          <Text style={{ color: '#b6b6b6', fontWeight: '700', marginTop: 10 }}>Surprise</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('Categories')} style={styles.box}>
          <Ionicons name="grid-outline" color={'#88888a'} size={30} />
          <Text style={{ color: '#b6b6b6', fontWeight: '700', marginTop: 10 }}>Category</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('Languages')} style={styles.box}>
          <AntDesign name="wechat" color={'#88888a'} size={35} />
          <Text style={{ color: '#b6b6b6', fontWeight: '700', marginTop: 10 }}>Language</Text>
        </TouchableOpacity>
      </View> */}
      <View style={{ marginTop: 6, width: '90%', alignSelf: 'center', flexDirection: 'row', padding: 5 }}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Profile')} style={styles.box}>
          {/* <AntDesign name="setting" color={'#88888a'} size={32} /> */}
          <Octicons name="person" color={'#88888a'} size={32} />
          <Text style={{ color: '#b6b6b6', fontWeight: '700', marginTop: 10 }}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('AllOrders')} style={[styles.box, { marginLeft: 14 }]}>
          <Octicons name="package" color={'#88888a'} size={33} />
          <Text style={{ color: '#b6b6b6', fontWeight: '700', marginTop: 10 }}>All Orders</Text>
        </TouchableOpacity>
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
  box: {
    backgroundColor: '#212123',
    borderColor: '#414143',
    borderWidth: 0.7,
    width: '31%',
    height: 110,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

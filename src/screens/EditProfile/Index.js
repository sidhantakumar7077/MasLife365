import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORE_ID, CallApi, CallApiPost } from '../../component/CallApi/index';
import Spinner from 'react-native-loading-spinner-overlay';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CardView from 'react-native-cardview';
import { launchImageLibrary } from 'react-native-image-picker';
import moment from 'moment';

const Index = props => {
  const navigation = useNavigation();
  // const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState(new Date());
  const [imageSource, setImageSource] = useState(null);
  const [imageResponse, setImageResponse] = useState({});

  const selectImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = response.assets[0].uri
        setImageSource(source);
        setImageResponse(response);
        // console.log("selected image-=-=", response)
      }
    });
  };

  const get_profile = async () => {
    var userlogin = await AsyncStorage.getItem('user_details');
    userlogin = JSON.parse(userlogin);
    try {
      setSpinner(true);
      CallApi('GET', '/api/profile/' + userlogin.user.id).then(res => {
        const user_name = res.profile.name;
        const user_email = res.profile.email;
        const user_phone = res.profile.phone;
        const user_image = res.profile.image;
        setName(user_name);
        setMail(user_email);
        setPhone(user_phone);
        setImageSource(user_image);
        console.log('ProfileGet', res.profile);
        setSpinner(false);
      });
    } catch (error) {
      console.log('error', error);
      setSpinner(false);
    }
  };

  // const image = {
  //   uri: imageResponse.assets[0].uri,
  //   name: imageResponse.assets[0].fileName,
  //   type: imageResponse.assets[0].type
  // };
  // const formdata = {
  //   name: name,
  //   email: mail,
  //   dob: dob,
  //   image: image
  // };

  // fetch(`/api/update-profile/` + userlogin.user.id,
  //   {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       Authorization: 'Bearer ' + userlogin.access_token,
  //     },
  //     body: JSON.stringify(formdata)
  //   })
  //   // .then((response) => response.json())
  //   .then(response => {
  //     console.log("Profile-Update----", response);
  //   })
  //   .catch((error) => {
  //     console.error('There was a problem with the fetch operation:', error);
  //   });

  const Update_profile = async () => {
    const formdata = new FormData();
    formdata.append('name', name);
    formdata.append('email', mail);
    formdata.append('phone', phone);
    if (imageResponse && imageResponse.assets) {
      formdata.append('image',
        {
          uri: imageResponse.assets[0].uri,
          name: imageResponse.assets[0].fileName,
          type: imageResponse.assets[0].type
        });
    }

    // console.log("Edit Profile Data", formdata);
    // return;

    var userlogin = await AsyncStorage.getItem('user_details');
    userlogin = JSON.parse(userlogin);

    try {
      const emailType = /^\w+([\D.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (name === '') {
        Alert.alert('Validation Error', 'Please Enter Your Name');
        return false;
      }
      if (mail === '' || emailType.test(mail) === false) {
        Alert.alert('Validation Error', 'Please Enter Your Valid Mail');
        return false;
      }
      CallApi('POST', `/api/update-profile/13`, formdata).then(response => {
        // console.log('response', response);
        if (response.status === "success") {
          navigation.replace('Profile');
          // console.log('Update Profile Successfuly-=-=', response);
        } else {
          alert('Error');
          console.log('Eroror response', response);
        }
      });
    } catch (error) {
      console.log('error-=-=', error);
    }
  };

  useEffect(() => {
    get_profile();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={{ width: '90%', alignSelf: 'center' }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: '15%', marginVertical: 7, marginTop: 18, flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center' }}>
          <FontAwesome name="angle-left" color={'#b6b6b6'} size={28} />
          <Text style={{ color: '#b6b6b6', fontSize: 18, marginLeft: 10 }}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: '#88888a', height: 0.4, width: '90%', alignSelf: 'center' }}></View>
      <View style={{ width: '90%', alignSelf: 'center', marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: '#b1b1b1', fontSize: 18, fontFamily: 'Roboto-Regular', }}>My Profile</Text>
        <TouchableOpacity onPress={Update_profile}>
          <Ionicons name="checkmark-outline" style={{ color: '#df0225' }} size={30} />
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: 10, alignItems: 'center' }}>
        <View style={styles.profileBorder}>
          <View style={styles.profileContainer}>
            {imageSource ?
              <Image source={{ uri: imageSource }} style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 90 }} />
              :
              <Octicons name="person" style={styles.profileIcon} size={110} />
            }
          </View>
          <TouchableOpacity onPress={selectImage} style={styles.cameraBtm}>
            <Ionicons name="camera-outline" style={{ color: '#fff' }} size={25} />
          </TouchableOpacity>
        </View>
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
        <View style={{ width: '90%', alignSelf: 'center', marginTop: 14 }}>
          <View style={{ width: '100%' }}>
            <Text style={{ color: '#b1b1b1', fontSize: 16, marginLeft: 8 }}>Name</Text>
            <CardView style={styles.cardStyle} cardElevation={5} cardMaxElevation={2} cornerRadius={10}>
              <TextInput
                style={styles.inputs}
                onChangeText={setName}
                type="text"
                value={name}
                placeholder="Enter Your Name"
                placeholderTextColor="#b7b7c2"
                underlineColorAndroid="transparent"
              />
            </CardView>
          </View>
          <View style={{ width: '100%' }}>
            <Text style={{ color: '#b1b1b1', fontSize: 16, marginLeft: 8 }}>Email Address</Text>
            <CardView style={styles.cardStyle} cardElevation={5} cardMaxElevation={2} cornerRadius={10}>
              <TextInput
                style={styles.inputs}
                onChangeText={setMail}
                editable={false}
                type="email"
                value={mail}
                autoCapitalize="none"
                placeholder="Enter Your Email"
                placeholderTextColor="#b6b6b6"
                keyboardType="email-address"
                underlineColorAndroid="transparent"
              />
            </CardView>
          </View>
          <View style={{ width: '100%' }}>
            <Text style={{ color: '#b1b1b1', fontSize: 16, marginLeft: 8 }}>Phone Number</Text>
            <CardView style={styles.cardStyle} cardElevation={5} cardMaxElevation={2} cornerRadius={10}>
              <TextInput
                style={styles.inputs}
                onChangeText={setPhone}
                keyboardType= 'number-pad'
                type="phone"
                value={phone}
                placeholder="Enter Your Phone Number"
                placeholderTextColor="#b6b6b6"
                underlineColorAndroid="transparent"
              />
            </CardView>
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
  logoutBtn: {
    borderWidth: 1,
    borderColor: '#88888a',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginVertical: 10,
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
});

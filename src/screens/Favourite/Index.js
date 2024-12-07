import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { STORE_ID, CallApi } from '../../component/CallApi/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = props => {
  
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [allContent, setAllContent] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [user_id, setUser_id] = useState('');

  const getLoginData = async () => {
    var ud_json = await AsyncStorage.getItem('user_details');
    const user_detail = JSON.parse(ud_json);
    // console.log('getToken', user_detail.access_token);
    // setAccessToken(user_detail?.access_token);
    setUser_id(user_detail?.user.id);
  };

  const getAllContent = async () => {
    var userlogin = await AsyncStorage.getItem('user_details');
    userlogin = JSON.parse(userlogin);
    try {
      setSpinner(true);
      CallApi(
        'GET',
        '/api/getFavouriteContent/' + STORE_ID,
      ).then(res => {
        setSpinner(false);
        setAllContent(res.allfavourite);
        // console.log('res.section[0].foryou---------', res);
      });
    } catch (error) {
      setSpinner(false);
      console.log(error);
    }
  };

  const remove_favorite = async (content_id) => {
    var userlogin = await AsyncStorage.getItem('user_details');
    userlogin = JSON.parse(userlogin);
    try {
      CallApi(
        'POST',
        '/api/remove-favourite/' + STORE_ID + '/' + userlogin.user.id + '/' + content_id,
      ).then(res => {
        if (res.status === "success") {
          console.log("Remove Favorite----", res)
          const updatedFavorites = allContent.filter(item => item.content_id !== content_id);
          setAllContent(updatedFavorites);
        } else {
          console.log("Error-=-=", responseData.msg);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getLoginData();
      getAllContent();
    }
  }, [isFocused])

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: '90%', alignSelf: 'center' }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: '15%', marginVertical: 7, marginTop: 18, flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center' }}>
          <FontAwesome name="angle-left" color={'#b6b6b6'} size={28} />
          <Text style={{ color: '#b6b6b6', fontSize: 18, marginLeft: 10 }}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: '#88888a', height: 0.3, width: '92%', alignSelf: 'center' }}></View>
      <View style={{ width: '90%', alignSelf: 'center', marginTop: 10, marginBottom: 20 }}>
        <Text style={{ color: '#d1d1d1', fontSize: 16, fontFamily: 'Roboto-Regular', }}> Favourite </Text>
      </View>
      <View style={{ flex: 1, width: '92%', alignSelf: 'center', justifyContent: 'center' }}>
        <Spinner
          indicatorStyle={{
            alignSelf: 'center',
            justifyContent: 'flex-start',
            marginTop: 150,
          }}
          visible={spinner}
          animation="slide"
          color="#e00024"
          overlayColor="rgba(0, 0, 0, 0.25)"
          textContent={'Loading...'}
          textStyle={{ color: '#e00024' }}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={allContent}
          numColumns={3}
          keyExtractor={key => {
            return key.id;
          }}
          renderItem={content => {
            return (
              <View style={{ marginBottom: 20, width: '31%', marginHorizontal: 4 }}>
                <TouchableHighlight onPress={() => props.navigation.navigate('Content_details_2', content.item.content_id)} style={{ height: 151, width: '100%' }}>
                  <View style={{ height: 151, width: '100%' }}>
                    {content.item.vertical_poster_path ?
                      <Image style={styles.smallContent} source={{ uri: content.item.vertical_poster_path + '/' + content.item.vertical_poster }} />
                      :
                      <Image style={styles.smallContent} source={require('../../assets/Images/no_img.jpg')} />
                    }
                    {/* <Image style={styles.smallContent} source={{ uri: content.item.poster_path + '/' + content.item.poster, }} /> */}
                    <TouchableOpacity onPress={() => remove_favorite(content.item.content_id)} style={{ backgroundColor: '#2e2e30', width: 30, borderRadius: 6, height: 30, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 5, right: 4 }}>
                      <AntDesign name="heart" color={'red'} size={25} style={{ alignSelf: 'center' }} />
                    </TouchableOpacity>
                  </View>
                </TouchableHighlight>
                <Text style={{ color: '#878686', fontFamily: 'Roboto-Regular', fontSize: 14, marginTop: 5, marginLeft: 8 }}> {content.item.name} </Text>
              </View>
            );
          }}
        />
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
  smallContent: {
    flex: 1,
    width: '100%',
    height: '100%',
    // resizeMode: 'contain',
    borderRadius: 6,
  },
});

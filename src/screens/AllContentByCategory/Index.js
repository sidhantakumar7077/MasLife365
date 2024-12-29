import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { STORE_ID, CallApi } from '../../component/CallApi/index';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bgImage from '../../assets/BgImage/bg2.jpg';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Index = props => {
  const navigation = useNavigation();
  const [allContent, setAllContent] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState('');
  const [spinner, setSpinner] = useState(false);

  const getAllContent = async () => {
    try {
      setSpinner(true);
      CallApi(
        'GET',
        '/api/category-details/' + props.route.params + '/' + STORE_ID,
      ).then(res => {
        setSpinner(false);
        setAllContent(res.section[0].Contents);
        setCategoryDetails(res.section[0].Contentcategory);
        // console.log("res.section[0].foryou---------", res.section[0].foryou);
      });
    } catch (error) {
      setSpinner(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllContent();
    console.log('category ID', props.route.params);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#141416' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ width: '90%', alignSelf: 'center' }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ marginVertical: 7, marginTop: 18, flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center' }}>
            <FontAwesome name="angle-left" color={'#b6b6b6'} size={28} />
            <Text style={{ color: '#b6b6b6', fontSize: 18, marginLeft: 10 }}> Back </Text>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: '#88888a', height: 0.3, width: '90%', alignSelf: 'center' }}></View>
        {spinner === true ?
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
          :
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, width: '90%', alignSelf: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600', fontFamily: 'Roboto-Regular' }}> {categoryDetails.name} </Text>
              <Entypo style={{ marginTop: 2 }} name="chevron-right" color={'red'} size={20} />
            </View>
            <View style={{ flex: 1, justifyContent: 'center', width: '92%', alignSelf: 'center' }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={allContent}
                numColumns={3}
                keyExtractor={key => {
                  return key.id;
                }}
                renderItem={content => {
                  return (
                    <View style={{ marginBottom: 15, width: '32%', marginHorizontal: 2.5, marginVertical: 5 }}>
                      <TouchableOpacity onPress={() => props.navigation.navigate('Content_details_2', content.item.content_type === "multipart" ? content.item.latest_content_id : content.item.id)} style={{ height: 170, width: '100%' }}>
                        {content.item.vertical_poster_path ?
                          <Image style={styles.smallContent} source={{ uri: content.item.vertical_poster_path + '/' + content.item.vertical_poster }} />
                          :
                          <Image style={styles.smallContent} source={require('../../assets/Images/no_img.jpg')} />
                        }
                      </TouchableOpacity>
                      {/* <Text style={{ color: '#706f6f', fontWeight: '600', fontSize: 13, marginTop: 5, width: '80%' }}>{content.item.name}</Text> */}
                    </View>
                  );
                }}
              />
            </View>
          </View>
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  smallContent: {
    // flex: 1,
    width: '100%',
    height: '100%',
    // resizeMode: 'contain',
    borderRadius: 8,
  },
});

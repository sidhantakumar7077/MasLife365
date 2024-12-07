import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TouchableHighlight
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { STORE_ID, CallApi } from '../../component/CallApi/index';
import Spinner from 'react-native-loading-spinner-overlay';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

let { width: screenWidth } = Dimensions.get('window');
let horizontalImageWidth = (screenWidth - 45) / 2;
let verticalImageWidth = (screenWidth - 65) / 3;

const Index = props => {
  const navigation = useNavigation();
  const [spinner, setSpinner] = useState(false);
  const [appearances, setAppearances] = useState([]);
  const [cast, setCast] = useState([]);

  const goToContentDetails = id => {
    navigation.navigate('Content_details_2', id);
  };

  const getCast_details = async () => {
    try {
      setSpinner(true);
      CallApi(
        'GET',
        '/api/cast-details/' + props.route.params + '/' + STORE_ID,
      ).then(res => {
        setAppearances(res.section[0].Contents);
        setCast(res.section[0].Casts);
        setSpinner(false);
        console.log('res.section[0].foryou---------', res.section[0].Casts);
      });
    } catch (error) {
      console.log(error);
      setSpinner(false);
    }
  };

  useEffect(() => {
    getCast_details();
    if (props?.route) {
      console.log('Cast ID', props.route.params);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ width: '90%', alignSelf: 'center' }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ marginVertical: 7, marginTop: 18, flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center' }}>
            <FontAwesome name="angle-left" color={'#b6b6b6'} size={28} />
            <Text style={{ color: '#b6b6b6', fontSize: 18, marginLeft: 10 }}> Back </Text>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: '#88888a', height: 0.3, width: '90%', alignSelf: 'center' }}></View>
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
          <View style={{ width: '100%' }}>
            <View style={{ width: '100%', height: 400, marginTop: 20 }}>
              <Image
                style={styles.smallContent}
                source={{ uri: cast.attached_profileurl + '/' + cast.profile }}
              />
              <LinearGradient
                colors={['transparent', '#141416']} // Adjust the colors and opacity as needed
                style={styles.gradient}
              />
            </View>
            <View style={{ width: '90%', marginTop: 10, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={{ color: '#d1d1d1', fontSize: 26, fontFamily: 'Roboto-Bold' }}> {cast?.name} </Text>
                <Text style={{ color: '#595959', width: '90%', fontFamily: 'Roboto-Regular', marginTop: 8 }}> {cast?.role} </Text>
              </View>
              <TouchableOpacity style={{ backgroundColor: '#2e2e30', borderRadius: 100, height: 40, width: 40, alignItems: 'center', justifyContent: 'center' }}>
                <MaterialCommunityIcons
                  name="share-outline"
                  color={'#818081'}
                  size={28}
                />
              </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: '#88888a', height: 0.3, width: '90%', alignSelf: 'center', marginVertical: 20 }}></View>
            <View style={{ width: '90%', alignSelf: 'center' }}>
              <Text style={{ color: '#d1d1d1', fontSize: 18, fontFamily: 'Roboto-Regular' }}> Biography: </Text>
              <Text style={{ color: '#7f7f7f', fontSize: 15, marginTop: 8, fontFamily: 'Roboto-Regular', lineHeight: 22 }}> {cast?.description} </Text>
              <View style={{ backgroundColor: '#88888a', width: '100%', alignSelf: 'center', marginVertical: 20, }}></View>
              <View style={{ flex: 1, paddingHorizontal: 5, marginTop: 10 }}>
                <Text style={{ color: '#d1d1d1', fontSize: 17, fontFamily: 'Roboto-Regular', marginBottom: 5 }}> Appearances </Text>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={appearances}
                  horizontal
                  keyExtractor={key => {
                    return key.id;
                  }}
                  renderItem={content => {
                    return (
                      <View style={{ marginRight: 7, marginVertical: 5, width: verticalImageWidth, }}>
                        <TouchableHighlight onPress={() => goToContentDetails(content.item.id)} style={{ width: '100%', height: 170, borderRadius: 7, justifyContent: 'center' }}>
                          {content.item.vertical_poster_path ?
                            <Image style={styles.smallContent} source={{ uri: content.item.vertical_poster_path + '/' + content.item.vertical_poster }} />
                            :
                            <Image style={styles.smallContent} source={require('../../assets/Images/no_img.jpg')} />
                          }
                        </TouchableHighlight>
                        <Text style={{ color: '#878686', fontFamily: 'Roboto-Regular', fontSize: 14, marginTop: 5, marginLeft: 8, }}> {content.item.name} </Text>
                      </View>
                    );
                  }}
                />
              </View>
              <View style={{ flex: 1, paddingHorizontal: 5, marginVertical: 20 }}>
                <Text style={{ color: '#d1d1d1', fontSize: 17, fontFamily: 'Roboto-Regular', marginBottom: 5, }}> You May Also Like </Text>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={appearances}
                  horizontal
                  keyExtractor={key => {
                    return key.id;
                  }}
                  renderItem={content => {
                    return (
                      <View style={{ marginRight: 7, marginVertical: 5, width: verticalImageWidth, }}>
                        <TouchableHighlight onPress={() => goToContentDetails(content.item.id)} style={{ width: '100%', height: 170, borderRadius: 7, justifyContent: 'center' }}>
                          {content.item.vertical_poster_path ?
                            <Image style={styles.smallContent} source={{ uri: content.item.vertical_poster_path + '/' + content.item.vertical_poster }} />
                            :
                            <Image style={styles.smallContent} source={require('../../assets/Images/no_img.jpg')} />
                          }
                        </TouchableHighlight>
                        <Text style={{ color: '#878686', fontFamily: 'Roboto-Regular', fontSize: 14, marginTop: 5, marginLeft: 8, }}> {content.item.name} </Text>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          </View>
        )}
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
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  smallContent: {
    flex: 1,
    width: '100%',
    height: '100%',
    // resizeMode: 'contain',
    borderRadius: 4,
  },
});

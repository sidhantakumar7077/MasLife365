import { SafeAreaView, StyleSheet, Text, View, ImageBackground, Dimensions, FlatList, TouchableOpacity, Image, ScrollView, TouchableHighlight, RefreshControl } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import Header from '../../component/Header/Index';
import CustomBanner from './CustomBanner';
import Spinner from 'react-native-loading-spinner-overlay';
import { FlatListSlider } from 'react-native-flatlist-slider';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import bgImage from '../../assets/BgImage/bg2.jpg';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { STORE_ID, CallApi } from '../../component/CallApi/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

let { width: screenWidth } = Dimensions.get('window');
let horizontalImageWidth = (screenWidth - 32) / 2;
let verticalImageWidth = (screenWidth - 42) / 3;

const Index = props => {
  const images = [];
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [category, setCategory] = useState([]);
  const [ContentByCategory, setContentByCategory] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [banner, setBanner] = useState([]);
  // const [value, setValue] = useState();
  // const [show, setShow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const getBanner = async () => {
    try {
      CallApi('GET', '/api/getbanner/' + STORE_ID).then(res => {
        // console.log('res', res.allbanner);
        // setValue(res?.allbanner?.button_link);
        if (res.allbanner !== undefined) {
        }
        const image_list = res.allbanner.map(item => ({
          id: item.id,
          contentId: item.content_id,
          Images: item.attached_url + '/' + item.image,
        }));
        setBanner(image_list);
        console.log('image_list', image_list);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getCategory = async () => {
    try {
      setSpinner(true);
      CallApi('GET', '/api/getCategoryWithContent/' + STORE_ID).then(res => {
        setSpinner(false);
        const reversedCategories = res.sections.reverse().map(section => ({
          ...section,
          contents: section.contents.reverse().slice(0, 10)
        }));
        setCategory(reversedCategories);
        // setCategory(res.sections.reverse());
        // setContentByCategory(res.sections[0].contents);
        // console.log('All Category---------', res.sections);
        // console.log('res.section', res.sections[0].contents);
      });
    } catch (error) {
      setSpinner(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getBanner();
      getCategory();
    }
  }, [isFocused])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (flatListRef.current) {
        const currentIndex = flatListRef.current.index || 0;
        const newIndex = (currentIndex + 1) % banner.length;

        flatListRef.current.scrollToIndex({
          animated: true,
          index: newIndex,
        });
        flatListRef.current.index = newIndex;
      }
    }, 3000);

    // Ensure that getBanner and getCategory are asynchronous functions
    const fetchData = async () => {
      await getBanner();
      await getCategory();
    };

    fetchData();

    return () => clearInterval(intervalId);
  }, [banner.length]);

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getCategory();
    }, 2000);
  }, []);

  const ScreenWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.topPart}>
          <Header navigation={props.navigation} />
        </View>
        <View style={styles.btmPart}>
          {banner.length > 0 ?
            <View style={{ width: '100%', alignSelf: 'center', zIndex: 9 }}>
              <FlatList
                ref={flatListRef}
                horizontal={true}
                data={banner}
                renderItem={({ item, index }) => (
                  <View>
                    <Image alt="" source={{ uri: item.Images }} style={{ height: Dimensions.get('window').height / 3.5, width: ScreenWidth }} />
                    <LinearGradient
                      colors={['transparent', '#141416']} // Adjust the colors and opacity as needed
                      style={styles.gradient}
                    />
                    <View style={{ backgroundColor: '#000' }}>
                      <TouchableOpacity style={styles.watchBtn} onPress={() => props.navigation.navigate('Content_details_2', item.content_type === "multipart" ? item.latest_content_id : item.id)}>
                        <FontAwesome5 name="play" size={14} color={'#fff'} />
                        <Text style={{ color: '#ffffff', fontSize: 17, fontFamily: 'Montserrat-Bold', marginLeft: 8, }}>Watch</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                keyExtractor={item => item.id.toString()}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                {banner.map((_, index) => (
                  <View
                    key={index}
                    style={{
                      width: 23,
                      height: 4,
                      borderRadius: 5,
                      backgroundColor: currentIndex === index ? '#e00024' : 'rgba(255, 255, 255, 0.5)',
                      marginHorizontal: 3,
                    }}
                  />
                ))}
              </View>
            </View>
            :
            <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', alignSelf: 'center', zIndex: 10, }}>
              <Text style={{ color: '#e00024', fontSize: 18, fontWeight: '700', fontStyle: 'italic', }}> LOADING... </Text>
            </View>
          }

          <View style={{ margin: 12, flex: 1 }}>
            <Spinner
              visible={spinner}
              animation="slide"
              color="#e00024"
              overlayColor="rgba(0, 0, 0, 0.25)"
              textContent={'Loading...'}
              textStyle={{ color: '#e00024' }}
            />

            <FlatList
              showsVerticalScrollIndicator={false}
              data={category}
              keyExtractor={key => {
                return key.id;
              }}
              renderItem={({ item }) => {
                return (
                  <View style={{ flex: 1 }}>
                    {item.category.show_home === 'yes' && (
                      <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2, marginTop: 18, }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: '#d1d1d1', fontSize: 16, fontFamily: 'Roboto-Regular', }}>{item.category.name}</Text>
                            <Entypo style={{ marginTop: 2 }} name="chevron-right" color={'red'} size={20} />
                          </View>
                          <TouchableOpacity onPress={() => props.navigation.navigate('AllContentByCategory', item.category.id,)}>
                            <Text style={{ color: '#565657', fontSize: 16, fontFamily: 'Roboto-Regular', }}> View all </Text>
                          </TouchableOpacity>
                        </View>
                        {item.category.show_content === "vertical" ?
                          <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={item.contents}
                            horizontal
                            // initialNumToRender={3}
                            keyExtractor={key => {
                              return key.id;
                            }}
                            renderItem={content => {
                              return (
                                <View style={{ marginRight: 7, marginVertical: 5, width: 115, marginTop: 9, }}>
                                  <TouchableHighlight onPress={() => props.navigation.navigate('Content_details_2', content.item.content_type === "multipart" ? content.item.latest_content_id : content.item.id)} style={{ height: 170, width: '100%' }}>
                                    {content.item.vertical_poster_path ?
                                      <Image style={styles.smallContent} source={{ uri: content.item.vertical_poster_path + '/' + content.item.vertical_poster, }} />
                                      :
                                      <Image style={styles.smallContent} source={require('../../assets/Images/no_img.jpg')} />
                                    }
                                  </TouchableHighlight>
                                  {/* <Text style={{ color: '#878686', fontFamily: 'Roboto-Regular', fontSize: 14, marginTop: 5, marginLeft: 8, }}>{content.item.name}</Text> */}
                                </View>
                              );
                            }}
                          />
                          :
                          <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={item.contents}
                            // initialNumToRender={10}
                            horizontal
                            keyExtractor={key => {
                              return key.id;
                            }}
                            renderItem={content => {
                              return (
                                <View style={{ marginRight: 7, marginVertical: 5, marginTop: 9, }}>
                                  <TouchableOpacity onPress={() => props.navigation.navigate('Content_details_2', content.item.content_type === "multipart" ? content.item.latest_content_id : content.item.id)}>
                                    {content.item.poster_path ?
                                      <Image style={styles.bigContent} source={{ uri: content.item.poster_path + '/' + content.item.poster, }} resizeMode="cover" />
                                      :
                                      <Image style={styles.smallContent} source={require('../../assets/Images/no_img.jpg')} />
                                    }
                                  </TouchableOpacity>
                                  {/* <Text style={{ color: '#878686', fontFamily: 'Roboto-Regular', fontSize: 14, marginTop: 5, marginLeft: 8 }}>{content.item.name}</Text> */}
                                </View>
                              );
                            }}
                          />
                        }
                      </View>
                    )}
                  </View>
                );
              }}
            />

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
    // position: 'relative'
  },
  topPart: {
    height: 60,
    backgroundColor: '#141416',
    justifyContent: 'center',
  },
  watchBtn: {
    backgroundColor: '#e00024',
    width: 110,
    height: 36,
    marginLeft: 14,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 30,
    position: 'absolute',
  },

  bigContent: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height / 7,
    // resizeMode: 'contain',
    borderRadius: 8,
  },
  smallContent: {
    // width: Dimensions.get('window').width / 3,
    // height: Dimensions.get('window').height / 4.5,
    width: '100%',
    height: '100%',
    borderRadius: 8,
    // resizeMode:'contain'
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 170,
    bottom: 0,
  },
});

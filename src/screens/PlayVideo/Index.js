import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
  FlatList,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {STORE_ID, CallApi} from '../../component/CallApi/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {useEffect, useRef, useState} from 'react';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';
import Spinner from 'react-native-loading-spinner-overlay';

const Index = props => {
  const [clicked, setClicked] = useState(false);
  const [puased, setPaused] = useState(false);
  const [progress, setProgress] = useState();
  const [fullScreen, setFullScreen] = useState(false);
  const ref = useRef();
  const [muted, setMuted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [contentDetails, setContentDetails] = useState([]);
  const [foryou, setForyou] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const toggleMute = () => {
    setMuted(!muted);
  };

  const format = seconds => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const toggleView = () => {
    setIsActive(!isActive);
    setClicked(true);
  };

  const getDetails = async () => {
    try {
      setSpinner(true);
      CallApi(
        'GET',
        `/api/content-details-no-auth/${props.route.params}/${STORE_ID}`,
      ).then(res => {
        setContentDetails(res.section[0].contents);
        setForyou(res.section[0].foryou);
        setSpinner(false);
        setVideoUrl(res?.section[0].contents.video);
        console.log("GET CONTENT DETAILS---------", res.section[0].contents.video);
      });
    } catch (error) {
      console.log(error);
      setSpinner(false);
    }
  };

  useEffect(() => {
    console.log('Content ID', props.route.params);
    getDetails();
    const timer = setTimeout(() => {
      // console.log(muted + "muted");
      setClicked(false);
    }, 3000);
    return () => clearTimeout(timer); // Clean up the timer if the component unmounts
  }, [clicked]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{width: '100%', height: fullScreen ? '100%' : 230}}
        onPress={() => {
          setClicked(true);
          {
            toggleView;
          }
        }}>
        <Video
          paused={puased}
          onProgress={x => {
            // console.log(x);
            setProgress(x);
          }}
          source={{
            uri: videoUrl,
          }}
          ref={ref}
          muted={muted}
          style={{width: '100%', height: fullScreen ? '100%' : 230}}
          resizeMode="contain"
        />
        {clicked && (
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  ref.current.seek(parseInt(progress.currentTime) - 10);
                }}>
                <MaterialIcons name="replay-10" color={'#fff'} size={30} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPaused(!puased);
                }}>
                <MaterialIcons
                  style={{borderRadius: 100, marginLeft: 50}}
                  name={puased ? 'play-circle-outline' : 'pause-circle-outline'}
                  color={'#fff'}
                  size={40}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  ref.current.seek(parseInt(progress.currentTime) + 10);
                }}>
                <MaterialIcons
                  style={{borderRadius: 100, marginLeft: 50}}
                  name="forward-10"
                  color={'#fff'}
                  size={30}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'absolute',
                bottom: 10,
                paddingLeft: 20,
                paddingRight: 20,
              }}>
              <Text style={{color: 'white', fontSize: 12}}>
                {format(progress.currentTime)}
              </Text>
              <Slider
                style={{width: '87%', height: 40}}
                minimumValue={0}
                maximumValue={progress.seekableDuration}
                minimumTrackTintColor="#fff"
                maximumTrackTintColor="#fff"
                thumbTintColor="#fff"
                onValueChange={x => {
                  ref.current.seek(x);
                }}
              />
              <Text style={{color: 'white', fontSize: 12}}>
                {format(progress.seekableDuration)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'absolute',
                top: 15,
                paddingHorizontal: 10,
              }}>
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <FontAwesome name="angle-left" color={'#fff'} size={28} />
              </TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{marginRight: 10}}
                  onPress={toggleMute}>
                  <MaterialIcons
                    name={muted ? 'volume-off' : 'volume-up'}
                    color={'#fff'}
                    size={25}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (fullScreen) {
                      Orientation.lockToPortrait();
                    } else {
                      Orientation.lockToLandscape();
                    }
                    setFullScreen(!fullScreen);
                  }}>
                  <MaterialIcons
                    name={fullScreen ? 'fullscreen-exit' : 'fullscreen'}
                    color={'#fff'}
                    size={27}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      <StatusBar hidden={fullScreen ? true : false} />
      <View style={{flex: 1}}>
        <Text
          style={{
            color: '#d1d1d1',
            fontSize: 16,
            fontFamily: 'Roboto-Bold',
            marginLeft: 6,
          }}>
          {contentDetails.name}
        </Text>
        {/* {spinner ?
          <Spinner
            indicatorStyle={{ alignSelf: 'center', justifyContent: 'flex-start', marginTop: 350 }}
            visible={spinner}
            animation='slide'
            color='#e00024'
            overlayColor='rgba(0, 0, 0, 0.25)'
            textContent={'Loading...'}
            textStyle={{ color: '#e00024' }}
          /> : " " */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            width: '94%',
            alignSelf: 'center',
            marginTop: 8,
            height: '100%',
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontFamily: 'Roboto-Regular',
              marginVertical: 8,
            }}>
            You May Also Like
          </Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={foryou}
            numColumns={3}
            keyExtractor={key => {
              return key.id;
            }}
            renderItem={content => {
              return (
                <View
                  style={{marginBottom: 20, width: '31%', marginHorizontal: 4}}>
                  <TouchableHighlight
                    onPress={() =>
                      props.navigation.navigate(
                        'Content_details_2',
                        content.item.id,
                      )
                    }
                    style={{height: 151, width: '100%'}}>
                    <Image
                      style={styles.smallContent}
                      source={{
                        uri:
                          content.item.poster_path + '/' + content.item.poster,
                      }}
                    />
                  </TouchableHighlight>
                  <Text
                    style={{
                      color: '#878686',
                      fontFamily: 'Roboto-Regular',
                      fontSize: 14,
                      marginTop: 5,
                      marginLeft: 8,
                    }}>
                    {content.item.name}
                  </Text>
                </View>
              );
            }}
          />
        </ScrollView>
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

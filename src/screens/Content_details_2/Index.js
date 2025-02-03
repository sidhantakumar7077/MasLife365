import { StyleSheet, Text, View, useWindowDimensions, Dimensions, SafeAreaView, Image, TouchableOpacity, ScrollView, TouchableHighlight, FlatList, StatusBar, BackHandler, Animated, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Orientation from 'react-native-orientation-locker';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { STORE_ID, CallApi } from '../../component/CallApi/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import moment from 'moment';
// import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
// import { RadioButton } from 'react-native-paper';
// import { getContentDetails } from '../../services/apiHandler';
import Video from 'react-native-video';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCD } from '../../redux/action/actionCD';
let { width: screenWidth } = Dimensions.get('window');
let horizontalImageWidth = (screenWidth - 45) / 2;
// let verticalImageWidth = (screenWidth - 55) / 3;

const Index = props => {
  const [checked, setChecked] = React.useState('Related_extras');
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
  const [trailerPlaying, setTrailerPlaying] = React.useState(false);
  // console.log('isVideoPlaying', isVideoPlaying);
  const layout = useWindowDimensions();
  const [dataValue, setDataValue] = useState('');
  const [clicked, setClicked] = useState(false);
  const [paused, setPaused] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [progress, setProgress] = useState({
    currentTime: 0,
    seekableDuration: 0,
  });
  const format = (seconds) => {
    const duration = moment.duration(seconds, 'seconds');
    return `${duration.hours()}:${duration.minutes()}:${duration.seconds()}`;
  };
  const [fullScreen, setFullScreen] = useState(false);
  const ref = useRef(null);
  const [muted, setMuted] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isFocus, setIsFocus] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [contentDetails, setContentDetails] = useState([]);
  const [otherDetails, setOtherDetails] = useState(null);
  const [banner, setBanner] = useState("");
  const [mainContent_name, setMainContent_name] = useState("");
  const [genres, setGenres] = useState([]);
  const [foryou, setForyou] = useState([]);
  const [cast, setCast] = useState([]);
  const [exclusive, setExclusive] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [isSubscribe, setIsSubscribe] = useState('no');
  const [accessToken, setAccessToken] = useState('');
  const [user_id, setUser_id] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');

  const mainVideoUrl = () => {
    let url = "";
    if (isVideoPlaying) {
      url = videoUrl;
    } else {
      url = trailerUrl;
    }
    return url;
  }

  const toggleMute = () => {
    setMuted(!muted);
  };

  const toggleView = () => {
    setIsActive(!isActive);
    setClicked(true);
  };

  const [allSeason, setAllSeason] = useState([]);

  const [season, setSeason] = useState('');
  const [seasonId, setSeasonId] = useState(null);
  const [seasonItems, setSeasonItems] = useState([]);

  useEffect(() => {
    const formattedSeasons = allSeason.map(season => ({
      label: season.name,
      value: season.id
    }));

    setSeasonItems(formattedSeasons);

    // Set the default selected seasonId to the ID of the first season
    if (formattedSeasons.length > 0 && seasonId === null) {
      setSeasonId(formattedSeasons[0].value);
    }
  }, [allSeason, seasonId]);

  const [isExtraVideoActive, setIsExtraVideoActive] = useState(false);
  const [clickedExtraVideo, setClickedExtraVideo] = useState(false);
  const [pausedExtraVideo, setPausedExtraVideo] = useState(false);
  const [progressExtraVideo, setProgressExtraVideo] = useState({
    currentTime: 0,
    seekableDuration: 0,
    // other properties if needed
  });
  const [mutedExtraVideo, setMutedExtraVideo] = useState(false);

  const toggleExtraVideoView = () => {
    setIsExtraVideoActive(!isExtraVideoActive);
    setClickedExtraVideo(true);
  };

  const toggleMuteExtraVideo = () => {
    setMutedExtraVideo(!mutedExtraVideo);
  };

  const doLogin = () => {
    alert('Please login to do that !');
  };

  const getData = async () => {
    var ud_json = await AsyncStorage.getItem('user_details');
    const user_detail = JSON.parse(ud_json);
    // console.log('getToken', user_detail.access_token);
    setAccessToken(user_detail?.access_token);
    setUser_id(user_detail?.user.id);
  };

  const [contentIdForCart, setContentIdForCart] = useState(null);
  const [isCart, setIsCart] = useState("no");
  const [cartId, setCartId] = useState('');

  const addToCart = () => {
    if (contentIdForCart !== null) {
      setIsCart("yes");
      console.log("contentIdForCart", contentIdForCart);
      try {
        CallApi('POST', `/api/save-cart/${contentIdForCart}`).then(
          response => {
            if (response.status === 'success') {
              setCartId(response.cart.id);
              setContentIdForCart(null);
              console.log('Add to Cart', response);
            } else {
              console.log('Add to Cart Error', response);
            }
          },
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("props.route.params", props.route.params);
      try {
        CallApi('POST', `/api/save-cart/${props.route.params}`).then(
          response => {
            if (response.status === 'success') {
              setCartId(response.cart.id);
              console.log('Add to Cart', response);
            } else {
              console.log('Add to Cart Error', response);
            }
          },
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

  const removeToCart = () => {
    // const newCartStatus = isCart === 'true' ? 'false' : 'true';
    setIsCart("no");
    try {
      CallApi('POST', `/api/delete-carts/${cartId}`).then(
        response => {
          if (response.status === 'success') {
            // getDetails();
            // console.log('send data');
            console.log('Remove to Cart', response);
          } else {
            console.log('Remove to Cart Error', response);
          }
        },
      );
    } catch (error) {
      console.log(error);
    }
  }

  const calculateStreamingPeriod = (endDate) => {
    // console.log("Input endDate:", endDate);

    if (!endDate) {
      console.log("Invalid or missing endDate");
      return "Invalid date";
    }

    // Parse the endDate using moment
    const end = moment(endDate, "YYYY-MM-DD HH:mm:ss", true); // Strict parsing for format
    const now = moment();

    if (!end.isValid()) {
      console.log("Invalid date format");
      return "Invalid date";
    }

    const diff = moment.duration(end.diff(now));

    if (diff.asMilliseconds() <= 0) {
      return "End date has passed";
    }

    const days = Math.floor(diff.asDays());
    const hours = diff.hours();
    const mins = diff.minutes();

    // Format the output string
    if (days > 0) {
      return `${days} days ${hours} hrs ${mins} mins`;
    } else if (hours > 0) {
      return `${hours} hrs ${mins} mins`;
    } else {
      return `${mins} mins`;
    }
  };


  const [isFavourite, setIsFavourite] = useState('false');
  const addFavourite = async () => {
    const newFavoriteStatus = isFavourite === 'true' ? 'false' : 'true';
    setIsFavourite(newFavoriteStatus);
    const formdata = new FormData();
    formdata.append('user_id', user_id);
    formdata.append('content_id', props.route.params);
    const data = {
      user_id: user_id,
      content_id: props.route.params,
    };
    try {
      CallApi('POST', `/api/create-favourite/${STORE_ID}`, formdata).then(
        response => {
          if (response.status === 'success') {
            // getDetails();
            console.log('send data', formdata);
            console.log('Add to favourite', response);
          }
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getDetails = async () => {
    var userlogin = await AsyncStorage.getItem('user_details');
    userlogin = JSON.parse(userlogin);
    let url = `/api/content-details-no-auth/${props.route.params}/${STORE_ID}`;
    if (userlogin) {
      url = `/api/content-details-auth/${props.route.params}/${STORE_ID}/${userlogin.user.id}`;
    }
    try {
      setSpinner(true);
      CallApi('GET', url).then(res => {
        // console.log('Content Details', props.route.params, userlogin.user.id);
        // return;
        setpaymentId(res.section[0].contents.id);
        setContentDetails(res.section[0].contents);
        setOtherDetails(res.section[0].contents);
        setMainContent_name(res.section[0].contents.name);
        setGenres(res.section[0].genres);
        setBanner(res.section[0].contents.poster_path + "/" + res.section[0].contents.poster);
        setIsSubscribe(res.section[0].is_subscribe);
        setForyou(res.section[0].foryou);
        setAllSeason(res.section[0].seasons);
        setCast(res.section[0].casts);
        setExclusive(res.section[0].exclusivevideos);
        setEpisodes(res.section[0].episodes);
        setIsFavourite(res.section[0].is_favorite);
        setIsCart(res.section[0].iscart);
        setSpinner(false);
        setVideoUrl(res?.section[0].contents.video);
        setTrailerUrl(res?.section[0].contents.trailer);
        // console.log('res', res.section[0].seasons);
        if (res.section[0].contents.content_type === "multipart") {
          if (res.section[0].iscontent_episode === 'yes') {
            setpaymentId(res.section[0].episodecontent.id);
            setContentDetails(res.section[0].episodecontent);
            setBanner(res.section[0].episodecontent.poster_path + "/" + res.section[0].episodecontent.poster);
            setVideoUrl(res?.section[0].episodecontent.video);
            setTrailerUrl(res?.section[0].episodecontent.trailer);
          } else {
            setpaymentId(res.section[0].latest_episode.id);
            setContentDetails(res.section[0].latest_episode);
            setBanner(res.section[0].latest_episode.poster_path + "/" + res.section[0].latest_episode.poster);
            setVideoUrl(res?.section[0].latest_episode.video);
            setTrailerUrl(res?.section[0].latest_episode.trailer);
            // console.log('res', res.section[0].latest_episode.season.name);
          }
        }
      });
    } catch (error) {
      console.log(error);
      setSpinner(false);
    }
  };

  const castDetails = id => {
    navigation.replace('Cast_details', id);
  };

  const goToContentDetails = async id => {
    setContentIdForCart(id);
    setIsVideoPlaying(false);
    setTrailerPlaying(false);
    console.log("episode id-=-=-=-=", id);
    var userlogin = await AsyncStorage.getItem('user_details');
    userlogin = JSON.parse(userlogin);
    let url = `/api/content-details-no-auth/${id}/${STORE_ID}`;
    if (userlogin) {
      url = `/api/content-details-auth/${id}/${STORE_ID}/${userlogin.user.id}`;
    }
    try {
      setSpinner(true);
      CallApi('GET', url).then(res => {
        // console.log('Content Details 2-=-=', res.section);
        // return;
        if (res.section[0].iscontent_episode === "yes") {
          setpaymentId(res.section[0].episodecontent.id);
          setContentDetails(res.section[0].episodecontent);
          setBanner(res.section[0].episodecontent.poster_path + "/" + res.section[0].episodecontent.poster);
          setVideoUrl(res?.section[0].episodecontent.video);
          setTrailerUrl(res?.section[0].episodecontent.trailer);
        } else {
          if (res.section[0].contents.content_type === "multipart") {
            setpaymentId(res.section[0].latest_episode.id);
          } else {
            setpaymentId(res.section[0].contents.id);
          }
          setContentDetails(res.section[0].contents);
          setOtherDetails(res.section[0].contents);
          setBanner(res.section[0].contents.poster_path + "/" + res.section[0].contents.poster);
          setVideoUrl(res?.section[0].contents.video);
          setTrailerUrl(res?.section[0].contents.trailer);
        }
        // setContentDetails(res.section[0].contents);
        setGenres(res.section[0].genres);
        // setBanner(res.section[0].contents.poster_path + "/" + res.section[0].contents.poster);
        setIsSubscribe(res.section[0].is_subscribe);
        setForyou(res.section[0].foryou);
        setAllSeason(res.section[0].seasons);
        setCast(res.section[0].casts);
        setExclusive(res.section[0].exclusivevideos);
        setEpisodes(res.section[0].episodes);
        setIsFavourite(res.section[0].is_favorite);
        setIsCart(res.section[0].iscart);
        setSpinner(false);
      });
    } catch (error) {
      console.log(error);
      setSpinner(false);
    }
  };

  const translateY = useRef(new Animated.Value(400)).current;
  const [extraVideoModal, setExtraVideoModal] = useState(false);
  const onClose = () => {
    setExtraVideoModal(false);
    setFullScreen(false)
    Orientation.lockToPortrait();
    StatusBar.setHidden(false);
    progressExtraVideo.currentTime = 0;
  }

  const slideIn = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(translateY, {
      toValue: 400,
      duration: 300,
      useNativeDriver: true,
    }).start(onClose);
  };

  React.useEffect(() => {
    if (extraVideoModal) {
      slideIn();
    } else {
      slideOut();
    }
  }, [extraVideoModal]);

  const [extraVideo, setExtraVideo] = useState({});
  const [showPoster, setShowPoster] = useState(false);
  const playExtraVideo = (id) => {
    // console.log("Extra Video", exclusive);
    const content = exclusive.find(item => item.id === id);
    if (content) {
      console.log("Content Details:", content);
      setExtraVideo(content);
      navigation.navigate('ExtraVideo', content);
      // setExtraVideoModal(true);
      // StatusBar.setHidden(true);
    } else {
      console.log("Content not found with ID:", id);
    }
  }

  const toggleFullScreen = () => {
    if (fullScreen) {
      Orientation.lockToPortrait();
      StatusBar.setHidden(false); // Show StatusBar when exiting full screen
    } else {
      Orientation.lockToLandscape();
      StatusBar.setHidden(true); // Hide StatusBar when entering full screen
    }
    setFullScreen(!fullScreen);
  }

  // const rentNow = (price, name) => {
  //   // () => props.navigation.navigate('Payment', contentDetails?.offer_price || contentDetails?.ppv_price)
  //   setIsCart("yes");
  //   try {
  //     CallApi('POST', `/api/save-cart/${props.route.params}`).then(
  //       response => {
  //         if (response.status === 'success') {
  //           setCartId(response.cart.id);
  //           // console.log('Add to Cart', response);
  //           let contentDetails = {
  //             price: price,
  //             name: name
  //           }
  //           // console.log('Add to Cart', contentDetails);
  //           navigation.navigate('Payment', contentDetails);
  //         } else {
  //           console.log('Add to Cart Error', response);
  //         }
  //       },
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const [paymentId, setpaymentId] = useState(null);

  const rentNow = (price, name, duration) => {
    let contentDetails = {
      price: price,
      name: name,
      duration: duration,
      userId: user_id,
      contentId: paymentId,
    }
    // console.log("paymentId", contentDetails);
    // return;
    navigation.navigate('Single_content_payment', contentDetails);
  };

  useEffect(() => {
    const backAction = () => {
      if (fullScreen) {
        setFullScreen(false); // Exit full screen if back button is pressed while in full screen
        Orientation.lockToPortrait();
        StatusBar.setHidden(false);
        return true; // Prevent default behavior
      }
      return false; // Default behavior for other screens
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [fullScreen]);

  useEffect(() => {
    if (isFocused) {
      getData();
      getDetails();
      console.log('Content ID', props.route.params);
    }
  }, [isFocused]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setClicked(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [clicked]);

  const [isExpanded, setIsExpanded] = useState(false);

  // Maximum number of lines for the truncated view
  const maxLines = 4;
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <SafeAreaView style={styles.container}>
      {!fullScreen && (
        <>
          <View style={{ width: '90%', alignSelf: 'center' }}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{
                // width: '15%',
                marginVertical: 7,
                marginTop: 18,
                flexDirection: 'row',
                alignSelf: 'flex-start',
                alignItems: 'center',
              }}>
              <FontAwesome name="angle-left" color={'#b6b6b6'} size={28} />
              <Text style={{ color: '#b6b6b6', fontSize: 18, marginLeft: 10 }}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: '#88888a', height: 0.4, width: '90%', alignSelf: 'center', marginTop: 3, marginBottom: 15, }}></View>
        </>
      )}
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
        <>
          <View style={{ width: '100%', height: fullScreen ? '100%' : 230, backgroundColor: '#000', justifyContent: 'center' }}>
            {isVideoPlaying || trailerPlaying ? (
              <TouchableOpacity onPress={() => { toggleView() }}>
                <Video
                  paused={paused}
                  onProgress={x => {
                    setProgress(x);
                  }}
                  source={{
                    uri: mainVideoUrl(),
                  }}
                  ref={ref}
                  muted={muted}
                  style={{ width: '100%', height: fullScreen ? '100%' : 230 }}
                  resizeMode={fullScreen ? 'cover' : 'contain'}
                  onBuffer={({ isBuffering }) => setBuffering(isBuffering)}
                  onLoad={() => setBuffering(false)}
                  onEnd={() => { setIsVideoPlaying(false), setTrailerPlaying(false) }}
                />
                {buffering && (
                  <ActivityIndicator
                    size="large"
                    color="#ffffff"
                    style={{ position: 'absolute', alignSelf: 'center' }}
                  />
                )}

                {clicked && (
                  <TouchableOpacity onPress={() => setClicked(!clicked)} style={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: 'rgba(0,0,0,.5)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableOpacity onPress={() => { ref.current.seek(parseInt(progress.currentTime) - 10) }}>
                        <MaterialIcons name="replay-10" color={'#fff'} size={30} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => { setPaused(!paused) }}>
                        <MaterialIcons
                          style={{ borderRadius: 100, marginLeft: 50 }}
                          name={
                            paused
                              ? 'play-circle-outline'
                              : 'pause-circle-outline'
                          }
                          color={'#fff'}
                          size={40}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => { ref.current.seek(parseInt(progress.currentTime) + 10) }}>
                        <MaterialIcons style={{ borderRadius: 100, marginLeft: 50 }} name="forward-10" color={'#fff'} size={30} />
                      </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', bottom: 10, paddingLeft: 20, paddingRight: 20 }}>
                      <Text style={{ color: 'white', fontSize: 12 }}>{progress && progress.currentTime && format(progress.currentTime)}</Text>
                      <Slider
                        style={{ width: fullScreen ? '93%' : '80%', height: 40 }}
                        minimumValue={0}
                        maximumValue={progress.seekableDuration}
                        minimumTrackTintColor="#fff"
                        maximumTrackTintColor="#fff"
                        thumbTintColor="#fff"
                        value={progress.currentTime}
                        onSlidingComplete={x => {
                          ref.current.seek(x);
                        }}
                      />
                      <Text style={{ color: 'white', fontSize: 12 }}> {progress?.seekableDuration && format(progress.seekableDuration)} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', top: 15, paddingHorizontal: 10 }}>
                      <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <FontAwesome name="angle-left" color={'#fff'} size={28} />
                      </TouchableOpacity>
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ marginRight: 10 }}
                          onPress={toggleMute}>
                          <MaterialIcons name={muted ? 'volume-off' : 'volume-up'} color={'#fff'} size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleFullScreen}>
                          <MaterialIcons name={fullScreen ? 'fullscreen-exit' : 'fullscreen'} color={'#fff'} size={27} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            ) : (
              <>
                <Image style={{ width: '100%', height: '100%' }} source={{ uri: banner }} />
                <LinearGradient colors={['transparent', '#141416']} style={styles.gradient} />
                {/* <Text>{content_details.response.section[0].contents.banner[0].path}{dataValue}</Text> */}
                {trailerUrl ?
                  <TouchableOpacity onPress={() => setTrailerPlaying(true)} style={styles.playBtn1}>
                    <MaterialCommunityIcons style={{ backgroundColor: '#0000004d', borderRadius: 100 }} name="play" color={'#b5bdbc'} size={30} />
                    <Text style={{ color: '#b5bdbc', fontSize: 16, fontFamily: 'Roboto-Regular' }}>Play Trailer</Text>
                  </TouchableOpacity>
                  : null
                }
              </>
            )}
          </View>

          {!fullScreen && (
            <ScrollView style={{ flex: 1, opacity: extraVideoModal ? 0.3 : undefined }} showsVerticalScrollIndicator={false}>
              <View style={{ width: '90%', alignSelf: 'center' }}>
                <View style={{ marginTop: 10, width: '100%' }}>
                  {contentDetails?.content_type !== "singlepart" &&
                    <View style={{ width: '45%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text style={{ color: '#707070', fontSize: 15, fontFamily: 'Roboto-Regular' }}>{contentDetails?.season?.name}</Text>
                      <View style={{ backgroundColor: '#707070', width: 0.4, height: 20 }}></View>
                      <Text style={{ color: '#707070', fontSize: 15, fontFamily: 'Roboto-Regular' }}>Episode {contentDetails?.episode_no}</Text>
                    </View>
                  }
                  <Text style={{ color: '#d1d1d1', fontSize: 24, fontFamily: 'Roboto-Bold', marginTop: 5 }}>{contentDetails?.name}</Text>
                  {contentDetails?.content_type !== "singlepart" &&
                    <Text style={{ color: '#707070', fontSize: 24, fontFamily: 'Roboto-Bold', marginTop: 5 }}>"{mainContent_name}"</Text>
                  }
                  <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ marginTop: 12, width: '60%' }}>
                      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
                        <Text style={{ color: '#707070', fontSize: 15, fontFamily: 'Roboto-Regular' }}>{moment(contentDetails?.release_date).format('YYYY')}</Text>
                        <View style={{ backgroundColor: '#707070', width: 1, height: 16, marginHorizontal: 6 }}></View>
                        <Text style={{ color: '#707070', fontSize: 15, fontFamily: 'Roboto-Regular' }}>{contentDetails?.hour} Hr {contentDetails?.minute} Min</Text>
                      </View>
                      <View style={{ width: '100%' }}>
                        <Text style={{ color: '#707070', fontSize: 15, fontFamily: 'Roboto-Regular', lineHeight: 15 }}>{genres?.map((ele, i) => (i === 0 ? ele.name : `,  ${ele.name}`))}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', width: '40%', alignItems: 'center', justifyContent: 'flex-end' }}>
                      {isSubscribe === 'yes' || contentDetails?.has_free_content === '1' ?
                        null
                        :
                        accessToken ? (
                          isCart === "yes" ? (
                            <View style={{ backgroundColor: '#2e2e30', marginRight: 8, borderRadius: 100, height: 40, width: 40, alignItems: 'center', justifyContent: 'center' }}>
                              <Ionicons name="cart-sharp" color={'red'} size={24} />
                            </View>
                          ) : (
                            <TouchableOpacity onPress={addToCart} style={{ backgroundColor: '#2e2e30', marginRight: 8, borderRadius: 100, height: 40, width: 40, alignItems: 'center', justifyContent: 'center' }}>
                              <Ionicons name="cart-outline" color={'#8d8c8d'} size={24} />
                            </TouchableOpacity>
                          )
                        ) : (
                          <TouchableOpacity onPress={doLogin} style={{ backgroundColor: '#2e2e30', marginRight: 8, borderRadius: 100, height: 40, width: 40, alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name="cart-outline" color={'#8d8c8d'} size={24} />
                          </TouchableOpacity>
                        )
                      }

                      {accessToken ? (
                        isFavourite === 'true' ? (
                          <TouchableOpacity onPress={addFavourite} style={{ backgroundColor: '#2e2e30', marginRight: 8, borderRadius: 100, height: 44, width: 44, alignItems: 'center', justifyContent: 'center' }}>
                            <MaterialCommunityIcons name="heart" color={'red'} size={25} />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity onPress={addFavourite} style={{ backgroundColor: '#2e2e30', marginRight: 8, borderRadius: 100, height: 44, width: 44, alignItems: 'center', justifyContent: 'center' }}>
                            <MaterialCommunityIcons name="heart-plus-outline" color={'#8d8c8d'} size={25} />
                          </TouchableOpacity>
                        )
                      ) : (
                        <TouchableOpacity onPress={doLogin} style={{ backgroundColor: '#2e2e30', marginRight: 8, borderRadius: 100, height: 44, width: 44, alignItems: 'center', justifyContent: 'center' }}>
                          <MaterialCommunityIcons name="heart-plus-outline" color={'#8d8c8d'} size={25} />
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity style={{ backgroundColor: '#2e2e30', borderRadius: 100, height: 40, width: 40, alignItems: 'center', justifyContent: 'center' }}>
                        <MaterialCommunityIcons name="share-outline" color={'#8d8c8d'} size={28} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ marginTop: 15, width: '100%' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                      <AntDesign name="tag" color={'#7b7b7b'} size={20} />
                      {contentDetails?.ppv_price > 0 ?
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                          <View style={{ width: '20%' }}>
                            <Text style={contentDetails?.has_offer === 'yes' ? styles.offerPrice : styles.price}> ${contentDetails?.ppv_price} </Text>
                            {contentDetails?.has_offer === 'yes' && (
                              <Text style={styles.price}> ${contentDetails?.offer_price} </Text>
                            )}
                          </View>
                          <View style={{ backgroundColor: '#707070', height: 30, width: 1 }}></View>
                          {/* <Text style={{ color: '#707070', marginLeft: 5 }}> |{' '} </Text> */}
                          <View style={{ width: '75%' }}>
                            {contentDetails?.ppv_duration != null &&
                              isSubscribe === 'yes' ?
                              <Text style={{ color: '#707070', fontSize: 15, marginLeft: 0, fontFamily: 'Roboto-Regular' }}>You have {calculateStreamingPeriod(contentDetails?.content_valid_till)} Streaming Period</Text>
                              :
                              <Text style={{ color: '#707070', fontSize: 15, marginLeft: 0, fontFamily: 'Roboto-Regular' }}>You have {contentDetails?.ppv_duration} Streaming Period</Text>
                            }
                          </View>
                        </View>
                        :
                        <Text style={styles.price}>Free</Text>
                      }
                    </View>
                    {accessToken ?
                      isSubscribe === 'yes' || contentDetails?.has_free_content === '1' ?
                        <TouchableOpacity onPress={() => setIsVideoPlaying(true)} style={styles.watchBtn}>
                          <FontAwesome5 name="play" color={'#f6eff0'} size={20} />
                          <Text style={{ color: '#f6eff0', fontSize: 20, fontFamily: 'Roboto-Bold', marginLeft: 10 }}>Play Now</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => rentNow(contentDetails?.offer_price || contentDetails?.ppv_price, contentDetails?.name, contentDetails?.ppv_duration)} style={styles.watchBtn}>
                          <FontAwesome5 name="play" color={'#f6eff0'} size={20} />
                          <Text style={{ color: '#f6eff0', fontSize: 20, fontFamily: 'Roboto-Bold', marginLeft: 10 }}>Rent Now</Text>
                        </TouchableOpacity>
                      :
                      <TouchableOpacity onPress={doLogin} style={styles.watchBtn}>
                        <FontAwesome5 name="play" color={'#f6eff0'} size={20} />
                        <Text style={{ color: '#f6eff0', fontSize: 20, fontFamily: 'Roboto-Bold', marginLeft: 10 }}>Rent Now</Text>
                      </TouchableOpacity>
                      // contentDetails?.has_free_content === '1' ?
                      //   <TouchableOpacity onPress={() => setIsVideoPlaying(true)} style={styles.watchBtn}>
                      //     <FontAwesome5 name="play" color={'#f6eff0'} size={20} />
                      //     <Text style={{ color: '#f6eff0', fontSize: 20, fontFamily: 'Roboto-Bold', marginLeft: 10 }}>Play Now</Text>
                      //   </TouchableOpacity>
                      //   :
                      //   <TouchableOpacity onPress={doLogin} style={styles.watchBtn}>
                      //     <FontAwesome5 name="play" color={'#f6eff0'} size={20} />
                      //     <Text style={{ color: '#f6eff0', fontSize: 20, fontFamily: 'Roboto-Bold', marginLeft: 10 }}>Rent Now</Text>
                      //   </TouchableOpacity>
                    }
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <Text style={{ color: '#b5b5b5', fontSize: 16, fontFamily: 'Roboto-Regular', marginVertical: 4 }}>Synopsis:</Text>
                    <Text
                      style={{ color: '#5b5b5b', fontSize: 15, lineHeight: 20 }}
                      numberOfLines={isExpanded ? undefined : maxLines}
                    >
                      {contentDetails?.description?.replace(/(<p[^>]+?>|<p>|<\/p>)/gim, '')}
                    </Text>
                    <TouchableOpacity onPress={toggleExpanded}>
                      <Text style={{ color: '#FF0000', fontSize: 16, fontFamily: 'Roboto-Regular', marginVertical: 4 }}>
                        {isExpanded ? 'Less...' : 'More...'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* <View style={{ marginTop: 10 }}>
                    <Text style={{ color: '#b5b5b5', fontSize: 16, fontFamily: 'Roboto-Regular', marginVertical: 4 }}>Synopsis:</Text>
                    <Text style={{ color: '#5b5b5b', fontSize: 15, lineHeight: 20 }}> {contentDetails?.description?.replace(/(<p[^>]+?>|<p>|<\/p>)/gim, '',)}</Text>
                  </View> */}
                </View>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around', backgroundColor: '#141416', marginVertical: 7 }}>
                  <TouchableOpacity style={checked === 'Related_extras' ? styles.activeTabBtm : styles.tabBtm} value="Related_extras" onPress={() => setChecked('Related_extras')}>
                    <Text style={checked === 'Related_extras' ? styles.activeTabBtmText : styles.tabBtmText}>Related Extras</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={checked === 'More_details' ? styles.activeTabBtm : styles.tabBtm} value="More_details" onPress={() => setChecked('More_details')}>
                    <Text style={checked === 'More_details' ? styles.activeTabBtmText : styles.tabBtmText}>More Details</Text>
                  </TouchableOpacity>
                </View>
                {checked === 'Related_extras' ?
                  <View style={{ flex: 1, backgroundColor: '#141416' }}>
                    {contentDetails?.content_type !== "singlepart" && episodes.length > 0 &&
                      <DropDownPicker
                        style={{ marginTop: 10, backgroundColor: '#141416', borderColor: '#474747', height: 47 }}
                        placeholder={!isFocus ? 'Season' : '...'}
                        open={season}
                        value={seasonId}
                        items={seasonItems}
                        setOpen={setSeason}
                        setValue={setSeasonId}
                        setItems={setSeasonItems}
                        disableBorderRadius={true}
                        itemSeparator={true}
                        autoScroll={true}
                        listMode="SCROLLVIEW"
                        theme="DARK"
                        dropDownContainerStyle={{
                          paddingVertical: 3,
                          backgroundColor: "#141416",
                          borderWidth: 0.8,
                          borderColor: '#474747',
                          // zIndex: 9
                        }}
                      />
                    }
                    {contentDetails?.content_type !== "singlepart" && episodes.length > 0 &&
                      <View style={{ marginTop: 20, height: 205 }}>
                        <Text style={{ color: '#fff', fontSize: 14, fontFamily: 'Roboto-Regular' }}> Episodes </Text>
                        <View style={{ marginTop: 5, flex: 1 }}>
                          <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={episodes.filter(episode => episode.season_id === seasonId)}
                            horizontal
                            // numColumns={3}
                            keyExtractor={key => {
                              return key.id;
                            }}
                            renderItem={content => {
                              return (
                                <View style={{ marginRight: 5, marginVertical: 2, width: horizontalImageWidth, borderRadius: 7 }}>
                                  <TouchableOpacity onPress={() => goToContentDetails(content.item.id)} style={{ width: '100%', height: 120, borderRadius: 7, justifyContent: 'center' }}>
                                    <Image style={styles.smallContent} source={{ uri: content.item.poster_path + '/' + content.item.poster }} />
                                    <View style={styles.playBtn}>
                                      <MaterialCommunityIcons style={{ backgroundColor: '#0000004d', borderRadius: 100 }} name="play-circle-outline" color={'#fff'} size={40} />
                                    </View>
                                  </TouchableOpacity>
                                  <Text style={{ color: '#878686', fontFamily: 'Roboto-Regular', fontSize: 12, marginTop: 5, marginLeft: 8 }}>{content.item.name}</Text>
                                  <Text style={{ color: '#878686', fontFamily: 'Roboto-Regular', fontSize: 12, marginTop: 0, marginLeft: 10 }}>Ep - {content.item.episode_no}</Text>
                                </View>
                              );
                            }}
                          />
                        </View>
                      </View>
                    }
                    {exclusive.length > 0 &&
                      <View style={{ marginTop: contentDetails?.content_type !== "singlepart" && episodes.length > 0 ? undefined : 20, height: 190 }}>
                        <Text style={{ color: '#fff', fontSize: 14, fontFamily: 'Roboto-Regular' }}>Exclusives</Text>
                        <View style={{ marginTop: 5, flex: 1 }}>
                          <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={exclusive}
                            horizontal
                            // numColumns={3}
                            keyExtractor={key => {
                              return key.id;
                            }}
                            renderItem={content => {
                              return (
                                <View style={{ marginRight: 5, marginVertical: 2, width: horizontalImageWidth, borderRadius: 7 }}>
                                  <TouchableOpacity onPress={() => playExtraVideo(content.item.id)} style={{ width: '100%', height: 120, borderRadius: 7, justifyContent: 'center' }}>
                                    <Image style={styles.smallContent} source={{ uri: content.item.image_path + '/' + content.item.image }} />
                                    <View style={styles.playBtn}>
                                      <MaterialCommunityIcons style={{ backgroundColor: '#0000004d', borderRadius: 100 }} name="play-circle-outline" color={'#fff'} size={40} />
                                    </View>
                                  </TouchableOpacity>
                                  <Text style={{ color: '#878686', fontFamily: 'Roboto-Regular', fontSize: 12, marginTop: 5, marginLeft: 8 }}>
                                    {content.item.title.length > 20 ? content.item.title.substring(0, 20) + '...' : content.item.title}
                                  </Text>
                                </View>
                              );
                            }}
                          />
                        </View>
                      </View>
                    }
                    {cast.length > 0 &&
                      <View style={{ height: 175 }}>
                        <Text style={{ color: '#fff', fontSize: 14, fontFamily: 'Roboto-Regular', marginBottom: 3 }}>Cast and Crew</Text>
                        <FlatList
                          showsHorizontalScrollIndicator={false}
                          data={cast}
                          horizontal
                          keyExtractor={key => {
                            return key.id;
                          }}
                          renderItem={content => {
                            return (
                              <View
                                style={{
                                  marginRight: 10,
                                  marginVertical: 5,
                                  width: 100,
                                }}>
                                <TouchableHighlight
                                  onPress={() => castDetails(content.item.id)}
                                  style={{
                                    height: 105,
                                    width: '100%',
                                    borderRadius: 8,
                                  }}>
                                  <Image
                                    style={styles.smallContent}
                                    source={{
                                      uri:
                                        content.item.attached_profileurl +
                                        '/' +
                                        content.item.profile,
                                    }}
                                  />
                                </TouchableHighlight>
                                <Text style={{ color: '#878686', fontFamily: 'Roboto-Regular', fontSize: 12, marginTop: 5, marginLeft: 8 }}>{content.item.name}</Text>
                              </View>
                            );
                          }}
                        />
                      </View>
                    }
                    {foryou.length > 0 &&
                      <View style={{ flex: 1, marginBottom: 30 }}>
                        <Text style={{ color: '#fff', fontSize: 14, fontFamily: 'Roboto-Regular' }}> You May Also Like </Text>
                        <View style={{ marginTop: 5, flex: 1 }}>
                          <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={foryou}
                            horizontal
                            // numColumns={3}
                            keyExtractor={key => {
                              return key.id;
                            }}
                            renderItem={content => {
                              return (
                                <View style={{ marginRight: 5, marginVertical: 2, width: 115, borderRadius: 7 }}>
                                  <TouchableHighlight onPress={() => goToContentDetails(content.item.id)} style={{ width: '100%', height: 170, borderRadius: 7, justifyContent: 'center' }}>
                                    {content.item.vertical_poster_path ?
                                      <Image style={styles.smallContent} source={{ uri: content.item.vertical_poster_path + '/' + content.item.vertical_poster }} />
                                      :
                                      <Image style={styles.smallContent} source={require('../../assets/Images/no_img.jpg')} />
                                    }
                                  </TouchableHighlight>
                                  {/* <Text style={{ color: '#878686', fontFamily: 'Roboto-Regular', fontSize: 12, marginTop: 5, marginLeft: 8 }}> {content.item.name} </Text> */}
                                </View>
                              );
                            }}
                          />
                        </View>
                      </View>
                    }
                  </View>
                  :
                  <View style={{ flex: 1, backgroundColor: '#141416', paddingVertical: 10 }}>
                    {otherDetails?.creator &&
                      <>
                        <Text style={{ color: '#a7a4a4', fontSize: 18, fontWeight: '600', marginBottom: 5 }}>Creator</Text>
                        <Text style={{ color: '#666666', fontSize: 15, fontWeight: '400', marginBottom: 5 }}>{otherDetails?.creator}</Text>
                        <View style={{ backgroundColor: '#535353', height: 0.4, marginVertical: 8 }}></View>
                      </>
                    }
                    {otherDetails?.writter &&
                      <>
                        <Text style={{ color: '#a7a4a4', fontSize: 18, fontWeight: '600', marginBottom: 5 }}>Writer</Text>
                        <Text style={{ color: '#666666', fontSize: 15, fontWeight: '400', marginBottom: 5 }}>{otherDetails?.writter}</Text>
                        <View style={{ backgroundColor: '#535353', height: 0.4, marginVertical: 8 }}></View>
                      </>
                    }
                    {otherDetails?.director &&
                      <>
                        <Text style={{ color: '#a7a4a4', fontSize: 18, fontWeight: '600', marginBottom: 5 }}>Director</Text>
                        <Text style={{ color: '#666666', fontSize: 15, fontWeight: '400', marginBottom: 5 }}>{otherDetails?.director}</Text>
                        <View style={{ backgroundColor: '#535353', height: 0.4, marginVertical: 8 }}></View>
                      </>
                    }
                    {otherDetails?.starring &&
                      <>
                        <Text style={{ color: '#a7a4a4', fontSize: 18, fontWeight: '600', marginBottom: 5 }}>Starring</Text>
                        <Text style={{ color: '#666666', fontSize: 15, fontWeight: '400', marginBottom: 5 }}>{otherDetails?.starring}</Text>
                        <View style={{ backgroundColor: '#535353', height: 0.4, marginVertical: 8 }}></View>
                      </>
                    }
                    {otherDetails?.producer &&
                      <>
                        <Text style={{ color: '#a7a4a4', fontSize: 18, fontWeight: '600', marginBottom: 5 }}>Producer</Text>
                        <Text style={{ color: '#666666', fontSize: 15, fontWeight: '400', marginBottom: 5 }}>{otherDetails?.producer}</Text>
                        <View style={{ backgroundColor: '#535353', height: 0.4, marginVertical: 8 }}></View>
                      </>
                    }
                    {otherDetails?.supporting_actors &&
                      <>
                        <Text style={{ color: '#a7a4a4', fontSize: 18, fontWeight: '600', marginBottom: 5 }}>Supporting Actors</Text>
                        <Text style={{ color: '#666666', fontSize: 15, fontWeight: '400', marginBottom: 5 }}>{otherDetails?.supporting_actors}</Text>
                        <View style={{ backgroundColor: '#535353', height: 0.4, marginVertical: 8 }}></View>
                      </>
                    }
                    {otherDetails?.studios &&
                      <>
                        <Text style={{ color: '#a7a4a4', fontSize: 18, fontWeight: '600', marginBottom: 5 }}>Studios</Text>
                        <Text style={{ color: '#666666', fontSize: 15, fontWeight: '400', marginBottom: 5, }}>{otherDetails?.studios}</Text>
                        <View style={{ backgroundColor: '#535353', height: 0.5, marginVertical: 8 }}></View>
                      </>
                    }
                    {otherDetails?.content_advisory &&
                      <>
                        <Text style={{ color: '#a7a4a4', fontSize: 18, fontWeight: '600', marginBottom: 5 }}>Content Advisory</Text>
                        <Text style={{ color: '#666666', fontSize: 15, fontWeight: '400', marginBottom: 5 }}>{otherDetails?.content_advisory}</Text>
                        <View style={{ backgroundColor: '#535353', height: 0.5, marginVertical: 8 }}></View>
                      </>
                    }
                    {otherDetails?.language &&
                      <>
                        <Text style={{ color: '#a7a4a4', fontSize: 18, fontWeight: '600', marginBottom: 5 }}>Language</Text>
                        <Text style={{ color: '#666666', fontSize: 15, fontWeight: '400', marginBottom: 5 }}>{otherDetails?.language}</Text>
                        {/* <View style={{ backgroundColor: '#535353', height: 0.5, marginVertical: 8 }}></View> */}
                      </>
                    }
                  </View>
                }
              </View>
            </ScrollView>
          )}
        </>
      )
      }

      <Modal
        isVisible={extraVideoModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5}
        onBackdropPress={slideOut}
        onSwipeComplete={slideOut}
        swipeDirection={['down']}
        style={{ margin: 0 }}
      >
        <View style={{ width: fullScreen ? '100%' : '95%', height: fullScreen ? '100%' : 260, backgroundColor: '#fff', alignSelf: 'center', borderRadius: 10, borderColor: '#706f6f', borderWidth: 0 }}>
          {/* <Text style={{ color: '#000' }}>{extraVideo.description}</Text> */}
          <TouchableOpacity activeOpacity={1} animation={false} onPress={() => { toggleExtraVideoView() }}>
            {showPoster && (
              <Image
                source={{ uri: extraVideo.image_path + "/" + extraVideo.image }}
                style={{ width: '100%', height: '100%', position: 'absolute' }}
              />
            )}
            <Video
              paused={pausedExtraVideo}
              onProgress={x => {
                setProgressExtraVideo(x);
                if (showPoster) setShowPoster(false);
              }}
              source={{
                uri: extraVideo?.video,
              }}
              ref={ref}
              muted={mutedExtraVideo}
              style={{ width: '100%', height: '100%' }}
              resizeMode={'cover'}
              onLoad={() => setShowPoster(false)}
              onBuffer={() => setShowPoster(true)}
            />

            {clickedExtraVideo && (
              <TouchableOpacity onPress={() => setClickedExtraVideo(!clickedExtraVideo)} style={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: 'rgba(0,0,0,.5)', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => { ref.current.seek(parseInt(progressExtraVideo.currentTime) - 10) }}>
                    <MaterialIcons name="replay-10" color={'#fff'} size={30} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setPausedExtraVideo(!pausedExtraVideo) }}>
                    <MaterialIcons
                      style={{ borderRadius: 100, marginLeft: 50 }}
                      name={
                        pausedExtraVideo
                          ? 'play-circle-outline'
                          : 'pause-circle-outline'
                      }
                      color={'#fff'}
                      size={40}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => { ref.current.seek(parseInt(progressExtraVideo.currentTime) + 10) }}>
                    <MaterialIcons style={{ borderRadius: 100, marginLeft: 50 }} name="forward-10" color={'#fff'} size={30} />
                  </TouchableOpacity>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', bottom: 10, paddingLeft: 20, paddingRight: 20 }}>
                  <Text style={{ color: 'white', fontSize: 12 }}>{progressExtraVideo && progressExtraVideo.currentTime && format(progressExtraVideo.currentTime)} </Text>
                  <Slider
                    style={{ width: fullScreen ? '93%' : '80%', height: 40 }}
                    minimumValue={0}
                    maximumValue={progressExtraVideo.seekableDuration}
                    minimumTrackTintColor="#fff"
                    maximumTrackTintColor="#fff"
                    thumbTintColor="#fff"
                    value={progressExtraVideo.currentTime}
                    onSlidingComplete={x => {
                      ref.current.seek(x);
                    }}
                  />
                  <Text style={{ color: 'white', fontSize: 12 }}> {progressExtraVideo?.seekableDuration && format(progressExtraVideo.seekableDuration)} </Text>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', top: 15, paddingHorizontal: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={onClose}>
                      <FontAwesome name="angle-left" color={'#fff'} size={28} />
                    </TouchableOpacity>
                    <Text style={{ color: '#fff', fontSize: 15, fontWeight: '400', marginLeft: 10 }}>
                      {extraVideo?.title.length > 40 ? extraVideo?.title.slice(0, 30) + '...' : extraVideo?.title}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ marginRight: 10 }}
                      onPress={toggleMuteExtraVideo}>
                      <MaterialIcons name={mutedExtraVideo ? 'volume-off' : 'volume-up'} color={'#fff'} size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleFullScreen}>
                      <MaterialIcons name={fullScreen ? 'fullscreen-exit' : 'fullscreen'} color={'#fff'} size={27} />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>
      </Modal>

    </SafeAreaView >
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141416',
  },
  backBtn: {
    zIndex: 1,
    position: 'absolute',
    top: 5,
    alignSelf: 'flex-start',
    paddingLeft: 5,
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  playBtn1: {
    zIndex: 1,
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1.6,
    borderColor: '#b5bdbc',
    paddingHorizontal: 10,
    paddingVertical: 4
  },
  playBtn: {
    zIndex: 1,
    position: 'absolute',
    alignSelf: 'center',
  },
  rentBtn: {
    backgroundColor: '#e00024',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'center',
    borderRadius: 30,
  },
  watchBtn: {
    flexDirection: 'row',
    backgroundColor: '#df0225',
    paddingVertical: 14,
    width: '100%',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
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
    borderRadius: 8,
  },
  price: {
    color: '#fff',
    fontSize: 16,
    // alignSelf: 'flex-start',
    marginLeft: 5,
  },
  offerPrice: {
    color: '#7d7c7a',
    fontSize: 14,
    marginLeft: 5,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  tabBtm: {
    width: '45%',
    marginVertical: 10,
    alignItems: 'center',
    borderBottomColor: '#474747',
    // borderBottomWidth:0.5,
    // marginBottom:4
  },
  activeTabBtm: {
    width: '45%',
    marginVertical: 10,
    alignItems: 'center',
    borderBottomColor: '#df0225',
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  tabBtmText: {
    fontFamily: 'Roboto-Bold',
    color: '#828282',
  },
  activeTabBtmText: {
    fontFamily: 'Roboto-Bold',
    color: '#b4b4b4',
  },
});

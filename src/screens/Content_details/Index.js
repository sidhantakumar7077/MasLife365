import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Spinner from 'react-native-loading-spinner-overlay';
import {useNavigation} from '@react-navigation/native';
import {STORE_ID, CallApi} from '../../component/CallApi/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {CheckBox} from 'react-native-elements';
import {getContentDetails} from '../../services/apiHandler';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCD} from '../../redux/action/actionCD';
let {width: screenWidth} = Dimensions.get('window');
let horizontalImageWidth = (screenWidth - 45) / 2;
let verticalImageWidth = (screenWidth - 55) / 3;

const Related_extras = props => {
  const layout = useWindowDimensions();

  console.log(props.route.pid, 'ssssss');
  const data = [
    {
      id: 1,
      contentName: 'Mahabharat',
      image:
        'https://m.media-amazon.com/images/M/MV5BZGZkYTdiMzQtMWE5My00NTg2LTlhNTctOTMxNzdhYTE4NzRlXkEyXkFqcGdeQXVyODAzNzAwOTU@._V1_.jpg',
    },
    {
      id: 2,
      contentName: 'Ramayan',
      image:
        'https://www.kapot.in/wp-content/uploads/2022/02/Global-Footprints-Of-Ramayan.jpeg',
    },
    {
      id: 3,
      contentName: 'Drishyam 2',
      image:
        'https://m.media-amazon.com/images/M/MV5BM2RiZDVjYWEtZGNhYy00ZGU0LTgwZjMtZTJmNmMyNGQ5NGYyXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_.jpg',
    },
    {
      id: 4,
      contentName: 'Houseful 4',
      image:
        'https://upload.wikimedia.org/wikipedia/en/3/3c/Housefull_4_poster.jpg',
    },
    {
      id: 5,
      contentName: 'Run Baby Run',
      image:
        'https://m.media-amazon.com/images/M/MV5BZWIxODRiYWQtOWUyYS00NTA2LTkwNDYtNDcyMWEzNGRiNDAxXkEyXkFqcGdeQXVyMTMzNzIyNDc1._V1_.jpg',
    },
    {
      id: 6,
      contentName: 'Gaslight',
      image:
        'https://upload.wikimedia.org/wikipedia/en/8/80/Gaslight_film_poster.jpg',
    },
    {
      id: 7,
      contentName: 'Sridevi Shobanbabu',
      image:
        'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/sridevi-shoban-babu-et00351961-1675755406.jpg',
    },
    {
      id: 8,
      contentName: 'Bigg Boss',
      image: 'https://www.justwatch.com/images/poster/301121536/s332/season-16',
    },
    {
      id: 9,
      contentName: 'Boston Strangler',
      image:
        'https://rukminim1.flixcart.com/image/416/416/book/5/2/1/the-boston-strangler-original-imaeah6x9htg5cbj.jpeg?q=70',
    },
    {
      id: 10,
      contentName: 'POP Kaun?',
      image:
        'https://m.media-amazon.com/images/M/MV5BOWZlNDA3NWUtY2JmNi00YWRiLTgyMTgtMWMyZjdjMjJhNmUxXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg',
    },
    {
      id: 11,
      contentName: 'Pathaan',
      image:
        'https://upload.wikimedia.org/wikipedia/en/c/c3/Pathaan_film_poster.jpg',
    },
    {
      id: 12,
      contentName: 'Koffee With Karan',
      image:
        'https://m.media-amazon.com/images/M/MV5BODg1YTE5ZTAtYWJiYS00MGQ0LTk3NDQtNjMyZTA0ZjNmNzBiXkEyXkFqcGdeQXVyNzM4MjU3NzY@._V1_QL75_UY281_CR11,0,190,281_.jpg',
    },
    {
      id: 13,
      contentName: 'Alone',
      image:
        'https://st1.bollywoodlife.com/wp-content/uploads/2015/01/alone-1-160115.jpg',
    },
    {
      id: 14,
      contentName: 'Tanhaji',
      image:
        'https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/Tanaji_film_poster.jpg/220px-Tanaji_film_poster.jpg',
    },
    {
      id: 15,
      contentName: 'Arjun Rwddy',
      image:
        'https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_2_5x/sources/r1/cms/prod/9217/1389217-v-c29b53bc1557',
    },
    {
      id: 16,
      contentName: 'The Legend',
      image:
        'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/the-legend-et00334635-1658906975.jpg',
    },
    {
      id: 17,
      contentName: 'Baaghi 3',
      image:
        'https://img1.hotstarext.com/image/upload/f_auto,t_vl/sources/r1/cms/prod/9239/1389239-v-b354c74533f6',
    },
    {
      id: 18,
      contentName: 'Total Dhamaal',
      image:
        'https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_2_5x/sources/r1/cms/prod/9235/1389235-v-27df0544998f',
    },
    {
      id: 19,
      contentName: 'M.S.Dhoni',
      image:
        'https://img1.hotstarext.com/image/upload/f_auto,t_vl/sources/r1/cms/prod/old_images/vertical/MOVIE/3314/1770003314/1770003314-v',
    },
    {
      id: 20,
      contentName: 'Chhichhore',
      image:
        'https://img1.hotstarext.com/image/upload/f_auto,t_vl/sources/r1/cms/prod/9219/1389219-v-9752e6e5bb92',
    },
    {
      id: 21,
      contentName: 'Hate Story 3',
      image: 'https://www.indicine.com/img/2015/10/Hate-Story-3-Poster.jpg',
    },
  ];

  const caster = [
    {
      img: 'https://m.media-amazon.com/images/M/MV5BYjFlMGQ2OTgtZjllZC00NzJhLWFlMjctZmI4NDg2MGEzOWJiXkEyXkFqcGdeQXVyMjMyNjcxMTg@._V1_.jpg',
    },
    {
      img: 'https://m.media-amazon.com/images/M/MV5BYjFlMGQ2OTgtZjllZC00NzJhLWFlMjctZmI4NDg2MGEzOWJiXkEyXkFqcGdeQXVyMjMyNjcxMTg@._V1_.jpg',
    },
    {
      img: 'https://m.media-amazon.com/images/M/MV5BYjFlMGQ2OTgtZjllZC00NzJhLWFlMjctZmI4NDg2MGEzOWJiXkEyXkFqcGdeQXVyMjMyNjcxMTg@._V1_.jpg',
    },
    {
      img: 'https://m.media-amazon.com/images/M/MV5BYjFlMGQ2OTgtZjllZC00NzJhLWFlMjctZmI4NDg2MGEzOWJiXkEyXkFqcGdeQXVyMjMyNjcxMTg@._V1_.jpg',
    },
    {
      img: 'https://m.media-amazon.com/images/M/MV5BYjFlMGQ2OTgtZjllZC00NzJhLWFlMjctZmI4NDg2MGEzOWJiXkEyXkFqcGdeQXVyMjMyNjcxMTg@._V1_.jpg',
    },
    {
      img: 'https://m.media-amazon.com/images/M/MV5BYjFlMGQ2OTgtZjllZC00NzJhLWFlMjctZmI4NDg2MGEzOWJiXkEyXkFqcGdeQXVyMjMyNjcxMTg@._V1_.jpg',
    },
    {
      img: 'https://m.media-amazon.com/images/M/MV5BYjFlMGQ2OTgtZjllZC00NzJhLWFlMjctZmI4NDg2MGEzOWJiXkEyXkFqcGdeQXVyMjMyNjcxMTg@._V1_.jpg',
    },
    {
      img: 'https://m.media-amazon.com/images/M/MV5BYjFlMGQ2OTgtZjllZC00NzJhLWFlMjctZmI4NDg2MGEzOWJiXkEyXkFqcGdeQXVyMjMyNjcxMTg@._V1_.jpg',
    },
    {
      img: 'https://m.media-amazon.com/images/M/MV5BYjFlMGQ2OTgtZjllZC00NzJhLWFlMjctZmI4NDg2MGEzOWJiXkEyXkFqcGdeQXVyMjMyNjcxMTg@._V1_.jpg',
    },
    {
      img: 'https://m.media-amazon.com/images/M/MV5BYjFlMGQ2OTgtZjllZC00NzJhLWFlMjctZmI4NDg2MGEzOWJiXkEyXkFqcGdeQXVyMjMyNjcxMTg@._V1_.jpg',
    },
    {
      img: 'https://m.media-amazon.com/images/M/MV5BYjFlMGQ2OTgtZjllZC00NzJhLWFlMjctZmI4NDg2MGEzOWJiXkEyXkFqcGdeQXVyMjMyNjcxMTg@._V1_.jpg',
    },
  ];

  const navigation = useNavigation();
  const [foryou, setForyou] = useState([]);
  const [cast, setCast] = useState([]);
  const [exclusive, setExclusive] = useState([]);
  const dispatch = useDispatch();
  const content_details = useSelector(state => state.CDReducer); //1st
  const [dataId, setDataId] = useState('');
  const castDetails = id => {
    navigation.navigate('Cast_details', id);
  };
  const goToContentDetails = id => {
    setDataId(id);
    props.route.valueData(id);
    try {
      CallApi(
        'GET',
        '/api/content-details-no-auth/' + id + '/' + STORE_ID,
      ).then(res => {
        setForyou(res.section[0].foryou);
        setCast(res.section[0].casts);
        setExclusive(res.section[0].exclusivecontent);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getForyou = async () => {
    try {
      CallApi(
        'GET',
        '/api/content-details-no-auth/' + props.route.pid + '/' + STORE_ID,
      ).then(res => {
        setForyou(res.section[0].foryou);
        setCast(res.section[0].casts);
        setExclusive(res.section[0].exclusivecontent);
        // console.log("res.section[0].foryou---------", res.section[0].foryou);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (content_details.isSuccess === false) {
      dispatch(fetchCD(dataId, STORE_ID));
    } //2nd
    getForyou();
    if (props?.route) {
      console.log('getForyou', props.route.params);
    }
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#141416'}}>
      <View style={{marginTop: 20, height: 170}}>
        <Text
          style={{color: '#fff', fontSize: 14, fontFamily: 'Roboto-Regular'}}>
          Exclusives
        </Text>
        <View style={{marginTop: 5, flex: 1}}>
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
                <View
                  style={{
                    marginRight: 5,
                    marginVertical: 2,
                    width: horizontalImageWidth,
                    borderRadius: 7,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: 120,
                      borderRadius: 7,
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={styles.smallContent}
                      source={{
                        uri:
                          content.item.poster_path + '/' + content.item.poster,
                      }}
                    />
                    <TouchableHighlight style={styles.playBtn}>
                      <MaterialCommunityIcons
                        style={{
                          backgroundColor: '#0000004d',
                          borderRadius: 100,
                        }}
                        name="play-circle-outline"
                        color={'#fff'}
                        size={40}
                      />
                    </TouchableHighlight>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
      <View style={{height: 155}}>
        <Text
          style={{
            color: '#fff',
            fontSize: 14,
            fontFamily: 'Roboto-Regular',
            marginBottom: 3,
          }}>
          Cast
        </Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={cast}
          horizontal
          keyExtractor={key => {
            return key.id;
          }}
          renderItem={content => {
            return (
              <View style={{marginRight: 10, marginVertical: 5, width: 100}}>
                <TouchableHighlight
                  onPress={() => castDetails(content.item.id)}
                  style={{height: 105, width: '100%', borderRadius: 8}}>
                  <Image
                    style={styles.smallContent}
                    source={{
                      uri: content.item.attached_url + '/' + content.item.image,
                    }}
                  />
                </TouchableHighlight>
              </View>
            );
          }}
        />
      </View>
      <View style={{flex: 1}}>
        <Text
          style={{
            color: '#fff',
            fontSize: 14,
            fontFamily: 'Roboto-Regular',
            marginBottom: 5,
          }}>
          You May Also Like
        </Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={foryou}
          horizontal
          keyExtractor={key => {
            return key.id;
          }}
          renderItem={content => {
            return (
              <View
                style={{
                  marginRight: 7,
                  marginVertical: 5,
                  width: verticalImageWidth,
                }}>
                <TouchableHighlight
                  onPress={() => goToContentDetails(content.item.id)}
                  style={{height: 151, width: '100%', borderRadius: 4}}>
                  <Image
                    style={styles.smallContent}
                    source={{
                      uri: content.item.poster_path + '/' + content.item.poster,
                    }}
                  />
                </TouchableHighlight>
                <Text
                  style={{
                    color: '#878686',
                    fontFamily: 'Roboto-Regular',
                    fontSize: 12,
                    marginTop: 5,
                    marginLeft: 8,
                  }}>
                  {content.item.name}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const More_details = props => {
  const navigation = useNavigation();
  const [details, setDetails] = useState([]);

  const getDetails = async () => {
    try {
      CallApi(
        'GET',
        '/api/content-details-no-auth/' + props.route.pid + '/' + STORE_ID,
      ).then(res => {
        setDetails(res.section[0].contents);
        // console.log("res.section[0].foryou---------", res.section[0].foryou);
      });
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    getDetails();
    if (props?.route) {
      console.log('getDetails', props.route.params);
    }
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#141416', paddingVertical: 10}}>
      <Text
        style={{
          color: '#a7a4a4',
          fontSize: 18,
          fontWeight: '600',
          marginBottom: 5,
        }}>
        Creator
      </Text>
      <Text
        style={{
          color: '#666666',
          fontSize: 15,
          fontWeight: '400',
          marginBottom: 5,
        }}>
        {details?.creator}
      </Text>
      <View
        style={{
          backgroundColor: '#535353',
          height: 0.4,
          marginVertical: 8,
        }}></View>
      <Text
        style={{
          color: '#a7a4a4',
          fontSize: 18,
          fontWeight: '600',
          marginBottom: 5,
        }}>
        Writter
      </Text>
      <Text
        style={{
          color: '#666666',
          fontSize: 15,
          fontWeight: '400',
          marginBottom: 5,
        }}>
        {details?.writter}
      </Text>
      <View
        style={{
          backgroundColor: '#535353',
          height: 0.4,
          marginVertical: 8,
        }}></View>
      <Text
        style={{
          color: '#a7a4a4',
          fontSize: 18,
          fontWeight: '600',
          marginBottom: 5,
        }}>
        Director
      </Text>
      <Text
        style={{
          color: '#666666',
          fontSize: 15,
          fontWeight: '400',
          marginBottom: 5,
        }}>
        {details?.director}
      </Text>
      <View
        style={{
          backgroundColor: '#535353',
          height: 0.4,
          marginVertical: 8,
        }}></View>
      <Text
        style={{
          color: '#a7a4a4',
          fontSize: 18,
          fontWeight: '600',
          marginBottom: 5,
        }}>
        Starring
      </Text>
      <Text
        style={{
          color: '#666666',
          fontSize: 15,
          fontWeight: '400',
          marginBottom: 5,
        }}>
        {details?.starring}
      </Text>
      <View
        style={{
          backgroundColor: '#535353',
          height: 0.4,
          marginVertical: 8,
        }}></View>
      <Text
        style={{
          color: '#a7a4a4',
          fontSize: 18,
          fontWeight: '600',
          marginBottom: 5,
        }}>
        Supporting Actors
      </Text>
      <Text
        style={{
          color: '#666666',
          fontSize: 15,
          fontWeight: '400',
          marginBottom: 5,
        }}>
        {details?.supporting_actors}
      </Text>
      <View
        style={{
          backgroundColor: '#535353',
          height: 0.4,
          marginVertical: 8,
        }}></View>
      <Text
        style={{
          color: '#a7a4a4',
          fontSize: 18,
          fontWeight: '600',
          marginBottom: 5,
        }}>
        Studios
      </Text>
      <Text
        style={{
          color: '#666666',
          fontSize: 15,
          fontWeight: '400',
          marginBottom: 5,
        }}>
        {details?.studios}
      </Text>
      <View
        style={{
          backgroundColor: '#535353',
          height: 0.5,
          marginVertical: 8,
        }}></View>
      <Text
        style={{
          color: '#a7a4a4',
          fontSize: 18,
          fontWeight: '600',
          marginBottom: 5,
        }}>
        Content Advisory
      </Text>
      <Text
        style={{
          color: '#666666',
          fontSize: 15,
          fontWeight: '400',
          marginBottom: 5,
        }}>
        {details?.content_advisory}
      </Text>
      <View
        style={{
          backgroundColor: '#535353',
          height: 0.5,
          marginVertical: 8,
        }}></View>
      <Text
        style={{
          color: '#a7a4a4',
          fontSize: 18,
          fontWeight: '600',
          marginBottom: 5,
        }}>
        Language
      </Text>
      <Text
        style={{
          color: '#666666',
          fontSize: 15,
          fontWeight: '400',
          marginBottom: 5,
        }}>
        {details?.language}
      </Text>
      {/* <View style={{backgroundColor:'#aeb0af', height:0.5, marginVertical:8}}></View> */}
    </View>
  );
};

const Index = props => {
  const [isChecked, setIsChecked] = useState(false);
  const layout = useWindowDimensions();
  const [dataValue, setDataValue] = useState('');

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'first',
      title: 'Related Extras',
      pid: props.route.params,
      valueData: setDataValue,
    },
    {key: 'second', title: 'More Details', pid: props.route.params},
  ]);

  const renderScene = SceneMap({
    first: Related_extras,
    second: More_details,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      activeColor={'#b4b4b4'}
      inactiveColor={'#828282'}
      labelStyle={{textTransform: 'capitalize', fontFamily: 'Roboto-Bold'}}
      indicatorStyle={{backgroundColor: '#df0225'}}
      style={{backgroundColor: '#141416'}}
    />
  );

  const navigation = useNavigation();
  const [spinner, setSpinner] = useState(false);
  const [contentDetails, setContentDetails] = useState([]);
  const [banner, setBanner] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isSubscribe, setIsSubscribe] = useState('no');
  const [accessToken, setAccessToken] = useState('');
  const [user_id, setUser_id] = useState('');
  const [isFavourite, setIsFavourite] = useState('');
  const dispatch = useDispatch();
  const content_details = useSelector(state => state.CDReducer);
  // console.log("object=-=-=-=-=-=-=", content_details)

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

  const addFavourite = async () => {
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
            getDetails();
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
      const res = await getContentDetails(props.route.params, STORE_ID);
      if (res.data.status === 'success') {
        setContentDetails(content_details.response.section[0].contents);
        setGenres(content_details.response.section[0].genres);
        setBanner(content_details.response.section[0].contents.banner[0]);
        setIsSubscribe(content_details.response.section[0].is_subscribe);
        setSpinner(false);
        setIsFavourite(content_details.response.section[0].is_favorite);
      }
    } catch (error) {
      console.log(error);
      setSpinner(false);
    }
  };
  // useEffect(() => {
  //   console.log("object=-=-=-=-=-=-=", content_details)
  // }, [content_details])

  useEffect(() => {
    if (content_details.isSuccess === false) {
      dispatch(fetchCD(dataValue, STORE_ID));
    } //2nd
    getData();
    getDetails();
    console.log('Content ID', props.route.params);
  }, []);

  // console.log("contentDetails---=====", contentDetails)
  return (
    <SafeAreaView style={styles.container}>
      <View style={{width: '90%', alignSelf: 'center'}}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{
            width: '15%',
            marginVertical: 7,
            marginTop: 18,
            flexDirection: 'row',
            alignSelf: 'flex-start',
            alignItems: 'center',
          }}>
          <FontAwesome name="angle-left" color={'#b6b6b6'} size={28} />
          <Text style={{color: '#b6b6b6', fontSize: 18, marginLeft: 10}}>
            Back
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: '#88888a',
          height: 0.4,
          width: '90%',
          alignSelf: 'center',
          marginTop: 3,
          marginBottom: 15,
        }}></View>
      {spinner === true ? (
        <Spinner
          visible={spinner}
          animation="slide"
          color="#e00024"
          overlayColor="rgba(0, 0, 0, 0.25)"
          textContent={'Loading...'}
          textStyle={{color: '#e00024'}}
        />
      ) : (
        <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: '100%',
              height: 300,
              backgroundColor: '#000',
              justifyContent: 'center',
            }}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={{uri: banner?.path + '/' + banner?.top_banner}}
            />
            <LinearGradient
              colors={['transparent', '#141416']} // Adjust the colors and opacity as needed
              style={styles.gradient}
            />
            {/* <Text>{content_details.response.section[0].contents.banner[0].path}{dataValue}</Text> */}
            {accessToken ? (
              isSubscribe === 'yes' ||
              contentDetails.has_free_content === '1' ? (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('PlayVideo', contentDetails.id)
                  }
                  style={styles.playBtn}>
                  <MaterialCommunityIcons
                    style={{backgroundColor: '#0000004d', borderRadius: 100}}
                    name="play-circle-outline"
                    color={'#b5bdbc'}
                    size={65}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Payment')}
                  style={styles.playBtn}>
                  <MaterialCommunityIcons
                    style={{backgroundColor: '#0000004d', borderRadius: 100}}
                    name="play-circle-outline"
                    color={'#b5bdbc'}
                    size={65}
                  />
                </TouchableOpacity>
              )
            ) : (
              <TouchableOpacity onPress={doLogin} style={styles.playBtn}>
                <MaterialCommunityIcons
                  style={{backgroundColor: '#0000004d', borderRadius: 100}}
                  name="play-circle-outline"
                  color={'#b5bdbc'}
                  size={65}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={{flex: 1, width: '90%', alignSelf: 'center'}}>
            <View style={{marginTop: 10}}>
              <Text
                style={{
                  color: '#d1d1d1',
                  fontSize: 24,
                  fontFamily: 'Roboto-Bold',
                }}>
                {contentDetails.name}
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{marginTop: 12}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '75%',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#707070',
                        fontSize: 15,
                        marginRight: 10,
                        fontFamily: 'Roboto-Regular',
                      }}>
                      {moment(contentDetails.release_date).format('YYYY')}
                    </Text>
                    <Text style={{color: '#707070'}}>| </Text>
                    {/* <Text style={{ color: '#fff', fontSize: 15, marginRight: 10 }}>{contentDetails.quality}</Text> */}
                    <Text
                      style={{
                        color: '#707070',
                        fontSize: 15,
                        marginRight: 10,
                        fontFamily: 'Roboto-Regular',
                      }}>
                      {contentDetails.hour}hr {contentDetails.minute}min
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '75%',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#707070',
                        fontSize: 15,
                        marginRight: 10,
                        fontFamily: 'Roboto-Regular',
                        lineHeight: 20,
                      }}>
                      {genres?.map((ele, i) => ele.name).join(' , ')}
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  {console.log('isFavourite', isFavourite)}
                  {isFavourite === 'true' ? (
                    <TouchableOpacity
                      onPress={addFavourite}
                      style={{
                        marginRight: 10,
                        backgroundColor: '#2e2e30',
                        borderRadius: 100,
                        height: 44,
                        width: 44,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <MaterialCommunityIcons
                        name="heart"
                        color={'red'}
                        size={25}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={addFavourite}
                      style={{
                        marginRight: 10,
                        backgroundColor: '#2e2e30',
                        borderRadius: 100,
                        height: 44,
                        width: 44,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <MaterialCommunityIcons
                        name="heart-plus-outline"
                        color={'#8d8c8d'}
                        size={25}
                      />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#2e2e30',
                      borderRadius: 100,
                      height: 40,
                      width: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <MaterialCommunityIcons
                      name="share-outline"
                      color={'#8d8c8d'}
                      size={28}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{alignItems: 'center', marginTop: 15}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <AntDesign name="tag" color={'#7b7b7b'} size={20} />
                  {contentDetails.ppv_price > 0 ? (
                    <View>
                      <Text
                        style={
                          contentDetails.has_offer === 'yes'
                            ? styles.offerPrice
                            : styles.price
                        }>
                        ${contentDetails.ppv_price}
                      </Text>
                      {contentDetails.has_offer === 'yes' && (
                        <Text style={styles.price}>
                          ${contentDetails.ppv_price}
                        </Text>
                      )}
                    </View>
                  ) : (
                    <Text style={styles.price}>Free</Text>
                  )}
                  <Text style={{color: '#88888a', marginLeft: 10}}>|</Text>
                  <Text
                    style={{color: '#575757', fontSize: 14, marginLeft: 10}}>
                    You have 48-Hours Streaming Period
                  </Text>
                </View>
                {accessToken ? (
                  isSubscribe === 'yes' ||
                  contentDetails.has_free_content === '1' ? (
                    <TouchableOpacity
                      onPress={() => props.navigation.navigate('PlayVideo')}
                      style={styles.watchBtn}>
                      <FontAwesome5 name="play" color={'#f6eff0'} size={20} />
                      <Text
                        style={{
                          color: '#f6eff0',
                          fontSize: 20,
                          fontFamily: 'Roboto-Bold',
                          marginLeft: 10,
                        }}>
                        Play Now
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => props.navigation.navigate('Payment')}
                      style={styles.watchBtn}>
                      <FontAwesome5 name="play" color={'#f6eff0'} size={20} />
                      <Text
                        style={{
                          color: '#f6eff0',
                          fontSize: 20,
                          fontFamily: 'Roboto-Bold',
                          marginLeft: 10,
                        }}>
                        Rent Now
                      </Text>
                    </TouchableOpacity>
                  )
                ) : (
                  <TouchableOpacity onPress={doLogin} style={styles.watchBtn}>
                    <FontAwesome5 name="play" color={'#f6eff0'} size={20} />
                    <Text
                      style={{
                        color: '#f6eff0',
                        fontSize: 20,
                        fontFamily: 'Roboto-Bold',
                        marginLeft: 10,
                      }}>
                      Rent Now
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={{marginTop: 10}}>
                <Text
                  style={{
                    color: '#b5b5b5',
                    fontSize: 16,
                    fontFamily: 'Roboto-Regular',
                    marginVertical: 4,
                  }}>
                  Synopsis:
                </Text>
                <Text style={{color: '#5b5b5b', fontSize: 15, lineHeight: 20}}>
                  {contentDetails?.description?.replace(
                    /(<p[^>]+?>|<p>|<\/p>)/gim,
                    '',
                  )}
                </Text>
              </View>
            </View>
            <TabView
              style={{height: 650}}
              swipeEnabled={false}
              navigationState={{index, routes}}
              renderScene={renderScene}
              renderTabBar={renderTabBar}
              onIndexChange={setIndex}
              initialLayout={{width: layout.width}}
              pid={props.route.params}
            />
            {/* <View style={{ backgroundColor: '#88888a', height: 0.4, marginVertical: 8, marginHorizontal: 10 }}></View>
              <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', justifyContent: 'center', marginVertical: 15, marginBottom: 50 }}>
                <Text style={{ color: '#4e4e4f', fontSize: 12, fontWeight: '800', marginRight: 10 }}>Rate us</Text>
                <Text style={{ color: '#4e4e4f', fontSize: 12, fontWeight: '800', marginRight: 10 }}>|</Text>
                <Text style={{ color: '#4e4e4f', fontSize: 12, fontWeight: '800', marginRight: 10 }}>Privacy Policy</Text>
                <Text style={{ color: '#4e4e4f', fontSize: 12, fontWeight: '800', marginRight: 10 }}>|</Text>
                <Text style={{ color: '#4e4e4f', fontSize: 12, fontWeight: '800', marginRight: 10 }}>Terms & Condition</Text>
              </View> */}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
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
    resizeMode: 'contain',
    borderRadius: 8,
  },
  price: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  offerPrice: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
});

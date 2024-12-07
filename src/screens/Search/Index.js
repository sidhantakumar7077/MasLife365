import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  TouchableHighlight,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {STORE_ID, CallApi} from '../../component/CallApi/index';
// import CardView from 'react-native-cardview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Index = props => {
  const [textData, setTextData] = useState('');
  const [contents, setContents] = useState([]);

  const searchResult = text => {
    setTextData(text);
    console.log('Search Text', text);
    try {
      CallApi('GET', `/api/search?q=${text}`).then(res => {
        setContents(res.contents);
        console.log('sidhanta', res.contents);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const allSearch = [
    {
      img: 'https://m.media-amazon.com/images/M/MV5BYjFlMGQ2OTgtZjllZC00NzJhLWFlMjctZmI4NDg2MGEzOWJiXkEyXkFqcGdeQXVyMjMyNjcxMTg@._V1_.jpg',
      name: 'Caster',
    },
    {
      img: 'https://cdn.shopify.com/s/files/1/0969/9128/products/Rambo_-_Last_Blood_-_Sylvester_Sallone_-_Hollywood_English_Action_Movie_Poster_94bea82e-fd44-416c-ac70-3f487e9c565d.jpg?v=1577449097',
      name: 'Rambo',
    },
    {
      img: 'https://media.comicbook.com/2017/10/iron-man-movie-poster-marvel-cinematic-universe-1038878.jpg',
      name: 'Iron Man',
    },
    {
      img: 'https://marketplace.canva.com/EAFVCFkAg3w/1/0/1131w/canva-red-and-black-horror-movie-poster-AOBSIAmLWOs.jpg',
      name: 'Dark',
    },
    {
      img: 'https://m.media-amazon.com/images/M/MV5BYjFlMGQ2OTgtZjllZC00NzJhLWFlMjctZmI4NDg2MGEzOWJiXkEyXkFqcGdeQXVyMjMyNjcxMTg@._V1_.jpg',
      name: 'Caster',
    },
    {
      img: 'https://cdn.shopify.com/s/files/1/0969/9128/products/Rambo_-_Last_Blood_-_Sylvester_Sallone_-_Hollywood_English_Action_Movie_Poster_94bea82e-fd44-416c-ac70-3f487e9c565d.jpg?v=1577449097',
      name: 'Rambo',
    },
    {
      img: 'https://media.comicbook.com/2017/10/iron-man-movie-poster-marvel-cinematic-universe-1038878.jpg',
      name: 'Iron Man',
    },
    {
      img: 'https://marketplace.canva.com/EAFVCFkAg3w/1/0/1131w/canva-red-and-black-horror-movie-poster-AOBSIAmLWOs.jpg',
      name: 'Dark',
    },
  ];

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
          height: 0.3,
          width: '90%',
          alignSelf: 'center',
        }}></View>
      <View style={{width: '90%', alignSelf: 'center', marginTop: 10}}>
        <View style={styles.cardStyle}>
          <TextInput
            style={styles.inputs}
            // onChangeText={setTextData}
            onChangeText={text => searchResult(text)}
            value={textData}
            type="text"
            placeholder="Search"
            placeholderTextColor="#888888"
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity
            style={{
              height: 40,
              alignSelf: 'center',
              width: 40,
              borderRadius: 30,
              justifyContent: 'center',
            }}>
            <FontAwesome
              style={{alignSelf: 'center'}}
              name="microphone"
              size={23}
              color={'#bbbaba'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{width: '93%', alignSelf: 'center', marginTop: 10}}>
        <Text
          style={{
            color: '#fff',
            fontSize: 16,
            fontFamily: 'Roboto-Regular',
            marginBottom: 8,
          }}>
          Search results...
        </Text>
        {contents.length > 0 ? (
          <ScrollView style={{}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={contents}
              numColumns={3}
              keyExtractor={key => {
                return key.id;
              }}
              renderItem={content => {
                return (
                  <View
                    style={{
                      marginVertical: 5,
                      width: '33%',
                      marginHorizontal: 3,
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate(
                          'Content_details_2',
                          content.item.id,
                        )
                      }
                      style={{height: 150, width: '100%'}}>
                      <Image
                        style={{flex: 1, borderRadius: 10}}
                        source={{
                          uri:
                            content.item.poster_path +
                            '/' +
                            content.item.poster,
                        }}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: '#878686',
                        fontFamily: 'Roboto-Regular',
                        fontSize: 14,
                        marginTop: 5,
                        marginLeft: 8,
                        marginBottom: 10,
                      }}>
                      {content.item.name}
                    </Text>
                  </View>
                );
              }}
            />
          </ScrollView>
        ) : (
          <View
            style={{
              width: '93%',
              marginTop: 10,
              alignItems: 'center',
              top: '180%',
            }}>
            <MaterialCommunityIcons
              name="file-search-outline"
              size={50}
              color={'#878686'}
            />
            <Text
              style={{
                color: '#878686',
                fontFamily: 'Roboto-Regular',
                fontSize: 20,
              }}>
              Result Not Found
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1f1e',
  },
  cardStyle: {
    backgroundColor: '#373739',
    width: '100%',
    marginVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderColor: '#88888a',
    borderWidth: 0.3,
    borderRadius: 25,
  },
  inputs: {
    height: 55,
    width: '85%',
    alignSelf: 'center',
    marginLeft: 10,
    color: '#888888',
  },
});

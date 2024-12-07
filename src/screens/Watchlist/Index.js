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
} from 'react-native';
import React from 'react';
import Header from '../../component/Header/Index';
import {FlatListSlider} from 'react-native-flatlist-slider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import bgImage from '../../assets/BgImage/bg2.jpg';

const Index = props => {
  const freeWatch = [
    {
      image:
        'https://images.newindianexpress.com/uploads/user/ckeditor_images/article/2019/11/15/Smalla.jpg',
      titel: 'WATCH FREE',
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMio-yQnspQ9rXKHjlkg2zDuCk9V6XhgKugw&usqp=CAU',
      titel: 'WATCH FREE',
    },
    {
      image:
        'https://cdn.shopify.com/s/files/1/1416/8662/products/941_1979_french_small_original_film_art_a_f48f3e4a-d4d1-4470-983b-5ed22759ac9b_1600x.jpg?v=1562541124',
      titel: 'WATCH FREE',
    },
    {
      image:
        'https://cdn.cinematerial.com/p/297x/fsdeklin/small-soldiers-movie-poster-md.jpg?v=1456763721',
      titel: 'WATCH FREE',
    },
    {
      image: 'https://m.media-amazon.com/images/I/71kfD5xA5bL.jpg',
      titel: 'WATCH FREE',
    },
  ];

  const recommended = [
    {
      image:
        'https://cdn.shopify.com/s/files/1/0969/9128/products/Prometheus_-_Hollywood_Sci_Fi_Movie_Poster_Collection_SMALL_ONLY_94f2343b-a716-47c8-bb40-0dcd21fd75f6.jpg?v=1570155747',
      name: 'Prometheus',
    },
    {
      image:
        'https://m.media-amazon.com/images/I/81W0gdYtTgS._AC_UF894,1000_QL80_.jpg',
      name: 'Prometheus',
    },
    {
      image:
        'https://cdn.shopify.com/s/files/1/0969/9128/products/Prometheus_-_Hollywood_Sci_Fi_Movie_Poster_Collection_SMALL_ONLY_94f2343b-a716-47c8-bb40-0dcd21fd75f6.jpg?v=1570155747',
      name: 'Love',
    },
    {
      image: 'https://m.media-amazon.com/images/I/71xa2VEVoTL.jpg',
      name: 'Once Upon A Time In Hollywood',
    },
    {
      image:
        'https://rukminim1.flixcart.com/image/850/1000/jf8khow0/poster/a/u/h/small-hollywood-movie-poster-blade-runner-2049-ridley-scott-original-imaf3qvx88xenydd.jpeg?q=90',
      name: 'Blade Runner 2045',
    },
    {
      image:
        'https://cdn.shopify.com/s/files/1/0969/9128/products/Jaws-StevenSpielberg-HollywoodClassicActionMovieOriginalReleasePoster_ee9ea38f-b1ae-440e-b7eb-943f6120521e.jpg?v=1678668702',
      name: 'JAWS',
    },
    {
      image: 'https://m.media-amazon.com/images/I/91Ndgne-T1L.jpg',
      name: 'The Heart Of Summer',
    },
    {
      image:
        'https://m.media-amazon.com/images/I/71X32U+goqL._AC_UF1000,1000_QL80_.jpg',
      name: '1917',
    },
    {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/5/51/This_Gun_for_Hire_%281942%29_poster.jpg',
      name: 'This Gun For Hire',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topPart}>
        <Header navigation={props.navigation} />
        <Text
          style={{
            color: '#fff',
            fontSize: 9,
            alignSelf: 'center',
            marginVertical: 5,
          }}>
          HOME MASLIFE365+ ESCAPE TRAVELS LOVE+FAMILY STYLE+BEAUTY ENTERTAINMENT
        </Text>
      </View>
      <ScrollView style={styles.btmPart}>
        <ImageBackground style={{flex: 1}} source={bgImage}>
          <View style={{marginHorizontal: 16, marginTop: 10, height: 170}}>
            <Text style={{color: '#fff', fontSize: 17, fontWeight: '600'}}>
              MOVIE EXTRAS
            </Text>
            <View style={{width: '100%', height: '80%', marginTop: 5}}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={freeWatch}
                horizontal
                keyExtractor={key => {
                  return key.id;
                }}
                renderItem={element => {
                  return (
                    <View
                      style={{
                        width: 100,
                        height: '90%',
                        backgroundColor: '#fff',
                        marginRight: 7,
                        alignSelf: 'center',
                      }}>
                      <TouchableOpacity style={{flex: 1}}>
                        <ImageBackground
                          style={{flex: 1, paddingLeft: 5}}
                          source={{uri: element.item.image}}>
                          <View
                            style={{
                              backgroundColor: 'red',
                              alignItems: 'center',
                              width: 62,
                              borderRadius: 3,
                              top: '80%',
                            }}>
                            <Text
                              style={{
                                color: '#fff',
                                fontWeight: '700',
                                fontSize: 9,
                              }}>
                              {element.item.titel}
                            </Text>
                          </View>
                        </ImageBackground>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
            <View style={{alignItems: 'flex-end', height: '15%'}}>
              <TouchableOpacity>
                <FontAwesome5
                  name="angle-double-right"
                  color={'#fff'}
                  size={24}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{margin: 16, flex: 1}}>
            <Text style={{color: '#fff', fontSize: 17, fontWeight: '600'}}>
              YOU MAY ALSO LIKE
            </Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{marginTop: 5, flex: 1}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={recommended}
                numColumns={3}
                keyExtractor={key => {
                  return key.id;
                }}
                renderItem={content => {
                  return (
                    <View
                      style={{
                        marginRight: 5,
                        marginVertical: 2,
                        width: '32.3%',
                      }}>
                      <TouchableOpacity style={{height: 150, width: '100%'}}>
                        <Image
                          style={{flex: 1}}
                          source={{uri: content.item.image}}
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: '600',
                          fontSize: 13,
                        }}>
                        The Heart Of Summer
                      </Text>
                      <View
                        style={{
                          alignSelf: 'flex-end',
                          backgroundColor: '#000',
                          borderRadius: 4,
                          paddingHorizontal: 2,
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontWeight: '600',
                            fontSize: 11,
                          }}>
                          PG-12
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: '200',
                          fontSize: 11,
                        }}>
                        (2009) 1hr 51min
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: '200',
                          fontSize: 11,
                        }}>
                        Romance, Drama
                      </Text>
                    </View>
                  );
                }}
              />
            </ScrollView>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topPart: {
    // height: '25%',
    backgroundColor: 'black',
  },
  btmPart: {
    // height: '75%',
    backgroundColor: '#c70e17',
  },
});

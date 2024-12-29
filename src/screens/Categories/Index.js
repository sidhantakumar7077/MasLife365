import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, FlatList, TouchableHighlight } from 'react-native';
import React, { useEffect, useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Spinner from 'react-native-loading-spinner-overlay';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { STORE_ID, CallApi } from '../../component/CallApi/index';

const Index = props => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [category, setCategory] = useState([]);
  const [spinner, setSpinner] = useState(false);

  const getCategory = async () => {
    try {
      setSpinner(true);
      CallApi('GET', '/api/getCategoryWithContent/' + STORE_ID).then(res => {
        setSpinner(false);
        setCategory(res.sections);
        // console.log("All Category---------", res.sections[0].category);
      });
    } catch (error) {
      setSpinner(false);
      // console.log(error);
    }
  };
  
  useEffect(() => {
    if (isFocused) {
      getCategory();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ width: '90%', alignSelf: 'center' }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ marginVertical: 7, marginTop: 18, flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center' }}>
            <FontAwesome name="angle-left" color={'#b6b6b6'} size={28} />
            <Text style={{ color: '#b6b6b6', fontSize: 18, marginLeft: 10 }}>Back</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: '#88888a',
            height: 0.3,
            width: '90%',
            alignSelf: 'center',
          }}></View>
        <View style={{ margin: 15, flex: 1, width: '90%', alignSelf: 'center' }}>
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
            data={category}
            keyExtractor={key => {
              return key.id;
            }}
            renderItem={element => {
              return (
                <View style={{ flex: 1 }}>
                  {element.item.contents.length > 0 && (
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginBottom: 6,
                        }}>
                        <View style={{ flexDirection: 'row' }}>
                          <Text
                            style={{
                              color: '#d1d1d1',
                              fontSize: 16,
                              fontFamily: 'Roboto-Regular',
                            }}>
                            {element.item.category.name}
                          </Text>
                          <Entypo
                            style={{ marginTop: 2 }}
                            name="chevron-right"
                            color={'red'}
                            size={20}
                          />
                        </View>
                        <TouchableOpacity onPress={() => props.navigation.navigate('AllContentByCategory', element.item.category.id)}>
                          <Text style={{ color: '#565657', fontSize: 16, fontFamily: 'Roboto-Regular', }}> View all </Text>
                        </TouchableOpacity>
                      </View>
                      <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={element.item.contents}
                        horizontal
                        keyExtractor={key => {
                          return key.id;
                        }}
                        renderItem={content => {
                          return (
                            <View style={{ marginRight: 7, marginVertical: 5, width: 115, marginBottom: 25 }}>
                              <TouchableHighlight onPress={() => props.navigation.navigate('Content_details_2', content.item.id)} style={{ height: 170, width: '100%' }}>
                                {content.item.vertical_poster_path ?
                                  <Image style={styles.smallContent} source={{ uri: content.item.vertical_poster_path + '/' + content.item.vertical_poster }} />
                                  :
                                  <Image style={styles.smallContent} source={require('../../assets/Images/no_img.jpg')} />
                                }
                              </TouchableHighlight>
                              {/* <Text style={{ color: '#878686', fontFamily: 'Roboto-Regular', fontSize: 14, marginTop: 5, marginLeft: 8 }}>{content.item.name}</Text> */}
                            </View>
                          );
                        }}
                      />
                    </View>
                  )}
                </View>
              );
            }}
          />
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
  },
  smallContent: {
    // flex: 1,
    width: '100%',
    height: '100%',
    // resizeMode: 'contain',
    borderRadius: 8,
  },
});

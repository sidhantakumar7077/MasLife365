import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { STORE_ID, CallApi } from '../../component/CallApi/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';

const Index = (props) => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [allOrder, setAllOrder] = useState([]);
  const [spinner, setSpinner] = useState(false);

  const getAllOrder = async () => {
    var userlogin = await AsyncStorage.getItem('user_details');
    userlogin = JSON.parse(userlogin);
    try {
      setSpinner(true);
      CallApi(
        'GET',
        '/api/allOrder',
      ).then(res => {
        setSpinner(false);
        setAllOrder(res);
        // console.log('All Order---------', res[0]);
      });
    } catch (error) {
      setSpinner(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getAllOrder();
    }
  }, [isFocused])

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: '90%', alignSelf: 'center' }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: '25%', marginVertical: 7, marginTop: 18, flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center' }}>
          <FontAwesome name="angle-left" color={'#b6b6b6'} size={28} />
          <Text style={{ color: '#b6b6b6', fontSize: 18, marginLeft: 10 }}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: '#88888a', height: 0.3, width: '90%', alignSelf: 'center' }}></View>
      <View style={{ width: '90%', alignSelf: 'center', marginTop: 10 }}>
        <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'Roboto-Regular' }}>Your Order History</Text>
      </View>
      {spinner === true ?
        <Spinner
          visible={spinner}
          animation="slide"
          color="#e00024"
          overlayColor="rgba(0, 0, 0, 0.25)"
          textContent={'Loading...'}
          textStyle={{ color: '#e00024' }}
        />
        :
        <View style={{ marginTop: 10, flex: 1 }}>
          {allOrder.length > 0 ?
            <FlatList
              data={allOrder}
              keyExtractor={(key) => {
                return key.id
              }}
              renderItem={({ item }) => {
                return (
                  <View style={{ backgroundColor: '#222224', width: '88%', height: 220, justifyContent: 'center', alignItems: 'center', borderRadius: 8, alignSelf: 'center', marginVertical: 8 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={{ width: '35%', height: 150, alignItems: 'center', justifyContent: 'center' }}>
                        {item?.order_items[0]?.last_content?.vertical_poster_path ?
                        <Image style={{ width: '90%', height: '100%', borderRadius: 10, resizeMode: 'cover', alignSelf: 'flex-start' }} source={{ uri: item?.order_items[0]?.last_content?.vertical_poster_path + "/" + item?.order_items[0]?.last_content?.vertical_poster }} />
                        :
                        <Image style={{ width: '90%', height: '100%', borderRadius: 10, resizeMode: 'cover', alignSelf: 'flex-start' }} source={require('../../assets/Images/no_img.jpg')} />
                        }
                      </View>
                      <View style={{ width: '60%' }}>
                        <Text style={{ color: '#bbbaba', fontSize: 17, fontFamily: 'Roboto-Regular' }}>Order ID: {item.order_id}</Text>
                        <View style={{ backgroundColor: '#88888a', height: 0.3, width: '100%', alignSelf: 'center', marginTop: 15, marginBottom: 10 }}></View>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                          <View style={{ width: '50%' }}>
                            <Text style={{ color: '#949494', fontSize: 14, fontFamily: 'Roboto-Regular' }}>Date Ordered: </Text>
                          </View>
                          <View style={{ width: '50%' }}>
                            <Text style={{ color: '#949494', fontSize: 14, fontFamily: 'Roboto-Regular' }}>{moment(item.created_at).format('MMM. D. YY h.mma').toLowerCase()}</Text>
                          </View>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                          <View style={{ width: '50%' }}>
                            <Text style={{ color: '#949494', fontSize: 14, fontFamily: 'Roboto-Regular' }}>Total Items: </Text>
                          </View>
                          <View style={{ width: '50%' }}>
                            <Text style={{ color: '#949494', fontSize: 14, fontFamily: 'Roboto-Regular' }}>{item.order_items.length}</Text>
                          </View>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                          <View style={{ width: '50%' }}>
                            <Text style={{ color: '#949494', fontSize: 14, fontFamily: 'Roboto-Regular' }}>Total Amount: </Text>
                          </View>
                          <View style={{ width: '50%' }}>
                            <Text style={{ color: '#949494', fontSize: 14, fontFamily: 'Roboto-Regular' }}>${((item.total) / 100).toFixed(2)}</Text>
                          </View>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                          <View style={{ width: '50%' }}>
                            <Text style={{ color: '#949494', fontSize: 14, fontFamily: 'Roboto-Regular' }}>Order Status: </Text>
                          </View>
                          <View style={{ width: '50%' }}>
                            <Text style={{ color: '#949494', fontSize: 14, fontFamily: 'Roboto-Regular' }}>{item.order_status}</Text>
                          </View>
                        </View>
                        <TouchableOpacity onPress={() => props.navigation.navigate('OrderDetails', item.id)} style={styles.viewDetailsBtm}>
                          <Text style={{ color: '#bbbaba', fontSize: 14, fontFamily: 'Roboto-Regular' }}>View Details</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )
              }}
            />
            :
            <View style={{ flex: 1, alignItems: 'center', top: '40%' }}>
              <Text style={{ color: '#b6b6b6', fontSize: 16, fontWeight: '500' }}>Your Order History is empty</Text>
            </View>
          }
        </View>
      }
    </SafeAreaView>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141416',
  },
  viewDetailsBtm: {
    borderColor: '#88888a',
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 15,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20
  }
})
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, FlatList, ScrollView, Modal, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { STORE_ID, CallApi } from '../../component/CallApi/index';
import Spinner from 'react-native-loading-spinner-overlay';

const Index = (props) => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [allCart, setAllCart] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [userId, setUserId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteID, setDeleteID] = useState('');

  const handleDelete = (id) => {
    // console.log("Cart ID", id);
    setDeleteID(id);
    setModalVisible(true);
  };

  const confirmDelete = () => {
    // console.log("Cart ID", deleteID);
    // return;
    try {
      CallApi('POST', `/api/delete-carts/${deleteID}`).then(
        response => {
          if (response.success === true) {
            console.log('Remove to Cart', response);
            setModalVisible(false);
            const updatedCart = allCart.filter(cartItem => cartItem.id !== deleteID);
            setAllCart(updatedCart);
          } else {
            console.log('Remove to Cart Error', response);
          }
        },
      );
    } catch (error) {
      console.log(error);
    }
  }

  const renderModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: '#494a49', borderRadius: 20, width: '80%', paddingHorizontal: 20, paddingTop: 30, paddingBottom: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#fff' }}>Confirm Deletion</Text>
          <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 30, color: '#fff' }}>Are you sure you want to remove this content?</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={confirmDelete} style={{ backgroundColor: '#e00024', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, marginRight: 10 }}>
              <Text style={{ color: '#fff', fontSize: 16 }}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ backgroundColor: '#808080', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 }}>
              <Text style={{ color: '#fff', fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>

  );

  const get_allCart = async () => {
    var ud_json = await AsyncStorage.getItem('user_details');
    const user_detail = JSON.parse(ud_json);
    setUserId(user_detail.user.id);
    try {
      setSpinner(true);
      CallApi('GET', '/api/carts').then(res => {
        if (res.status === "success") {
          // console.log('All Cart-=-=-=', res.cart);
          setAllCart(res.cart);
          setSpinner(false);
        } else {
          setSpinner(false);
          setAllCart([]);
          console.log('All Cart Error-=-=-=', res);
        }
      });
    } catch (error) {
      console.log('error', error);
      setAllCart([]);
      setSpinner(false);
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    allCart.forEach(item => {
      const { ppv_price, has_offer, offer_price } = item.content;
      const price = has_offer === "yes" ? parseFloat(offer_price) : parseFloat(ppv_price);
      totalPrice += price;
    });
    return totalPrice.toFixed(2);
  }

  const contentDetails = {
    price: calculateTotalPrice(),
    name: allCart.length > 1
      ? `${allCart[0].content.name} + ${allCart.length - 1}`
      : allCart.length === 1
        ? allCart[0].content.name
        : "No content"
  };

  const handlePayment = () => {
    // console.log("Total Price", calculateTotalPrice());
    navigation.navigate('Payment', contentDetails);
  }

  useEffect(() => {
    if (isFocused) {
      get_allCart();
    }
  }, [isFocused])

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: '90%', alignSelf: 'center', }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: '15%', marginVertical: 7, marginTop: 18, flexDirection: 'row', alignSelf: "flex-start", alignItems: 'center' }}>
          <FontAwesome name="angle-left" color={'#b6b6b6'} size={28} />
          <Text style={{ color: '#b6b6b6', fontSize: 18, marginLeft: 10 }}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: '#88888a', height: 0.3, width: '90%', alignSelf: 'center' }}></View>
      <View style={{ width: '90%', alignSelf: 'center', marginTop: 10 }}>
        <Text style={{ color: '#b1b1b1', fontSize: 18, fontFamily: 'Roboto-Regular' }}>Cart</Text>
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
          {allCart.length > 0 ?
            <FlatList
              style={{ marginBottom: 70 }}
              data={allCart}
              keyExtractor={(key) => {
                return key.id
              }}
              renderItem={({ item }) => {
                return (
                  <View style={{ backgroundColor: '#222224', width: '88%', height: 170, justifyContent: 'center', alignItems: 'center', borderRadius: 8, alignSelf: 'center', marginVertical: 8 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={{ width: '35%', height: 130, alignItems: 'center', justifyContent: 'center' }}>
                        <Image style={{ width: '80%', height: '100%', borderRadius: 10, resizeMode: 'cover', alignSelf: 'flex-start' }} source={{ uri: item.content.poster_path + "/" + item.content.poster }} />
                        <AntDesign style={{ zIndex: 1, position: 'absolute', paddingRight: '15%' }} name="playcircleo" color={'#fff'} size={30} />
                      </View>
                      <View style={{ width: '60%' }}>
                        <Text style={{ color: '#bbbaba', fontSize: 17, fontFamily: 'Roboto-Regular' }}>{item.content.name}</Text>
                        <View style={{ backgroundColor: '#88888a', height: 0.3, width: '100%', alignSelf: 'center', marginTop: 15, marginBottom: 10 }}></View>
                        {/* <Text style={{ color: '#949494', fontSize: 14, fontFamily: 'Roboto-Regular' }}>{item.Streamed}</Text> */}
                        <Text style={{ color: '#bbbaba', fontSize: 16, fontFamily: 'Roboto-Regular' }}>Rental Cost:${item.content.has_offer === "yes" ? item.content.offer_price : item.content.ppv_price}</Text>
                        {item.content.ppv_duration &&
                          <Text style={{ color: '#949494', fontSize: 14, fontFamily: 'Roboto-Regular' }}>{item.content.ppv_duration} Streaming Period</Text>
                        }
                      </View>
                    </View>
                    <TouchableOpacity onPress={() => handleDelete(item.id)} style={{ alignSelf: 'flex-end', marginRight: 15 }}>
                      <AntDesign name="delete" color={'#88888a'} size={16} />
                    </TouchableOpacity>
                  </View>
                )
              }}
            />
            :
            <View style={{ flex: 1, alignItems: 'center', top: '40%' }}>
              <Text style={{ color: '#b6b6b6', fontSize: 16, fontWeight: '500' }}>Your cart is empty</Text>
            </View>
          }
        </View>
      }
      {modalVisible && renderModal()}
      {allCart.length > 0 &&
        <TouchableOpacity onPress={() => handlePayment()} style={styles.fixedBtm}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '50%' }}>
            <Feather name="shopping-bag" color={'#fff'} size={30} />
            <View style={{ backgroundColor: '#fff', height: 30, width: 0.6, marginHorizontal: 6 }}></View>
            <View>
              <Text style={{ color: 'rgba(255,255,255,.5)', fontSize: 14 }}>{allCart.length} ITEM</Text>
              <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>${calculateTotalPrice()}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 17, fontWeight: 'bold', marginRight: 5 }}>PAY</Text>
            <Feather name="chevron-right" color={'#fff'} size={24} />
          </View>
        </TouchableOpacity>
      }
    </SafeAreaView>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141416'
  },
  fixedBtm: {
    backgroundColor: '#e00024',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5
  },
})
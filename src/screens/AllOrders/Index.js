import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { CallApi } from '../../component/CallApi/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const Index = (props) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [allOrder, setAllOrder] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Fetch Orders
  const getAllOrder = async (pageNumber = 1, loadMore = false) => {
    try {
      if (pageNumber === 1) {
        setSpinner(true);
      } else {
        setLoadingMore(true);
      }

      const res = await CallApi('GET', `/api/v2/allOrder?page=${pageNumber}`);

      if (res.data.length > 0) {
        setAllOrder(prevOrders => (loadMore ? [...prevOrders, ...res.data] : res.data));
        setPage(pageNumber);
      } else {
        setHasMore(false);
      }

      setSpinner(false);
      setLoadingMore(false);
    } catch (error) {
      setSpinner(false);
      setLoadingMore(false);
      console.log('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getAllOrder(1);
    }
  }, [isFocused]);

  // Load More Data when Scrolled to End
  const loadMoreOrders = () => {
    if (!loadingMore && hasMore) {
      getAllOrder(page + 1, true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: '90%', alignSelf: 'center' }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="angle-left" color={'#b6b6b6'} size={28} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator}></View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Your Order History</Text>
      </View>

      {spinner ? (
        <ActivityIndicator size="large" color="#e00024" style={{ marginTop: 20 }} />
      ) : (
        <View style={{ marginTop: 10, flex: 1 }}>
          {allOrder.length > 0 ? (
            <FlatList
              data={allOrder}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.orderCard}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* Image */}
                    <View style={styles.imageContainer}>
                      {item?.order_items[0]?.last_content?.vertical_poster_path ? (
                        <Image
                          style={styles.orderImage}
                          source={{ uri: item?.order_items[0]?.last_content?.vertical_poster_path + "/" + item?.order_items[0]?.last_content?.vertical_poster }}
                        />
                      ) : (
                        <Image style={styles.orderImage} source={require('../../assets/Images/no_img.jpg')} />
                      )}
                    </View>

                    {/* Order Details */}
                    <View style={{ width: '60%' }}>
                      <Text style={styles.orderId}>Order ID: {item.order_id}</Text>
                      <View style={styles.separator}></View>

                      <View style={styles.orderInfoRow}>
                        <Text style={styles.orderInfoLabel}>Date Ordered:</Text>
                        <Text style={styles.orderInfoValue}>{moment(item.created_at).format('MMM. D. YY h.mma').toLowerCase()}</Text>
                      </View>

                      <View style={styles.orderInfoRow}>
                        <Text style={styles.orderInfoLabel}>Total Items:</Text>
                        <Text style={styles.orderInfoValue}>{item.order_items.length}</Text>
                      </View>

                      <View style={styles.orderInfoRow}>
                        <Text style={styles.orderInfoLabel}>Total Amount:</Text>
                        <Text style={styles.orderInfoValue}>${((item.total) / 100).toFixed(2)}</Text>
                      </View>

                      <View style={styles.orderInfoRow}>
                        <Text style={styles.orderInfoLabel}>Order Status:</Text>
                        <Text style={styles.orderInfoValue}>{item.order_status}</Text>
                      </View>

                      <TouchableOpacity onPress={() => props.navigation.navigate('OrderDetails', item.id)} style={styles.viewDetailsBtm}>
                        <Text style={styles.viewDetailsText}>View Details</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
              onEndReached={loadMoreOrders}
              onEndReachedThreshold={0.5}
              ListFooterComponent={() => (loadingMore ? <ActivityIndicator size="large" color="#e00024" style={{marginBottom: 10}} /> : null)}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Your Order History is empty</Text>
            </View>
          )}
        </View>
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
  backButton: {
    width: '25%',
    marginVertical: 7,
    marginTop: 18,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  backText: {
    color: '#b6b6b6',
    fontSize: 18,
    marginLeft: 10,
  },
  separator: {
    backgroundColor: '#88888a',
    height: 0.3,
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  titleContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
  },
  orderCard: {
    backgroundColor: '#222224',
    width: '88%',
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    alignSelf: 'center',
    marginVertical: 8,
  },
  imageContainer: {
    width: '35%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderImage: {
    width: '90%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  orderId: {
    color: '#bbbaba',
    fontSize: 17,
    fontFamily: 'Roboto-Regular',
  },
  orderInfoRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  orderInfoLabel: {
    color: '#949494',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    width: '50%',
  },
  orderInfoValue: {
    color: '#949494',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    width: '50%',
  },
  viewDetailsBtm: {
    borderColor: '#88888a',
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 15,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  viewDetailsText: {
    color: '#bbbaba',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    top: '40%',
  },
  emptyText: {
    color: '#b6b6b6',
    fontSize: 16,
    fontWeight: '500',
  },
});

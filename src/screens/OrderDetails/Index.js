import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
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
    const [orderDetails, setOrderDetails] = useState([]);
    const [spinner, setSpinner] = useState(false);

    const getOrderDetails = async () => {
        var userlogin = await AsyncStorage.getItem('user_details');
        userlogin = JSON.parse(userlogin);
        try {
            setSpinner(true);
            CallApi(
                'GET',
                '/api/view-order/' + props.route.params,
            ).then(res => {
                setSpinner(false);
                setOrderDetails(res);
                // console.log('Order Details---------', res.order_items[0].content);
            });
        } catch (error) {
            setSpinner(false);
            console.log(error);
        }
    };

    useEffect(() => {
        // console.log('Content ID', props.route.params);
        getOrderDetails();
    }, []);

    const goToContentPage = (content_id) => {
        console.log("content_id", content_id.toString());
        // return;
        navigation.navigate('Content_details_2', content_id.toString());
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: '90%', alignSelf: 'center' }}>
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: '15%', marginVertical: 7, marginTop: 18, flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center' }}>
                    <FontAwesome name="angle-left" color={'#b6b6b6'} size={28} />
                    <Text style={{ color: '#b6b6b6', fontSize: 18, marginLeft: 10 }}>Back</Text>
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: '#88888a', height: 0.3, width: '90%', alignSelf: 'center' }}></View>
            <View style={{ width: '90%', alignSelf: 'center', marginTop: 10 }}>
                <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'Roboto-Regular' }}>Order ID: {orderDetails.order_id}</Text>
            </View>
            <View style={{ marginTop: 10, flex: 1 }}>
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
                    <FlatList
                        data={orderDetails.order_items}
                        keyExtractor={(key) => {
                            return key.id
                        }}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ backgroundColor: '#222224', width: '88%', justifyContent: 'center', alignItems: 'center', borderRadius: 8, alignSelf: 'center', marginVertical: 8 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => goToContentPage(item.content_id)} style={{ width: '35%', height: item?.content?.parent_content === null ? 130 : 140, alignItems: 'center', justifyContent: 'center' }}>
                                            {item?.content?.vertical_poster_path ?
                                                <Image style={{ width: '80%', height: '100%', borderRadius: 10, resizeMode: 'cover', alignSelf: 'flex-start' }} source={{ uri: item?.content?.vertical_poster_path + "/" + item?.content?.vertical_poster }} />
                                                :
                                                <Image style={{ width: '80%', height: '100%', borderRadius: 10, resizeMode: 'cover', alignSelf: 'flex-start' }} source={require('../../assets/Images/no_img.jpg')} />
                                            }
                                            <AntDesign style={{ zIndex: 1, position: 'absolute', paddingRight: '15%' }} name="playcircleo" color={'#fff'} size={30} />
                                        </TouchableOpacity>
                                        <View style={{ width: '60%', paddingVertical: 5 }}>
                                            {item?.content?.parent_content === null ?
                                                <Text style={{ color: '#bbbaba', fontSize: 16, fontFamily: 'Roboto-Regular' }}>{item?.content?.name}</Text>
                                                :
                                                <View style={{ flex: 1 }}>
                                                    <Text style={{ color: '#bbbaba', fontSize: 16, fontFamily: 'Roboto-Regular' }}>{item?.content?.parent_content?.name}</Text>
                                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
                                                        <Text style={{ color: '#949494', fontSize: 14, fontFamily: 'Roboto-Regular' }}>{item.content.season.name}</Text>
                                                        <View style={{ backgroundColor: '#88888a', width: 0.8, height: 18, marginHorizontal: 8 }} />
                                                        <Text style={{ color: '#949494', fontSize: 14, fontFamily: 'Roboto-Regular' }}>Episode: {item.content.episode_no}</Text>
                                                    </View>
                                                    <Text style={{ color: '#bbbaba', fontSize: 14, fontFamily: 'Roboto-Regular' }}>{item.content.name}</Text>
                                                </View>
                                            }
                                            <View style={{ backgroundColor: '#88888a', height: 0.3, width: '100%', alignSelf: 'center', marginTop: 13, marginBottom: 10 }}></View>
                                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ width: '50%' }}>
                                                    <Text style={{ color: '#949494', fontSize: 14, fontFamily: 'Roboto-Regular' }}>Rental Cost: </Text>
                                                </View>
                                                <View style={{ width: '50%' }}>
                                                    <Text style={{ color: '#949494', fontSize: 14, fontFamily: 'Roboto-Regular' }}>${item.content_price}</Text>
                                                </View>
                                            </View>
                                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ width: '50%' }}>
                                                    <Text style={{ color: '#949494', fontSize: 14, fontFamily: 'Roboto-Regular' }}>Streaming Period: </Text>
                                                </View>
                                                <View style={{ width: '50%' }}>
                                                    <Text style={{ color: '#949494', fontSize: 14, fontFamily: 'Roboto-Regular' }}>{item.content.ppv_duration}</Text>
                                                </View>
                                            </View>
                                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ width: '50%' }}>
                                                    <Text style={{ color: '#949494', fontSize: 14, fontFamily: 'Roboto-Regular' }}>Active Until: </Text>
                                                </View>
                                                <View style={{ width: '50%' }}>
                                                    <Text style={{ color: '#949494', fontSize: 14, fontFamily: 'Roboto-Regular' }}>{moment(item.content_valid_till).format('MMM. D. YY h.mma').toLowerCase()}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        }}
                    />
                }
            </View>
        </SafeAreaView>
    )
}

export default Index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141416',
    },
})
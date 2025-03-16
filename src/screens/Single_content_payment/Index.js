import { SafeAreaView, StyleSheet, Text, TouchableOpacity, TextInput, View, Switch, ScrollView, Alert, Modal, Animated, Easing, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import CardView from 'react-native-cardview';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CallApi, CallApiPost, STORE_ID } from '../../component/CallApi/index';

const Index = props => {

    const navigation = useNavigation()
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [cardHolderName, setCardHolderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiration, setExpiration] = useState("");
    const [cvvCode, setCvvCode] = useState('');
    // const [promoCode, setPromoCode] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [orderModalVisible, setOrderModalVisible] = useState(false);
    const closeOrderModal = () => { setOrderModalVisible(false) };
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const [isLoading, setIsLoading] = useState(false);

    const handleExpirationChange = (text) => {
        // Remove any non-numeric characters
        let cleaned = text.replace(/[^0-9]/g, '');

        // Limit input to 6 characters (MMYYYY)
        if (cleaned.length > 6) {
            cleaned = cleaned.slice(0, 6);
        }

        let formattedText = cleaned;

        // Format as MM/YY automatically
        if (cleaned.length >= 2) {
            formattedText = `${cleaned.slice(0, 2)}`;
            if (cleaned.length > 2) {
                formattedText += `/${cleaned.slice(2, 4)}`;
            }
        }

        setExpiration(formattedText);
    };

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.2,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    }, []);

    const getUserData = async () => {
        var ud_json = await AsyncStorage.getItem('user_details');
        const user_detail = JSON.parse(ud_json);
        setUserEmail(user_detail.user.email);
        // console.log('getToken', user_detail.user.email);
    }

    const makePayment = async () => {
        const [month, year] = expiration.split('/');
        const formdata = {
            card_number: cardNumber,
            month: month,
            year: year,
            cvv: cvvCode
        };

        // console.log("Payment Data", props.route.params, formdata);
        // return;

        setIsLoading(true);
        try {
            if (cardHolderName === "") {
                Alert.alert("Validation Error", 'Enter Your Name');
                setIsLoading(false);
                return false;
            }
            if (cardNumber === "") {
                Alert.alert("Validation Error", 'Enter Credit Card Number');
                setIsLoading(false);
                return false;
            }
            if (!expiration.includes('/') || month === "" || year === "") {
                Alert.alert("Validation Error", 'Enter Valid Card Expiration Date (MM/YY)');
                setIsLoading(false);
                return false;
            }
            if (cvvCode === "") {
                Alert.alert("Validation Error", 'Enter Valid Card CVV Number');
                setIsLoading(false);
                return false;
            }
            // console.log("Form Data-=-=", formdata);
            // return;

            CallApiPost(`/api/stripe-payment/${STORE_ID}/${props.route.params.userId}/${props.route.params.contentId}`, formdata).then(
                response => {
                    if (response.data.status === "success") {
                        console.log('Payment success-=-=-=', response.data);
                        setOrderModalVisible(true);
                        setTimeout(() => {
                            setOrderModalVisible(false);
                            setIsLoading(false);
                            navigation.replace('OrderDetails', response.data.order.id);
                        }, 4000)
                    } else {
                        console.log('Payment Failed-=-=-=', response.data);
                        setIsLoading(false);
                    }
                },
            );
        } catch (error) {
            console.log('error-=-=', error);
        }
    };

    useEffect(() => {
        getUserData();
        setTotalPrice(props.route.params.price);
        console.log("Get Total Price By Prop", props.route.params);
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: '90%', alignSelf: 'center' }}>
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: '15%', marginVertical: 7, marginTop: 18, flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center' }}>
                    <FontAwesome name="angle-left" color={'#b6b6b6'} size={28} />
                    <Text style={{ color: '#b6b6b6', fontSize: 18, marginLeft: 6 }}>Back</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ backgroundColor: '#88888a', height: 0.4, width: '90%', alignSelf: 'center' }}></View>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%', alignSelf: 'center', marginTop: 13 }}>
                    <AntDesign name="user" color={'#88888a'} size={32} />
                    <View style={{ marginLeft: 12 }}>
                        <Text style={{ color: '#d1d1d1', fontSize: 13, fontWeight: 'bold' }}>User Account</Text>
                        <Text style={{ color: '#d1d1d1', fontSize: 15, fontWeight: 'bold' }}>{userEmail}</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: '#88888a', height: 0.4, width: '90%', alignSelf: 'center', marginTop: 13 }}></View>
                <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 22, paddingHorizontal: 2 }}>
                    <Text style={{ color: '#efefef', fontFamily: 'Roboto-Light', lineHeight: 24, fontSize: 17, width: '62%' }}>{props.route.params.name}</Text>
                    <View style={{ height: '100%', width: 0.4, backgroundColor: '#88888a' }}></View>
                    <View>
                        <Text style={{ color: '#efefef', fontFamily: 'Roboto-Light', fontSize: 18 }}>${totalPrice}</Text>
                        <Text style={{ color: '#88888a', fontSize: 13 }}>{props.route.params.duration}</Text>
                    </View>
                </View>
                <View style={{ width: '90%', alignSelf: 'center', marginTop: 16 }}>
                    <View style={{ width: '100%' }}>
                        <CardView
                            style={styles.cardStyle}
                            cardElevation={5}
                            cardMaxElevation={2}
                            cornerRadius={10}>
                            <TextInput
                                style={styles.inputs}
                                onChangeText={setCardHolderName}
                                type="text"
                                value={cardHolderName}
                                placeholder="Card Holder Full Name"
                                placeholderTextColor="#b6b6b6"
                                underlineColorAndroid="transparent"
                            />
                        </CardView>
                    </View>
                    <View style={{ width: '100%' }}>
                        <CardView
                            style={styles.cardStyle}
                            cardElevation={5}
                            cardMaxElevation={2}
                            cornerRadius={10}>
                            <TextInput
                                style={styles.inputs}
                                onChangeText={setCardNumber}
                                value={cardNumber}
                                maxLength={16}
                                type="Number"
                                keyboardType='number-pad'
                                placeholder="Credit Card Number"
                                placeholderTextColor="#b6b6b6"
                                underlineColorAndroid="transparent"
                            />
                        </CardView>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <CardView
                            style={{
                                backgroundColor: '#373739',
                                width: '60%',
                                marginVertical: 10,
                                flexDirection: 'row',
                                paddingHorizontal: 10,
                            }}
                            cardElevation={5}
                            cardMaxElevation={2}
                            cornerRadius={10}>
                            <TextInput
                                style={styles.inputs}
                                onChangeText={handleExpirationChange}
                                value={expiration}
                                keyboardType="number-pad"
                                placeholder="Expiry (MM/YY)"
                                placeholderTextColor="#b6b6b6"
                                maxLength={5} // Ensures MM/YY format
                            />
                        </CardView>
                        <CardView
                            style={{
                                backgroundColor: '#373739',
                                width: '39%',
                                marginVertical: 10,
                                flexDirection: 'row',
                                paddingHorizontal: 10,
                            }}
                            cardElevation={5}
                            cardMaxElevation={2}
                            cornerRadius={10}>
                            <TextInput
                                style={styles.inputs}
                                onChangeText={setCvvCode}
                                value={cvvCode}
                                type="Number"
                                keyboardType='number-pad'
                                maxLength={3}
                                placeholder="CVV Code"
                                placeholderTextColor="#b6b6b6"
                                underlineColorAndroid="transparent"
                            />
                        </CardView>
                    </View>
                    <View style={{ width: '100%', marginTop: 6, paddingHorizontal: 2 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#efefef', fontFamily: 'Roboto-Light', fontSize: 22 }}>Total Due: </Text>
                            <Text style={{ color: '#efefef', fontFamily: 'Roboto-Light', fontSize: 22 }}>${totalPrice}</Text>
                        </View>
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
                            <Text style={{ color: '#efefef', fontFamily: 'Roboto-Light', fontSize: 15 }}>Save this card</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: '#e00024' }}
                                thumbColor={isEnabled ? '#fff' : '#fff'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View> */}
                    </View>
                    {isLoading ? (
                        <ActivityIndicator size="large" color="#c80100" />
                    ) : (
                        <TouchableOpacity onPress={makePayment} style={styles.createBtn}>
                            <Text style={{ color: '#fff', fontFamily: 'Roboto-Bold', fontSize: 16 }}>SUBMIT ORDER</Text>
                        </TouchableOpacity>
                    )}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
                        <EvilIcons name="lock" color={'#b6b6b6'} size={20} />
                        <Text style={{ color: '#88888a', fontSize: 13, marginLeft: 5 }}>Payment are Secured and Encripted</Text>
                    </View>
                </View>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={orderModalVisible}
                onRequestClose={closeOrderModal}
            >
                <View style={styles.pModalContainer}>
                    <View style={styles.pModalContent}>
                        <Animated.View style={[styles.pModalCheckCircle, { transform: [{ scale: scaleAnim }] }]}>
                            <FontAwesome name='check' color={'#fff'} size={60} />
                        </Animated.View>
                        <Text style={styles.pModalCongratulationsText}>Congratulations!</Text>
                        <Text style={styles.pModalDetailText}>Your order has been placed successfully.</Text>
                    </View>
                    {/* <TouchableOpacity onPress={() => props.navigation.navigate('OrderDetails', s_orderId)} style={styles.pModalButton}>
            <Text style={styles.pModalButtonText}>Order Details</Text>
          </TouchableOpacity> */}
                </View>
            </Modal>

        </SafeAreaView>
    );
};

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141416',
    },
    box: {
        backgroundColor: '#212123',
        borderColor: '#414143',
        borderWidth: 0.7,
        width: '31%',
        height: 110,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardStyle: {
        backgroundColor: '#373739',
        width: '100%',
        marginVertical: 10,
        flexDirection: 'row',
        paddingHorizontal: 10,
        // borderWidth:0.6,
        // borderColor:'#fff'
    },
    inputs: {
        height: 50,
        width: '80%',
        color: '#fff',
        alignSelf: 'center',
        marginLeft: 10,
        fontSize: 16,
    },
    createBtn: {
        backgroundColor: '#c70e17',
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 15,
    },
    pModalContainer: {
        flex: 1,
        backgroundColor: '#141416',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    pModalContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    pModalCheckCircle: {
        marginBottom: 20,
        width: 120,
        height: 120,
        borderRadius: 100,
        backgroundColor: '#4CAF50',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pModalCongratulationsText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff'
    },
    pModalDetailText: {
        fontSize: 16,
        color: '#b6b6b6',
        textAlign: 'center',
        paddingHorizontal: 30,
    },
    pModalButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 8,
        top: 100
    },
    pModalButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
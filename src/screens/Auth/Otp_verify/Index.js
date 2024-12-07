
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import CardView from 'react-native-cardview';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import bgImage from '../../../assets/BgImage/bg1.jpg'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CallApi } from '../../../component/CallApi/index';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicon from 'react-native-vector-icons/Octicons';


const Index = (props) => {

    const navigation = useNavigation()
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState("");
    const [otp, setOtp] = useState('')
    const [user_id, setUser_id] = useState('')

    const createuser = () => {
        let form = new FormData();
        form.append('otp', otp);
        form.append('email', props.route.params);
        try {
            if (otp === "") {
                Alert.alert("Validation Error", 'Please Enter Your Valid OTP');
                return false;
            }
            setLoader(true);
            CallApi(
                'POST',
                `/api/otpverify`,
                form,
            ).then(response => {
                console.log(response);
                setLoader(false);
                if (response.responseData) {
                    // setUser_id(response.responseData.id);
                    // console.log("use id", response.responseData.id)
                    navigation.replace('Reset_password', response.responseData.id)
                } else {
                    alert(response.message)
                }
            })

        } catch (error) {
            console.log(error);
            setLoader(false);
        }
    }

    useEffect(() => {
        console.log(props.route.params)
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: '90%', alignSelf: 'center', }}>
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: '15%', marginVertical: 7, marginTop: 18, flexDirection: 'row', alignSelf: "flex-start", alignItems: 'center' }}>
                    <FontAwesome name="angle-left" color={'#b6b6b6'} size={28} />
                    <Text style={{ color: '#b6b6b6', fontSize: 18, marginLeft: 10 }}>Back</Text>
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: '#88888a', height: 0.4, width: '90%', alignSelf: 'center', }}></View>
            <View style={styles.topPart}>
                <Text style={{ color: '#efefef', fontSize: 26, fontFamily: 'Roboto-Light' }}>OTP Verify</Text>
            </View>
            <View style={styles.bottomPart}>
                <CardView
                    style={styles.cardStyle}
                    cardElevation={5}
                    cardMaxElevation={2}
                    cornerRadius={10}
                >
                    <Octicon style={{ alignSelf: 'center' }} name="verified" size={25} color={'#88888a'} />
                    <TextInput
                        style={styles.inputs}
                        value={otp}
                        onChangeText={setOtp}
                        disableFullscreenUI={true}
                        keyboardType="numeric"
                        placeholderTextColor="#b6b6b6"
                        placeholder="Enter Your Verify OTP"
                        underlineColorAndroid='transparent'
                    />
                </CardView>

                <TouchableOpacity onPress={createuser} style={styles.loginBtn}>
                    <Text style={{ color: '#fff', fontWeight: '600', fontSize: 17, fontVariant: ['small-caps'] }}>Verify</Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView >
    )
}

export default Index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141416'
    },
    topPart: {
        // backgroundColor: 'red',
        height: '32%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 30
    },
    bottomPart: {
        height: '68%',
        // backgroundColor: '#fff',
        // borderTopRightRadius: 30,
        // borderTopLeftRadius: 30,
        alignItems: 'center',
        justifyContent: 'flex-start',

    },
    cardStyle: {
        backgroundColor: "#373739",
        width: '90%',
        marginVertical: 10,
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    inputs: {
        height: 50,
        width: '80%',
        alignSelf: 'center',
        marginLeft: 10,
        fontSize: 16
    },
    loginBtn: {
        backgroundColor: '#c70e17',
        marginTop: 20,
        width: '90%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    tinyLogo: {
        height: 90,
        width: 130
    }
})
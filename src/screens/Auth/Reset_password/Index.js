import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import CardView from 'react-native-cardview';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import bgImage from '../../../assets/BgImage/bg1.jpg'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CallApi } from '../../../component/CallApi/index';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Index = (props) => {

    const navigation = useNavigation()
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState("");
    const [password, setPassword] = useState('')
    const [confirm_password, setConfirm_password] = useState('')

    const createuser = async () => {
        let form = new FormData();
        form.append('user_id', props.route.params);
        form.append('password', password);
        form.append('confirm_password', confirm_password);
        // console.log("user Id", form);
        try {
            if (password === "") {
                Alert.alert("Validation Error", 'Please Enter Your Password');
                return false;
            }
            if (password !== confirm_password || confirm_password === "") {
                Alert.alert("Validation Error", 'Password and Confirm Password does not match');
                return false;
            }

            setLoader(true);
            CallApi(
                'POST',
                `/api/reset/password`,
                form,
            ).then(response => {
                console.log(response);
                setLoader(false);
                if (response.responseData) {
                    navigation.replace('BottomNav')
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
                <Text style={{ color: '#efefef', fontSize: 26, fontFamily: 'Roboto-Light' }}>Reset Password</Text>


            </View>
            <View style={styles.bottomPart}>
                <CardView
                    style={styles.cardStyle}
                    cardElevation={5}
                    cardMaxElevation={2}
                    cornerRadius={10}
                >
                    <Fontisto style={{ alignSelf: 'center' }} name="unlocked" size={25} color={'#88888a'} />
                    <TextInput
                        style={styles.inputs}
                        onChangeText={setPassword}
                        type='password'
                        value={password}
                        secureTextEntry={true}
                        disableFullscreenUI={true}
                        placeholderTextColor="#b6b6b6"
                        placeholder="Enter New Password"
                        underlineColorAndroid='transparent'
                    />
                </CardView>
                <CardView
                    style={styles.cardStyle}
                    cardElevation={5}
                    cardMaxElevation={2}
                    cornerRadius={10}
                >
                    <Fontisto style={{ alignSelf: 'center' }} name="unlocked" size={25} color={'#88888a'} />
                    <TextInput
                        style={styles.inputs}
                        onChangeText={setConfirm_password}
                        type='password'
                        value={confirm_password}
                        secureTextEntry={true}
                        disableFullscreenUI={true}
                        placeholderTextColor="#b6b6b6"
                        placeholder="Enter Confirm Password"
                        underlineColorAndroid='transparent'
                    />
                </CardView>

                <TouchableOpacity onPress={createuser} style={styles.loginBtn}>
                    <Text style={{ color: '#fff', fontWeight: '600', fontSize: 17, fontVariant: ['small-caps'] }}>Submit</Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>
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
        height: 55,
        width: '80%',
        alignSelf: 'center',
        marginLeft: 10,
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
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ImageBackground, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CallApi } from '../../../component/CallApi/index'
import { useNavigation } from '@react-navigation/native'
import CardView from 'react-native-cardview';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import bgImage from '../../../assets/BgImage/bg1.jpg'

const Index = (props) => {

    const navigation = useNavigation()
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState("");
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPassword_confirmation] = useState('')

    const CreateUser = () => {
        const formdata = new FormData();
        formdata.append('name', name);
        formdata.append('email', email);
        formdata.append('password', password);
        formdata.append('password_confirmation', password_confirmation);

        try {
            const emailType = /^\w+([\D.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            if (name === "") {
                Alert.alert("Validation Error", 'Please Enter Your Name');
                return false;
            }
            if (email === "" || emailType.test(email) === false) {
                Alert.alert("Validation Error", 'Please Enter Your Valid Email');
                return false;
            }
            if (password === "") {
                Alert.alert("Validation Error", 'Please Enter Your Password');
                return false;
            }
            if (password_confirmation === "") {
                Alert.alert("Validation Error", 'Please Enter Your Confirm Password');
                return false;
            }

            setLoader(true);
            CallApi(
                'POST',
                `/api/register`,
                formdata,
            ).then(response => {
                console.log(response);
                setLoader(false);
                if (response.data) {
                    navigation.navigate('Login')
                    alert("Successfully Registered")
                } else {
                    alert(response.message)
                }
            });
        } catch (error) {
            console.log(error);
            setLoader(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground style={{ flex: 1 }} source={bgImage}>
                <View style={styles.topPart}>
                    <View style={{ width: 150, height: 90, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            style={styles.tinyLogo}
                            source={require('../../../assets/Logo/logo.png')}
                        />
                    </View>
                    <Text style={{ color: '#000', fontSize: 35, fontWeight: '800', marginTop: 15, fontVariant: ['small-caps'] }}>Register Here</Text>
                </View>
                <View style={styles.bottomPart}>
                    <CardView
                        style={styles.cardStyle}
                        cardElevation={5}
                        cardMaxElevation={2}
                        cornerRadius={5}
                    >
                        <FontAwesome style={{ alignSelf: 'center' }} name="user-circle" size={25} color={'#c70e17'} />
                        <TextInput
                            style={styles.inputs}
                            onChangeText={setName}
                            type='text'
                            value={name}
                            placeholder="Enter your name"
                            underlineColorAndroid='transparent'
                        />
                    </CardView>
                    <CardView
                        style={styles.cardStyle}
                        cardElevation={5}
                        cardMaxElevation={2}
                        cornerRadius={5}
                    >
                        <Entypo style={{ alignSelf: 'center' }} name="mail" size={25} color={'#c70e17'} />
                        <TextInput
                            style={styles.inputs}
                            onChangeText={setEmail}
                            type='email'
                            value={email}
                            placeholder="Enter your email address here"
                            keyboardType="email-address"
                            underlineColorAndroid='transparent'
                        />
                    </CardView>
                    <CardView
                        style={styles.cardStyle}
                        cardElevation={5}
                        cardMaxElevation={2}
                        cornerRadius={5}
                    >
                        <Fontisto style={{ alignSelf: 'center' }} name="unlocked" size={25} color={'#c70e17'} />
                        <TextInput
                            style={styles.inputs}
                            onChangeText={setPassword}
                            type='password'
                            value={password}
                            placeholder="Enter your Password"
                            secureTextEntry={true}
                            underlineColorAndroid='transparent'
                        />
                    </CardView>
                    <CardView
                        style={styles.cardStyle}
                        cardElevation={5}
                        cardMaxElevation={2}
                        cornerRadius={5}
                    >
                        <Fontisto style={{ alignSelf: 'center' }} name="unlocked" size={25} color={'#c70e17'} />
                        <TextInput
                            style={styles.inputs}
                            onChangeText={setPassword_confirmation}
                            type='password'
                            value={password_confirmation}
                            placeholder="Enter your Confirmation Password"
                            secureTextEntry={true}
                            underlineColorAndroid='transparent'
                        />
                    </CardView>
                    <TouchableOpacity onPress={CreateUser} style={styles.loginBtn}>
                        <Text style={{ color: '#fff', fontWeight: '600', fontSize: 17, fontVariant: ['small-caps'] }}>Click Here To Register</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <View style={{ alignSelf: 'center', height: 1, width: 60, backgroundColor: 'black' }} />
                        <View>
                            <Text style={{ width: 35, textAlign: 'center', color: '#000', fontSize: 17, fontWeight: '500' }}>OR</Text>
                        </View>
                        <View style={{ alignSelf: 'center', width: 60, height: 1, backgroundColor: 'black' }} />
                    </View>
                    <Text style={{ color: '#000', fontSize: 15, marginTop: 5, fontVariant: ['small-caps'] }}>Register through</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                        <TouchableOpacity style={{ width: 35, height: 35, backgroundColor: '#5987eb', marginRight: 8, borderRadius: 6 }}>
                            <Fontisto style={{ height: 34, width: 45, marginLeft: 8, marginTop: 4 }} name="facebook" size={32} color={'#fff'} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={{ height: 35, width: 34, marginTop: 5 }} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c70e17'
    },
    topPart: {
        // backgroundColor: 'red',
        height: '30%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 30
    },
    bottomPart: {
        height: '70%',
        // backgroundColor: '#fff',
        // borderTopRightRadius: 30,
        // borderTopLeftRadius: 30,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 25
    },
    cardStyle: {
        width: '95%',
        marginVertical: 10,
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    inputs: {
        height: 55,
        width: '80%',
        alignSelf: 'center',
        marginLeft: 10
    },
    loginBtn: {
        marginTop: 25,
        backgroundColor: '#c70e17',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20
    },
    tinyLogo: {
        height: 90,
        width: 130
    }
})
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { CallApi } from '../../component/CallApi/index';
import moment from "moment";

const Index = (props) => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [ticketId, setTicketId] = useState(props.route.params);
    const [spinner, setSpinner] = useState(false);
    const [tickets, setTickets] = useState({});

    const getTickets = async () => {
        var userlogin = await AsyncStorage.getItem('user_details');
        userlogin = JSON.parse(userlogin);
        try {
            setSpinner(true);
            CallApi('GET', '/api/get-ticket/' + ticketId).then(res => {
                if (res.status == "success") {
                    setTickets(res.ticket);
                    setSpinner(false);
                } else {
                    console.log("Something went wrong", res);
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (isFocused) {
            getTickets();
        }
    }, [isFocused]);

    return (
        <View style={{ flex: 1, backgroundColor: "#141416" }}>
            {/* Header with Back Button */}
            <View style={{ width: '90%', alignSelf: 'center' }}>
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: '30%', marginVertical: 7, marginTop: 18, flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center' }}>
                    <FontAwesome name="angle-left" color={'#b6b6b6'} size={28} />
                    <Text style={{ color: '#b6b6b6', fontSize: 18, marginLeft: 10 }}>Back</Text>
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: '#88888a', height: 0.4, width: '90%', alignSelf: 'center' }}></View>
            {spinner === true ? (
                <Spinner
                    visible={spinner}
                    animation="slide"
                    color="#e00024"
                    overlayColor="rgba(0, 0, 0, 0.25)"
                    textContent={'Loading...'}
                    textStyle={{ color: '#e00024' }}
                />
            ) : (
                <ScrollView style={styles.scroll}>
                    {/* User Queries */}
                    <Text style={styles.userQueryBold}>{tickets?.title}</Text>
                    <View style={{ backgroundColor: '#88888a', height: 0.5, width: '100%', alignSelf: 'center', marginBottom: 20 }}></View>
                    <Text style={styles.userQuery}>{tickets?.description}</Text>
                    <View style={{ backgroundColor: '#88888a', height: 0.5, width: '100%', alignSelf: 'center', marginBottom: 20 }}></View>
                    {/* Support Reply */}
                    <View style={styles.replyBlock}>
                        <Text style={styles.replyTitle}>MasLife365 Support</Text>
                        <Text style={styles.replyText}>This is demo reply from maslife365 support team will display here.</Text>
                        <Text style={styles.replyTime}>Feb 11, 2025, 08:30PM</Text>
                    </View>
                    {/* User Reply */}
                    <View style={styles.replyBlock1}>
                        <Text style={styles.replyTitle}>Bhuvnesh</Text>
                        <Text style={{ color: '#fff', fontSize: 16, fontFamily: 'Montserrat-Regular', marginBottom: 6, textAlign: 'right' }}>This is demo reply from user will display here.</Text>
                        <Text style={styles.replyTime}>Feb 11, 2025, 08:30PM</Text>
                    </View>
                </ScrollView>
            )}
            <TouchableOpacity style={styles.replyButton}>
                <Text style={styles.replyButtonText}>Reply</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Index

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 80,
    },
    userQueryBold: {
        color: "#fff",
        fontSize: 16,
        fontFamily: 'Montserrat-Bold',
        marginBottom: 25,
    },
    userQuery: {
        color: "#fff",
        fontSize: 16,
        fontFamily: 'Montserrat-Regular',
        marginBottom: 25,
    },
    replyBlock: {
        marginBottom: 30,
    },
    replyBlock1: {
        width: '80%',
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
    },
    replyTitle: {
        color: "#b6b6b6",
        fontSize: 14,
        fontFamily: 'Montserrat-SemiBold',
        marginBottom: 5,
    },
    replyText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: 'Montserrat-Regular',
        marginBottom: 6,
    },
    replyTime: {
        color: "#b6b6b6",
        fontSize: 14,
        fontFamily: 'Montserrat-Regular',
    },
    replyButton: {
        position: 'absolute',
        bottom: 20,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#e00024',
        paddingVertical: 14,
        alignItems: 'center',
        borderRadius: 8,
    },
    replyButtonText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold'
    },
})
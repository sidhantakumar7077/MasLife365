import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import { CallApi } from '../../component/CallApi/index';
import moment from "moment";

const TicketListScreen = (props) => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [spinner, setSpinner] = useState(false);
    const [tickets, setTickets] = useState([]); // State to hold ticket data

    const getAllTickets = async () => {
        var userlogin = await AsyncStorage.getItem('user_details');
        userlogin = JSON.parse(userlogin);
        try {
            setSpinner(true);
            CallApi('GET', '/api/get-tickets').then(res => {
                // console.log(res);
                if (res.status == "success") {
                    // console.log("Get All Tickets", res.tickets);
                    setTickets(res.tickets);
                    setSpinner(false);
                } else {
                    alert("Something went wrong");
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (isFocused) {
            getAllTickets();
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
            <View style={{ backgroundColor: '#88888a', height: 0.3, width: '90%', alignSelf: 'center' }}></View>

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
                <View style={{ width: '93%', flex: 1, alignSelf: 'center', marginTop: 20 }}>
                    {/* Create New Ticket Button */}
                    <TouchableOpacity onPress={() => props.navigation.navigate('TicketCreatePage')} style={styles.createTicketButton}>
                        <Text style={styles.createTicketText}>Create New Ticket</Text>
                    </TouchableOpacity>

                    {/* All Tickets Header */}
                    <Text style={styles.allTicketsText}>All Tickets ({tickets.length})</Text>

                    <View style={{ backgroundColor: '#88888a', height: 0.3, width: '100%' }}></View>

                    {/* Ticket List */}
                    {tickets.length > 0 ?
                        <FlatList
                            data={tickets}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => navigation.navigate('TicketContentPage', item.id)} style={styles.ticketContainer}>
                                    <Text style={styles.ticketMessage}>
                                        #{item.id} - {item.title}
                                    </Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Text style={styles.ticketDate}>{moment(item.created_at).format("MMM DD, YYYY h:mm A")}</Text>
                                        <View style={[styles.statusBadge, item.status === "Open" ? styles.openBadge : styles.closedBadge]}>
                                            <Text style={styles.statusText}>{item.status}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                        :
                        <View style={{ width: '100%', alignSelf: 'center', top: 150 }}>
                            <Text style={{ color: "#fff", fontSize: 16, fontFamily: 'Montserrat-Regular', textAlign: 'center' }}>No tickets available.</Text>
                        </View>
                    }
                </View>
            )}
        </View>
    );
};

const styles = {
    createTicketButton: {
        backgroundColor: "#e00024",
        paddingVertical: 14,
        alignItems: "center",
        borderRadius: 8,
        marginBottom: 20,
    },
    createTicketText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
    },
    allTicketsText: {
        color: "#fff",
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold',
        marginBottom: 10,
    },
    ticketContainer: {
        width: '98%',
        alignSelf: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#333",
        paddingVertical: 12,
    },
    ticketMessage: {
        color: "#fff",
        fontSize: 16,
        fontFamily: 'Montserrat-Regular',
        marginBottom: 5,
    },
    ticketDate: {
        color: "#b6b6b6",
        fontSize: 14,
        marginBottom: 5,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: "flex-start",
    },
    openBadge: {
        backgroundColor: "#e00024",
    },
    closedBadge: {
        backgroundColor: "#2E7D32",
    },
    statusText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
};

export default TicketListScreen;

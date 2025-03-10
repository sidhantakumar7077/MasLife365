import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const tickets = [
    { id: 15, status: "Closed", date: "Feb 11, 2025 8:30PM", message: "I am not able to watch the content, please help me on this asap." },
    { id: 15, status: "Open", date: "Feb 11, 2025 8:30PM", message: "I am not able to watch the content, please help me on this asap." },
    { id: 15, status: "Open", date: "Feb 11, 2025 8:30PM", message: "I am not able to watch the content, please help me on this asap." },
    { id: 15, status: "Closed", date: "Feb 11, 2025 8:30PM", message: "I am not able to watch the content, please help me on this asap." },
    { id: 15, status: "Closed", date: "Feb 11, 2025 8:30PM", message: "I am not able to watch the content, please help me on this asap." },
    { id: 15, status: "Closed", date: "Feb 11, 2025 8:30PM", message: "I am not able to watch the content, please help me on this asap." },
    { id: 15, status: "Open", date: "Feb 11, 2025 8:30PM", message: "I am not able to watch the content, please help me on this asap." },
    { id: 15, status: "Open", date: "Feb 11, 2025 8:30PM", message: "I am not able to watch the content, please help me on this asap." },
    { id: 15, status: "Closed", date: "Feb 11, 2025 8:30PM", message: "I am not able to watch the content, please help me on this asap." },
    { id: 15, status: "Closed", date: "Feb 11, 2025 8:30PM", message: "I am not able to watch the content, please help me on this asap." },
];

const TicketListScreen = (props) => {
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

            <View style={{ width: '93%', flex: 1, alignSelf: 'center', marginTop: 20 }}>
                {/* Create New Ticket Button */}
                <TouchableOpacity onPress={() => props.navigation.navigate('TicketCreatePage')} style={styles.createTicketButton}>
                    <Text style={styles.createTicketText}>Create New Ticket</Text>
                </TouchableOpacity>

                {/* All Tickets Header */}
                <Text style={styles.allTicketsText}>All Tickets (5)</Text>

                {/* Ticket List */}
                <FlatList
                    data={tickets}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.ticketContainer}>
                            <Text style={styles.ticketMessage}>
                                #{item.id} - {item.message}
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={styles.ticketDate}>{item.date}</Text>
                                <View style={[styles.statusBadge, item.status === "Open" ? styles.openBadge : styles.closedBadge]}>
                                    <Text style={styles.statusText}>{item.status}</Text>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
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

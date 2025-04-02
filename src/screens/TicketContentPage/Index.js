import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { CallApi } from '../../component/CallApi/index';
import { launchImageLibrary } from 'react-native-image-picker';

const Index = (props) => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [ticketId] = useState(props.route.params);
    const [spinner, setSpinner] = useState(false);
    const [ticket, setTicket] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [image, setImage] = useState(null);

    const getTickets = async () => {
        try {
            setSpinner(true);
            const res = await CallApi('GET', '/api/get-ticket/' + ticketId);
            if (res.status === "success") {
                setTicket(res.ticket);
            } else {
                ToastAndroid.show("Failed to load ticket", ToastAndroid.SHORT);
            }
            setSpinner(false);
        } catch (error) {
            console.error(error);
            setSpinner(false);
        }
    };

    const handleSelectImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel && !response.errorCode) {
                const asset = response.assets[0];
                setImage({
                    uri: asset.uri,
                    type: asset.type,
                    fileName: asset.fileName
                });
            }
        });
    };

    const saveReply = async () => {
        if (!replyText.trim()) {
            ToastAndroid.show("Please enter a message", ToastAndroid.SHORT);
            return;
        }

        try {
            setSpinner(true);
            const formData = new FormData();
            formData.append('notes', replyText);
            if (image && image.uri) {
                formData.append('image', {
                    uri: image.uri,
                    name: image.fileName || 'image.jpg',
                    type: image.type || 'image/jpeg'
                });
            }

            const response = await CallApi('POST', `/api/save-ticket-note/${ticketId}`, formData, true);

            if (response?.status === "success") {
                ToastAndroid.show("Reply sent!", ToastAndroid.SHORT);
                setReplyText('');
                setImage(null);
                setShowReplyBox(false);
                getTickets();
            } else {
                ToastAndroid.show("Failed to send reply", ToastAndroid.SHORT);
            }

            setSpinner(false);
        } catch (error) {
            console.error("Reply Error:", error);
            ToastAndroid.show("Error sending reply", ToastAndroid.SHORT);
            setSpinner(false);
        }
    };

    useEffect(() => {
        if (isFocused) getTickets();
    }, [isFocused]);

    return (
        <View style={{ flex: 1, backgroundColor: "#141416" }}>
            <View style={{ width: '90%', alignSelf: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', marginTop: 18, alignItems: 'center' }}>
                    <FontAwesome name="angle-left" color={'#b6b6b6'} size={28} />
                    <Text style={{ color: '#b6b6b6', fontSize: 18, marginLeft: 10 }}>Back</Text>
                </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: '#88888a', height: 0.4, width: '90%', alignSelf: 'center' }} />

            {spinner ? (
                <Spinner visible={spinner} color="#e00024" textContent={'Loading...'} textStyle={{ color: '#e00024' }} />
            ) : (
                <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                    <Text style={styles.userQueryBold}>{ticket?.title}</Text>
                    <View style={{ backgroundColor: '#88888a', height: 0.5, marginBottom: 20 }} />
                    <Text style={styles.userQuery}>{ticket?.description}</Text>
                    <View style={{ backgroundColor: '#88888a', height: 0.5, marginBottom: 20 }} />

                    {ticket?.ticket_note?.map((item, idx) => (
                        <View key={idx} style={[styles.replyContainer, item.created_status === 'User' ? styles.userReply : styles.supportReply]}>
                            <Text style={styles.replyTitle}>{item.created_status === 'User' ? 'You' : 'Support'}</Text>
                            <Text style={styles.replyText}>{item.notes}</Text>
                            {item.image && (
                                <View style={styles.fileContainer}>
                                    <View style={styles.fileLeft}>
                                        <MaterialIcons name="insert-drive-file" size={30} color="#d1cfcf" />
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={styles.fileName}>Attachment</Text>
                                            <Text style={styles.fileMeta}>Image • Download</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity>
                                        <MaterialIcons name="arrow-circle-down" size={28} color="#d1cfcf" />
                                    </TouchableOpacity>
                                </View>
                            )}
                            <Text style={styles.replyTime}>{moment(item.created_at).format('MMM DD, YYYY, hh:mmA')}</Text>
                        </View>
                    ))}

                    {showReplyBox && (
                        <>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Write your reply..."
                                placeholderTextColor="#888"
                                value={replyText}
                                onChangeText={setReplyText}
                                multiline
                            />
                            <TouchableOpacity style={styles.addImageButton} onPress={handleSelectImage}>
                                <Text style={styles.addImageText}>Add Image</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </ScrollView>
            )}

            <TouchableOpacity style={styles.replyButton} onPress={() => showReplyBox ? saveReply() : setShowReplyBox(true)}>
                <Text style={styles.replyButtonText}>{showReplyBox ? "Send Reply" : "Reply"}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Index;

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
        fontWeight: 'bold',
        marginBottom: 25,
    },
    userQuery: {
        color: "#fff",
        fontSize: 16,
        marginBottom: 25,
    },
    replyContainer: {
        maxWidth: '80%',
        marginBottom: 20,
        padding: 10,
        borderRadius: 6,
    },
    supportReply: {
        alignSelf: 'flex-start',
    },
    userReply: {
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
    },
    fileContainer: {
        backgroundColor: '#3d3d3d',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    fileLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fileName: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 2,
    },
    fileMeta: {
        color: '#bfbdbd',
        fontSize: 12,
    },
    replyTitle: {
        color: "#b6b6b6",
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 5,
    },
    replyText: {
        color: "#fff",
        fontSize: 16,
        marginBottom: 6,
    },
    replyTime: {
        color: "#b6b6b6",
        fontSize: 12,
        marginTop: 5,
    },
    input: {
        marginTop: 30,
        backgroundColor: "#222",
        borderWidth: 0.16,
        borderColor: '#b6b6b6',
        color: "#fff",
        borderRadius: 4,
        padding: 12,
        fontSize: 16,
    },
    textArea: {
        height: 150,
        textAlignVertical: "top",
    },
    addImageButton: {
        width: 150,
        backgroundColor: "#222",
        borderWidth: 0.16,
        borderColor: '#b6b6b6',
        padding: 15,
        borderRadius: 4,
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20
    },
    addImageText: {
        color: "#b6b6b6",
        fontSize: 16,
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
        fontWeight: '600'
    },
});

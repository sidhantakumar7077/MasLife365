import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, ToastAndroid, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';
import { CallApi } from '../../component/CallApi/index';

const Index = (props) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const handleImagePick = () => {
        const options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
                ToastAndroid.show("Image selection cancelled", ToastAndroid.SHORT);
            } else if (response.error) {
                console.error('ImagePicker Error: ', response.error);
                ToastAndroid.show("Error selecting image", ToastAndroid.LONG);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                ToastAndroid.show("Custom button tapped", ToastAndroid.SHORT);
            } else {
                setImage(response.assets[0]);
                console.log("Image selected:", response.assets[0]);
                ToastAndroid.show("Image selected", ToastAndroid.SHORT);
            }
        });
    };

    const saveTicket = async () => {
        try {
            let userlogin = await AsyncStorage.getItem('user_details');
            userlogin = JSON.parse(userlogin);

            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('app', 'Android');
            formData.append('priority', 'normal');
            formData.append('type', 'Issue');

            if (image && image.uri) {
                formData.append('image', {
                    uri: image.uri,
                    name: image.fileName,
                    filename: image.fileName,
                    type: image.type,
                });
            }

            const response = await CallApi('POST', '/api/save-ticket', formData);

            if (response?.message === 'Ticket created successfully!') {
                console.log("✅ Ticket submitted:", response);
                ToastAndroid.show("Ticket Created Successfully!", ToastAndroid.SHORT);
                setTitle('');
                setDescription('');
                setImage(null);
                props.navigation.goBack();
            } else {
                const imageError = response?.errors?.image?.[0];
                if (imageError) {
                    ToastAndroid.show(`Image error: ${imageError}`, ToastAndroid.LONG);
                } else {
                    ToastAndroid.show("Something went wrong. Please try again.", ToastAndroid.LONG);
                }
                console.warn("⚠️ Unexpected response:", response);
            }

        } catch (error) {
            console.error("❌ Ticket submission failed:", error);
            ToastAndroid.show("Error submitting ticket. Please check your network.", ToastAndroid.LONG);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header with Back Button */}
            <View style={{ width: '90%', alignSelf: 'center' }}>
                <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: '30%', marginVertical: 7, marginTop: 18, flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center' }}>
                    <FontAwesome name="angle-left" color={'#b6b6b6'} size={28} />
                    <Text style={{ color: '#b6b6b6', fontSize: 18, marginLeft: 10 }}>Back</Text>
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: '#88888a', height: 0.3, width: '90%', alignSelf: 'center' }}></View>

            <ScrollView style={{ width: '90%', flex: 1, alignSelf: 'center', marginTop: 30 }} showsVerticalScrollIndicator={false}>
                {/* Title Field */}
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter title"
                    placeholderTextColor="#888"
                    value={title}
                    onChangeText={setTitle}
                />

                {/* Description Field */}
                <Text style={[styles.label, { marginTop: 30 }]}>Description</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Enter description"
                    placeholderTextColor="#888"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />

                {/* Add Image Button */}
                <TouchableOpacity style={styles.addImageButton} onPress={handleImagePick}>
                    <Text style={styles.addImageText}>Add Image</Text>
                </TouchableOpacity>

                {image && (
                    <View style={{ width: '100%', height: 250, marginBottom: 20 }}>
                        <Image source={{ uri: image.uri }} style={{ flex: 1, borderRadius: 10, resizeMode: 'cover' }} />
                    </View>
                )}

                {/* Submit Button */}
                <TouchableOpacity onPress={saveTicket} style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Submit Ticket</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#141416",
    },
    backButton: {
        marginBottom: 10,
    },
    backText: {
        color: "#fff",
        fontSize: 16,
    },
    formContainer: {
        flexGrow: 1,
    },
    label: {
        color: "#b6b6b6",
        fontSize: 16,
        fontFamily: 'Montserrat-Regular',
        marginBottom: 9,
    },
    input: {
        backgroundColor: "#222",
        borderWidth: 0.16,
        borderColor: '#b6b6b6',
        color: "#fff",
        borderRadius: 4,
        padding: 12,
        fontSize: 16,
        marginBottom: 15,
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
        marginTop: 30,
        marginBottom: 20
    },
    addImageText: {
        color: "#b6b6b6",
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: "#e00024",
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold',
    },
});

export default Index;

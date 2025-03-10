import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Index = (props) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

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

            <ScrollView style={{ width: '90%', flex: 1, alignSelf: 'center', marginTop: 30 }}>
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
                <TouchableOpacity style={styles.addImageButton} disabled={true}>
                    <Text style={styles.addImageText}>Add Image</Text>
                </TouchableOpacity>

                {/* Submit Button */}
                <TouchableOpacity style={styles.submitButton}>
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
        marginBottom: 60
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

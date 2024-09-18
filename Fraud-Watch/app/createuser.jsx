import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { updateDoc, doc } from 'firebase/firestore';
import { updateEmail } from 'firebase/auth';
import { firestore, auth } from './firebase'; 
import { FontAwesome } from '@expo/vector-icons'; 

const Account = ({ onNavigateBack, userData }) => {
    const [firstName, setFirstName] = useState(userData?.firstName || '');
    const [lastName, setLastName] = useState(userData?.lastName || '');
    const [dateOfBirth, setDateOfBirth] = useState(userData?.dateOfBirth || '');
    const [email, setEmail] = useState(userData?.email || '');
    const [profileImage, setProfileImage] = useState(userData?.profileImage || null);

    // Handle image picking
    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Camera roll permissions are required to change profile picture.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1], // Square image
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.uri); // Set selected image
        }
    };

    // Save profile data to Firestore
    const handleSaveProfile = async () => {
        try {
            const userDocRef = doc(firestore, 'User', userData.uid);
            
            await updateDoc(userDocRef, {
                firstName: firstName,
                lastName: lastName,
                dateOfBirth: dateOfBirth,
                email: email,
                profileImage: profileImage, // Save profile image URL
            });

            // Update the email in Firebase Auth as well
            const user = auth.currentUser;
            if (user && user.email !== email) {
                await updateEmail(user, email);
            }

            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile: ', error);
            alert('Failed to update profile.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Back button */}
            <TouchableOpacity onPress={onNavigateBack} style={styles.backButton}>
                <FontAwesome name="arrow-left" size={24} color="black" />
            </TouchableOpacity>

            {/* Profile Image */}
            <TouchableOpacity onPress={pickImage}>
                {profileImage ? (
                    <Image source={{ uri: profileImage }} style={styles.profilePicture} />
                ) : (
                    <FontAwesome name="user-circle" size={100} color="gray" style={styles.profileIcon} />
                )}
            </TouchableOpacity>

            {/* Divider Line */}
            <View style={styles.dividerLine}></View>

            <Text style={styles.title}>Account Details</Text>

            {/* First Name */}
            <View style={styles.inputContainer}>
                <Text>First Name</Text>
                <TextInput
                    style={styles.input}
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <FontAwesome name="pencil" size={18} color="black" />
            </View>

            {/* Last Name */}
            <View style={styles.inputContainer}>
                <Text>Last Name</Text>
                <TextInput
                    style={styles.input}
                    value={lastName}
                    onChangeText={setLastName}
                />
                <FontAwesome name="pencil" size={18} color="black" />
            </View>

            {/* Date of Birth */}
            <View style={styles.inputContainer}>
                <Text>Date of Birth</Text>
                <TextInput
                    style={styles.input}
                    placeholder="YYYY-MM-DD"
                    value={dateOfBirth}
                    onChangeText={setDateOfBirth}
                />
                <FontAwesome name="pencil" size={18} color="black" />
            </View>

            {/* Email */}
            <View style={styles.inputContainer}>
                <Text>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />
                <FontAwesome name="pencil" size={18} color="black" />
            </View>

            {/* Save Button */}
            <TouchableOpacity onPress={handleSaveProfile} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    profileIcon: {
        alignSelf: 'center',
        marginTop: 40,
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 40,
    },
    dividerLine: {
        height: 4,
        width: '100%',
        backgroundColor: 'linear-gradient(to right, #7130f1, #e66f26)',
        marginVertical: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        flex: 1,
        marginRight: 10,
    },
    saveButton: {
        backgroundColor: '#6A0DAD',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Account;

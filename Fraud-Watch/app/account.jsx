import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { updateDoc, doc } from 'firebase/firestore';
import { updateEmail } from 'firebase/auth';
import { firestore, auth, storage } from './firebase'; // Added Firebase storage
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // For image uploading
import * as ImageManipulator from 'expo-image-manipulator'; // For image cropping and manipulation
import { LinearGradient } from 'expo-linear-gradient'; // For gradient line
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'; // Firebase Storage functions

const Account = ({ onNavigateBack, userData }) => {
  const [firstName, setFirstName] = useState(userData?.firstName || '');
  const [lastName, setLastName] = useState(userData?.lastName || '');
  const [dateOfBirth, setDateOfBirth] = useState(userData?.dateOfBirth || '');
  const [email, setEmail] = useState(userData?.email || '');
  const [profilePic, setProfilePic] = useState(userData?.profilePic || null); // Added for profile pic
  const [uploading, setUploading] = useState(false); // For managing upload state

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // Ensure square aspect for a circular profile picture
        quality: 1,
      });
  
      // Log the result to ensure it has the correct structure
      console.log("Image Picker Result:", result);
  
      if (!result.canceled && result.uri) {
        // Pass the `uri` to the crop function
        const croppedImage = await cropImage(result.uri);
        uploadImage(croppedImage.uri); // Upload the cropped image
      } else {
        console.error('Error: No image selected or image picker returned unexpected format');
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };
  
  // Crop image function
  const cropImage = async (uri) => {
    try {
      const croppedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 300, height: 300 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );
      return croppedImage;
    } catch (error) {
      console.error("Error cropping image:", error);
      throw new Error("Failed to crop image");
    }
  };
  

  // Upload image to Firebase Storage and update the Firestore profile picture URL
  const uploadImage = async (uri) => {
    setUploading(true); // Set uploading state
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `profilePictures/${userData.uid}.jpg`);
      
      await uploadBytes(storageRef, blob);
      
      // Fetch the download URL after the image is uploaded
      const downloadURL = await getDownloadURL(storageRef);
      setProfilePic(`${downloadURL}?${new Date().getTime()}`); // Add timestamp to prevent caching

      // Save the profile picture URL in Firestore
      const userDocRef = doc(firestore, 'User', userData.uid);
      await updateDoc(userDocRef, { profilePic: downloadURL });

      Alert.alert('Profile picture updated successfully');
    } catch (error) {
      console.error('Error uploading image: ', error);
      Alert.alert('Failed to upload image');
    } finally {
      setUploading(false); // Reset uploading state
    }
  };

  // Function to handle updating Firestore fields
  const handleUpdateProfile = async () => {
    if (uploading) {
      Alert.alert('Please wait until the image upload finishes.');
      return;
    }

    try {
      const userDocRef = doc(firestore, 'User', userData.uid);

      await updateDoc(userDocRef, {
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        profilePic: profilePic, // Update profile picture if available
      });

      Alert.alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile: ', error);
      Alert.alert('Failed to update profile');
    }
  };

  // Function to handle email change
  const handleChangeEmail = async () => {
    if (uploading) {
      Alert.alert('Please wait until the image upload finishes.');
      return;
    }

    try {
      const user = auth.currentUser;
      await updateEmail(user, email);
      Alert.alert('Email updated successfully');
    } catch (error) {
      console.error('Error updating email: ', error);
      Alert.alert('Failed to update email');
    }
  };

  return (
    <View style={styles.container}>
      {/* Back button at the top */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onNavigateBack}>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Profile Picture */}
      <TouchableOpacity onPress={pickImage} style={styles.profilePicContainer}>
        {uploading ? (
          <ActivityIndicator size="large" color="#6A0DAD" />
        ) : (
          profilePic ? (
            <Image 
              source={{ uri: profilePic }} 
              style={styles.profilePic} 
              resizeMode="cover" // Ensure the image fits within the circular container
              onError={() => console.log('Error loading image')} // Log any image loading errors
            />
          ) : (
            <FontAwesome name="user-circle" size={100} color="gray" />
          )
        )}
        <FontAwesome name="pencil" size={20} color="black" style={styles.editIcon} />
      </TouchableOpacity>

      {/* Gradient line */}
      <LinearGradient
        colors={['#7130f1', '#e66f26']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientLine}
      />

      <Text style={styles.title}>Account Details</Text>

      {/* First Name */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <FontAwesome name="pencil" size={20} color="black" style={styles.editIconField} />
      </View>

      {/* Last Name */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <FontAwesome name="pencil" size={20} color="black" style={styles.editIconField} />
      </View>

      {/* Date of Birth */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
        />
        <FontAwesome name="pencil" size={20} color="black" style={styles.editIconField} />
      </View>

      {/* Email */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <FontAwesome name="pencil" size={20} color="black" style={styles.editIconField} />
      </View>

      {/* Save button */}
      <TouchableOpacity onPress={handleUpdateProfile} style={styles.saveButton} disabled={uploading}>
        <Text style={styles.saveButtonText}>{uploading ? 'Saving...' : 'Save Profile'}</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  profilePicContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10, // Added margin below the picture for better spacing
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60, // Make it fully circular
    borderWidth: 3,  // Optional: Add a border to make it stand out
    borderColor: '#fff',
    backgroundColor: '#e0e0e0' // Fallback background color
  },
  editIcon: {
    position: 'absolute',
    right: 5,
    bottom: 5,
  },
  gradientLine: {
    height: 4,
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    flex: 1,
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  editIconField: {
    marginLeft: 10,
  },
  saveButton: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#6A0DAD',
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

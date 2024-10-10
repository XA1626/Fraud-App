import React, { useState } from 'react';
import { View, Text, TextInput, Button, Picker, StyleSheet, ScrollView, Alert } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import emailjs from 'emailjs-com';  // Import EmailJS
//import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import { Platform } from 'react-native';

const ScheduleConsultation = () => {
    const db = getFirestore();
    const auth = getAuth();

    const [incidentType, setIncidentType] = useState('');
    const [description, setDescription] = useState('');
    const [preferredDate, setPreferredDate] = useState(new Date());
    const [preferredTime, setPreferredTime] = useState('');
    const [consultant, setConsultant] = useState('');

    const handleFormSubmit = async () => {
        const user = auth.currentUser;

        if (user) {
            const consultationRequest = {
                userId: user.uid,
                userName: user.displayName || user.email,
                incidentType,
                description,
                preferredDate: preferredDate.toISOString(),
                preferredTime,
                consultant,
                status: 'pending',
                createdAt: new Date().toISOString()
            };

            try {
                await addDoc(collection(db, 'ConsultationRequests'), consultationRequest);
                Alert.alert('Success', 'Consultation scheduled successfully!');
                clearForm();
            } catch (error) {
                console.error("Error scheduling consultation: ", error);
                Alert.alert('Error', error.message);
            }
        } else {
            Alert.alert('Error', 'User not authenticated.');
        }
    };

    const clearForm = () => {
        setIncidentType('');
        setDescription('');
        setPreferredDate(new Date());
        setPreferredTime('');
        setConsultant('');
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Schedule a Consultation</Text>

            <Text style={styles.label}>Incident Type:</Text>
            <Picker
                selectedValue={incidentType}
                onValueChange={setIncidentType}
                style={styles.input}
            >
                <Picker.Item label="Select Incident Type" value="" />
                <Picker.Item label="Phishing" value="Phishing" />
                <Picker.Item label="Malware" value="Malware" />
                <Picker.Item label="Data Breach" value="Data Breach" />
            </Picker>

            <Text style={styles.label}>Description:</Text>
            <TextInput
                style={styles.input}
                multiline
                numberOfLines={4}
                onChangeText={setDescription}
                value={description}
            />

            <Text style={styles.label}>Preferred Date:</Text>
            {Platform.OS === 'web' ? (
                <TextInput
                    style={styles.input}
                    type="date"
                    onChange={(e) => setPreferredDate(new Date(e.target.value))}
                    value={preferredDate.toISOString().slice(0, 10)}
                />
            ) : (
                <DatePicker
                    date={preferredDate}
                    onDateChange={setPreferredDate}
                    mode="date"
                />
            )}

            <Text style={styles.label}>Preferred Time:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPreferredTime}
                value={preferredTime}
                placeholder="HH:MM"
            />

            <Text style={styles.label}>Pick a Consultant:</Text>
            <Picker
                selectedValue={consultant}
                onValueChange={setConsultant}
                style={styles.input}
            >
                <Picker.Item label="Select a Consultant" value="" />
                <Picker.Item label="Consultant A" value="Consultant A" />
                <Picker.Item label="Consultant B" value="Consultant B" />
                <Picker.Item label="Consultant C" value="Consultant C" />
            </Picker>

            <Button title="Schedule Consultation" onPress={handleFormSubmit} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    },
    label: {
        fontSize: 16,
        marginBottom: 10
    },
    input: {
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5
    }
});

export default ScheduleConsultation;



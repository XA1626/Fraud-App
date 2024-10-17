import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { TextInput, Button, Text, Provider as PaperProvider } from 'react-native-paper';
import { DatePickerInput, TimePickerModal } from 'react-native-paper-dates';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { format } from 'date-fns';
import emailjs from 'emailjs-com';
import { ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { FontAwesome } from "@expo/vector-icons"; // For back arrow and copy icon
import { useNavigation } from '@react-navigation/native'; // Importing useNavigation

const ScheduleConsultation = ({ onNavigateBack }) => { // Use the prop for navigation back
    const db = getFirestore();
    const auth = getAuth();
    const navigation = useNavigation(); // Initialize navigation hook

    const [incidentType, setIncidentType] = useState('');
    const [description, setDescription] = useState('');
    const [preferredDate, setPreferredDate] = useState(null);
    const [preferredTime, setPreferredTime] = useState(null);
    const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
    const [consultant, setConsultant] = useState('');

    const consultantEmails = {
        'Consultant A': 'dexter.jones.jobs@gmail.com', 
    };

    const openTimePicker = () => setIsTimePickerVisible(true);

    const onConfirmTime = ({ hours, minutes }) => {
        setPreferredTime({ hours, minutes });
        setIsTimePickerVisible(false);
    };

    const hideTimePicker = () => setIsTimePickerVisible(false);

    const sendEmail = (consultantEmail) => {
        const templateParams = {
            to_name: "Dexter Jones",
            consultant_email: consultantEmail,
            user_name: auth.currentUser.displayName || auth.currentUser.email,
            incident_type: incidentType,
            description: description,
            preferred_date: format(preferredDate, 'yyyy-MM-dd'),
            preferred_time: `${preferredTime.hours}:${preferredTime.minutes < 10 ? '0' : ''}${preferredTime.minutes}`,
        };

        emailjs.send('service_7kpnqus', 'template_0hvn23b', templateParams, 'flyN83W8OUBijaEyE')
            .then((response) => {
                console.log('Email sent:', response.text);
            }, (error) => {
                console.error('Email send error:', error);
            });
    };

    const handleFormSubmit = async () => {
        console.log("Button Pressed");
        try {
            const user = auth.currentUser;
            if (!user) {
                console.log("No authenticated user found");
                Alert.alert('Error', 'User not authenticated.');
                return;
            }
    
            if (!preferredDate || !preferredTime) {
                console.log("Invalid date or time");
                Alert.alert('Error', 'Please select a valid date and time.');
                return;
            }
    
            const now = new Date();
            const selectedDate = new Date(preferredDate);
            selectedDate.setHours(preferredTime.hours, preferredTime.minutes, 0);
    
            if (selectedDate < now) {
                console.log("Selected date/time is in the past");
                Alert.alert('Error', 'You cannot select a past date or time.');
                return;
            }
    
            const consultationRequest = {
                userId: user.uid,
                userName: user.displayName || user.email,
                incidentType,
                description,
                preferredDate: format(preferredDate, 'yyyy-MM-dd'),
                preferredTime: `${preferredTime.hours}:${preferredTime.minutes < 10 ? '0' : ''}${preferredTime.minutes}`,
                consultant,
                status: 'pending',
                createdAt: new Date().toISOString()
            };
    
            await addDoc(collection(db, 'ConsultationRequests'), consultationRequest);
            console.log("Consultation added to Firestore successfully");
            
            // Send confirmation email
            sendEmail(consultantEmails[consultant]);
    
            Alert.alert(
                'Consultation Booked',
                `Your consultation is booked for ${format(preferredDate, 'MMMM d, yyyy')} at ${preferredTime.hours}:${preferredTime.minutes < 10 ? '0' : ''}${preferredTime.minutes}.`,
                [
                    {
                        text: 'Confirm',
                        onPress: () => {
                            console.log("Navigation to Dashboard");
                            navigation.navigate('Dashboard'); // Navigate back to main screen
                        }
                    }
                ]
            );
        } catch (error) {
            console.error("Error scheduling consultation: ", error);
            Alert.alert('Error', error.message); // Adding a catch block to handle errors
        }
    };

    return (
        <PaperProvider>
            <ScrollView style={styles.container}>
                {/* Back Button */}
                <TouchableOpacity style={styles.backButton} onPress={onNavigateBack}>
                    <FontAwesome name="arrow-left" size={24} color="#000" />
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>

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
                    mode="outlined"
                    multiline
                    numberOfLines={4}
                    label="Describe the incident"
                    value={description}
                    onChangeText={setDescription}
                    style={styles.input}
                />

                <Text style={styles.label}>Preferred Date:</Text>
                <DatePickerInput
                    label="Select Date"
                    value={preferredDate}
                    onChange={setPreferredDate}
                    inputMode="start"
                    style={styles.input}
                />

                <Text style={styles.label}>Preferred Time:</Text>
                <Button mode="outlined" onPress={openTimePicker} style={styles.input}>
                    {preferredTime ? `${preferredTime.hours}:${preferredTime.minutes < 10 ? '0' : ''}${preferredTime.minutes}` : 'Pick a Time'}
                </Button>
                <TimePickerModal
                    visible={isTimePickerVisible}
                    onDismiss={hideTimePicker}
                    onConfirm={onConfirmTime}
                    hours={preferredTime ? preferredTime.hours : 12}
                    minutes={preferredTime ? preferredTime.minutes : 0}
                    label="Select Time"
                    cancelLabel="Cancel"
                    confirmLabel="Ok"
                />
                
                <Text style={styles.label}>Pick a Consultant:</Text>
                <Picker
                    selectedValue={consultant}
                    onValueChange={setConsultant}
                    style={styles.input}
                >
                    <Picker.Item label="Select a Consultant" value="" />
                    <Picker.Item label="Dexter" value="Consultant A" />
                    <Picker.Item label="Jeri" value="Consultant B" />
                    <Picker.Item label="Asif" value="Consultant C" />
                    <Picker.Item label="Owen" value="Consultant D" />
                    <Picker.Item label="Bradley" value="Consultant E" />
                </Picker>

                <Button
                    mode="contained"
                    onPress={handleFormSubmit}
                    style={styles.button}
                    labelStyle={{ fontSize: 20 }}
                >
                    Submit
                </Button>

                {/* Other form components */}
            </ScrollView>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    backButtonText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#000',
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
    },
    button: {
        marginTop: 20,
        padding: 10,
        marginBottom: 2,
    }
});

export default ScheduleConsultation;

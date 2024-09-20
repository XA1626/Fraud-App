import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { fetchEvents } from './firebase';  // Import fetchEvents from firebase.js

const CyberCalendarScreen = () => {
    const [events, setEvents] = useState({});
    const [loading, setLoading] = useState(true);

    // Fetch event data from Firestore
    useEffect(() => {
        const loadEventsIntoCalendar = async () => {
            const eventData = await fetchEvents();  // Fetch events from Firestore

            let eventDates = {};

            // Process each event and map it to the calendar format
            eventData.forEach(event => {
                if (event.date) {
                    eventDates[event.date] = {
                        marked: true,
                        dotColor: 'red'
                    };
                }
            });

            setEvents(eventDates);  // Set the processed event dates in the state
            setLoading(false);
        };

        loadEventsIntoCalendar();  // Call the function when the component mounts
    }, []);

    // Handle what happens when the user presses a date
    const onDayPress = (day) => {
        if (events[day.dateString]) {
            Alert.alert('Event', `You have an event on ${day.dateString}`);
        } else {
            Alert.alert('No Events', 'No events on this date.');
        }
    };

    // Show loading text while fetching events
    if (loading) {
        return (
            <View>
                <Text>Loading events...</Text>
            </View>
        );
    }

    return (
        <View>
            <Calendar
                onDayPress={onDayPress}  // Handle clicks on calendar days
                markedDates={events}  // Pass the marked event dates to the calendar
            />
        </View>
    );
};

export default CyberCalendarScreen;

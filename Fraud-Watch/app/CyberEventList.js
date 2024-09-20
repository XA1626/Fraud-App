import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const CyberEventList = ({ selectedDate }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Simulated event data with different dates
        const rawData = [
            {
                title: 'The Emergency Services Show 2024',
                date: '2024-09-18',
                location: 'Birmingham, United Kingdom',
                type: 'Conference',
                format: 'Physical',
            },
            {
                title: 'CyberSecurity Conference 2024',
                date: '2024-10-01',
                location: 'London, United Kingdom',
                type: 'Conference',
                format: 'Virtual',
            },
            {
                title: 'Tech Summit 2024',
                date: '2024-09-19',
                location: 'New York, USA',
                type: 'Summit',
                format: 'Physical',
            },
        ];

        // Log the selected date for debugging
        console.log('Selected Date:', selectedDate);

        // Filter events based on selected date
        const filteredEvents = rawData.filter(event => event.date === selectedDate);

        // Log the filtered events for debugging
        console.log('Filtered Events:', filteredEvents);

        setEvents(filteredEvents);
    }, [selectedDate]);

    return (
        <View style={styles.container}>
            {events.length > 0 ? (
                <FlatList
                    data={events}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.eventItem}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text>{item.date}</Text>
                            <Text>{item.location}</Text>
                            <Text>Type: {item.type}</Text>
                            <Text>Format: {item.format}</Text>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noEventsText}>No events for this day.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    eventItem: {
        marginBottom: 15,
        padding: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    noEventsText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default CyberEventList;

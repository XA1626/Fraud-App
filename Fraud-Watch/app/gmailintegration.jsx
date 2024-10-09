import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const GmailIntegration = ({ onNavigateBack }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Gmail Integration!</Text>

            {/* Back to Dashboard Button */}
            <TouchableOpacity style={styles.backButton} onPress={onNavigateBack}>
                <FontAwesome name="arrow-left" size={20} color="#fff" />
                <Text style={styles.backButtonText}>Back to Dashboard</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7130f1',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    backButtonText: {
        fontSize: 16,
        color: '#fff',
        marginLeft: 10,
    },
});

export default GmailIntegration;

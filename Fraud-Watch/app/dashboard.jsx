    import React, { useState, useEffect } from 'react';
    import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
    import { LinearGradient } from 'expo-linear-gradient';
    import { FontAwesome } from '@expo/vector-icons';

    const Dashboard = ({ userData, onNavigate }) => { 
        const [searchText, setSearchText] = useState('');

        const [filteredFeatures, setFilteredFeatures] = useState(['URL Checker', 'Cybersecurity News', 'Quiz', 'Gmail Integration', 'Fake User Generator', 'Resource', 'Check Email Breach']);

        useEffect(() => {
            // Optional: Add any effect to handle changes in userData if needed
        }, [userData]);

        // Function to handle searching among features
        const handleSearch = (text) => {
            setSearchText(text);
            const features = ['URL Checker', 'Cybersecurity News', 'Quiz', 'Gmail Integration', 'Fake User Generator'];
            const filtered = features.filter(feature => feature.toLowerCase().includes(text.toLowerCase()));
            setFilteredFeatures(filtered);
        };

        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <LinearGradient
                        colors={['#7130f1', '#e66f26']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.header}
                    >
                        <View style={styles.headerContent}>
                            <Image source={require('../assets/logo.png')} style={styles.logo} />
                            <View style={styles.headerTextContainer}>
                                <Text style={styles.title}>Fraud Watch</Text>
                                <Text style={styles.welcomeText}>Welcome, {userData?.firstName || 'User'}!</Text> 
                            </View>
                        </View>
                    </LinearGradient>

                    <View style={styles.searchContainer}>
                        <FontAwesome name="search" size={20} color="#333" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search"
                            value={searchText}
                            onChangeText={handleSearch}
                        />
                    </View>

                    {filteredFeatures.includes('URL Checker') && (
                        <TouchableOpacity style={styles.featureButton} onPress={() => onNavigate('UrlChecker')}>
                            <Image source={require('../assets/url-checker.png')} style={styles.featureImage} />
                            <Text style={styles.featureText}>URL Checker</Text>
                        </TouchableOpacity>
                    )}

                    {filteredFeatures.includes('Cybersecurity News') && (
                        <TouchableOpacity style={styles.featureButton} onPress={() => onNavigate('Newsfeed')}>
                            <Image source={require('../assets/cyber-news.png')} style={styles.featureImage} />
                            <Text style={styles.featureText}>Cybersecurity News</Text>
                        </TouchableOpacity>
                    )}

    {filteredFeatures.includes('Resource') && (
        <TouchableOpacity style={styles.featureButton} onPress={() => onNavigate('Resource')}>
            <Image source={require('../assets/resource.png')} style={styles.featureImage} />
            <Text style={styles.featureText}>Resource</Text>
        </TouchableOpacity>
    )}


                    {filteredFeatures.includes('Quiz') && (
                        <TouchableOpacity style={styles.featureButton} onPress={() => onNavigate('Quiz')}>
                            <Image source={require('../assets/quiz.png')} style={styles.featureImage} />
                            <Text style={styles.featureText}>Quiz</Text>
                        </TouchableOpacity>
                    )}

                    {filteredFeatures.includes('Gmail Integration') && (
                        <TouchableOpacity style={styles.featureButton} onPress={() => onNavigate('GmailIntegration')}>
                            <Image source={require('../assets/gmail.png')} style={styles.featureImage} />
                            <Text style={styles.featureText}>Gmail Integration</Text>
                        </TouchableOpacity>
                    )}

                    {filteredFeatures.includes('Fake User Generator') && (
                        <TouchableOpacity style={styles.featureButton} onPress={() => onNavigate('FakeUserGenerator')}>
                            <Image source={require('../assets/fakeusergen.png')} style={styles.featureImage} />
                            <Text style={styles.featureText}>Fake User Generator</Text>
                        </TouchableOpacity>
                    )}
                    
                    {filteredFeatures.includes('Check Email Breach') && (
                        <TouchableOpacity style={styles.featureButton} onPress={() => onNavigate('CheckEmail')}>
                            <Image source={require('../assets/email-check.png')} style={styles.featureImage} /> {/* Make sure to add this image */}
                            <Text style={styles.featureText}>Check Email Breach</Text>
                        </TouchableOpacity>
                    )}

                    <View style={styles.divider} />
                </ScrollView>

                <View style={styles.bottomNav}>
                    <TouchableOpacity onPress={() => onNavigate('Dashboard')}>
                        <FontAwesome name="home" size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onNavigate('ChatRoom')}>
                    <FontAwesome name="comments" size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onNavigate('Settings')}>
                        <FontAwesome name="cog" size={24} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            padding: 16,
        },
        scrollContainer: {
            paddingBottom: 20,
        },
        header: {
            height: 120,
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
        },
        headerContent: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%',
        },
        logo: {
            width: 50,
            height: 50,
        },
        headerTextContainer: {
            marginLeft: 10,
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff',
        },
        welcomeText: {
            fontSize: 14, 
            color: '#fff',
        },
        searchContainer: {
            flexDirection: 'row',
            padding: 10,
            backgroundColor: '#f0f0f0',
            borderRadius: 10,
            marginVertical: 10,
            alignItems: 'center',
        },
        searchInput: {
            marginLeft: 10,
            color: '#333',
            fontSize: 16,
            flex: 1,
        },
        featureButton: {
            width: '100%',
            height: 120,
            marginVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        featureImage: {
            width: '100%',
            height: '80%',
            borderRadius: 10,
        },
        featureText: {
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 8,
        },
        divider: {
            height: 1,
            backgroundColor: '#ccc',
            marginVertical: 10,
        },
        bottomNav: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 20,
            backgroundColor: '#fff',
        },
    });

    export default Dashboard;

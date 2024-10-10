        import React, { useEffect, useState } from 'react';
        import { ScrollView, View, Button, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Dimensions, Image } from 'react-native';
        import * as WebBrowser from 'expo-web-browser';
        import * as Google from 'expo-auth-session/providers/google';
        import axios from 'axios';
        import { FontAwesome } from 'react-native-vector-icons';
        import { LinearGradient } from 'expo-linear-gradient';

        const CLIENT_ID = '322586237838-65tjpbsqcrd5c7ddn99f94qcdcjoauf8.apps.googleusercontent.com';
        const googleApiKey = 'AIzaSyA9qRDwAfZqca4L1imLL8A3yeLdQBEdMOY';

        WebBrowser.maybeCompleteAuthSession();

        const GmailIntegration = ({ onNavigateBack }) => {
            const [request, response, promptAsync] = Google.useAuthRequest({
                clientId: CLIENT_ID,
                scopes: ['https://www.googleapis.com/auth/gmail.readonly'],
                redirectUri: 'http://localhost:8081', 
                prompt: 'select_account',
            });

            const [emails, setEmails] = useState([]);
            const [token, setToken] = useState(null);
            const [searchQuery, setSearchQuery] = useState('');
            const [loading, setLoading] = useState(false);
            const [emailCount, setEmailCount] = useState(0);
            const [scamCount, setScamCount] = useState(0); // To track suspicious emails
            const MAX_EMAILS = 30; 

            useEffect(() => {
                if (response?.type === 'success') {
                    const { authentication } = response;
                    setToken(authentication.accessToken);
                    fetchEmails(authentication.accessToken);
                }
            }, [response]);

            // Fetch Gmail emails
            const fetchEmails = async (accessToken, query = '') => {
                if (emailCount >= MAX_EMAILS) return;
                setLoading(true);
                try {
                    const res = await axios.get(
                        'https://www.googleapis.com/gmail/v1/users/me/messages',
                        {
                            headers: { Authorization: `Bearer ${accessToken}` },
                            params: { q: query, maxResults: 30 }, 
                        }
                    );

                    const messagePromises = res.data.messages.map(async (message) => {
                        const details = await axios.get(
                            `https://www.googleapis.com/gmail/v1/users/me/messages/${message.id}`,
                            {
                                headers: { Authorization: `Bearer ${accessToken}` },
                            }
                        );

                        // Extract the date and format it
                        const internalDate = new Date(parseInt(details.data.internalDate));
                        const formattedDate = formatDate(internalDate);

                        const snippet = details.data.snippet;
                        let isScam = false;

                        const suspiciousPatterns = ["urgent", "immediate action", "click here", "account risk"];
                        if (suspiciousPatterns.some((pattern) => snippet.toLowerCase().includes(pattern))) {
                            isScam = true;
                            setScamCount((prev) => prev + 1);
                        }

                        // Extract sender's information
                        const fromHeader = details.data.payload.headers.find(header => header.name === 'From');
                        const senderInfo = fromHeader ? fromHeader.value : 'Unknown Sender';
                        let senderName = senderInfo.split('<')[0].trim();
                        const defaultProfileImage = 'https://example.com/default-avatar.png';

                        return { ...details.data, isScam, snippet, senderName, profileImage: defaultProfileImage, formattedDate };
                    });

                    const emailData = await Promise.all(messagePromises);
                    setEmails((prevEmails) => [...prevEmails, ...emailData]);
                    setEmailCount((prevCount) => prevCount + emailData.length);
                } catch (error) {
                    console.error('Error fetching emails:', error);
                }
                setLoading(false);
            };

            // Format date to show "Today", "Yesterday" or date
            const formatDate = (date) => {
                const today = new Date();
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);

                if (date.toDateString() === today.toDateString()) {
                    return 'Today';
                } else if (date.toDateString() === yesterday.toDateString()) {
                    return 'Yesterday';
                } else {
                    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                }
            };

            // Handle search functionality
const handleSearch = () => {
    if (token) {
        const filteredEmails = emails.filter((item) => 
            item.senderName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setEmails(filteredEmails);
    }
};


            const { width } = Dimensions.get('window');

            return (
                <View style={styles.outerContainer}>
                    <View style={styles.container}>
                        {!token ? (
                            <View style={styles.loginContainer}>
                                <TouchableOpacity onPress={() => promptAsync()} disabled={!request}>
    <Image 
        source={require('../assets/google.png')} // Adjust the path based on your directory structure
        style={styles.googleButton} // Style the button as needed
    />
</TouchableOpacity>

                                <TouchableOpacity style={styles.topButton} onPress={onNavigateBack}>
                                    <FontAwesome name="arrow-left" size={20} color="#fff" />
                                    <Text style={styles.topButtonText}>Back to Dashboard</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.appContainer}>
                                {loading ? (
                                    <ActivityIndicator size="large" color="#7130f1" style={styles.loadingSpinner} />
                                ) : (
                                    <View style={{ flex: 1 }}>
                                        <LinearGradient
                                            colors={['#7130f1', '#e66f26']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            style={styles.topGradient}
                                        >
                                            <Text style={styles.header}>30 MESSAGES LIMIT</Text>
                                            <TouchableOpacity onPress={() => setToken(null)}>
                                                <FontAwesome name="sign-out" size={20} color="#fff" />
                                            </TouchableOpacity>
                                        </LinearGradient>

                                        <View style={styles.searchContainer}>
                                            <FontAwesome name="search" size={20} color="#fff" />
                                            <TextInput
                                                style={styles.searchInput}
                                                placeholder="Search emails"
                                                value={searchQuery}
                                                onChangeText={setSearchQuery}
                                            />
                                            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>SEARCH</Text>
    </TouchableOpacity>
                                        </View>

                                        <ScrollView contentContainerStyle={styles.scrollContainer}>
                                        {emails.map((item, index) => (
    <View key={`${item.id}-${index}`} style={styles.emailContainer}>
        <View style={styles.emailInfo}>
            <Text style={styles.senderName}>{item.senderName}</Text>
            <Text style={styles.emailDate}>{item.formattedDate}</Text>
            <Text style={[styles.emailText, item.isScam ? styles.scamEmail : null]}>
                {item.snippet}
            </Text>
        </View>
    </View>
))}

                                        </ScrollView>

                                        <LinearGradient
                                            colors={['#7130f1', '#e66f26']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            style={styles.bottomGradient}
                                        >
                                            <Text style={styles.suspiciousText}>{scamCount} Suspicious mail detected</Text>
                                            <TouchableOpacity style={styles.dashboardButton} onPress={onNavigateBack}>
                                                <Text style={styles.dashboardButtonText}>DASHBOARD</Text>
                                            </TouchableOpacity>
                                        </LinearGradient>
                                    </View>
                                )}
                            </View>
                        )}
                    </View>
                </View>
            );
        };

        const styles = StyleSheet.create({
            outerContainer: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
            },
            container: {
                width: 375, // Fixed width to simulate a mobile screen
                height: 667, // Fixed height (like an iPhone 7)
                backgroundColor: '#fff',
                borderRadius: 20,
                overflow: 'hidden',
            },
            loginContainer: {
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
            },
            appContainer: {
                flex: 1,
                justifyContent: 'space-between',
            },
            topGradient: {
                paddingHorizontal: 15,
                paddingVertical: 10, 
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            },
            header: {
                fontSize: 14,
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center',
            },
            searchContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                margin: 10,
                backgroundColor: '#000',
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 25,
            },
            searchInput: {
                color: '#fff',
                marginLeft: 6,
                flex: 1,
                
            },
            emailContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#ddd',
            },
          
            emailInfo: {
                flex: 1,
                justifyContent: 'center',
            },
            senderName: {
                fontWeight: 'bold',
                fontSize: 14,
            },
            emailDate: {
                fontSize: 12,
                color: '#777',
            },
            emailText: {
                fontSize: 12,
                marginTop: 4,
            },
            scamEmail: {
                backgroundColor: 'red',
                color: '#fff',
                padding: 10,
                borderRadius: 5,
            },
            bottomGradient: {
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center',
            },
            suspiciousText: {
                color: '#fff',
                fontSize: 14,
                marginBottom: 10,
            },
            dashboardButton: {
                backgroundColor: '#000',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
            },
            dashboardButtonText: {
                color: '#fff',
                fontSize: 14,
            },
            searchButton: {
                backgroundColor: '#fff',  // White background for the button
                paddingHorizontal: 15,
                paddingVertical: 8,
                borderRadius: 15,  // Oval shape
                marginLeft: 5,
            },
            searchButtonText: {
                color: '#000',  // Black text for the button
                fontWeight: 'bold',
            },

            googleButton: {
                width: 250,  // Adjust the width as per your design
                height: 50,  // Adjust the height as per your design
                resizeMode: 'contain',  // Ensures the image maintains its aspect ratio
                marginVertical: 20,  // Adds some space above and below the button
            },
            



            topButton: {
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#7130f1',
                padding: 12,
                borderRadius: 10,
            },
            topButtonText: {
                color: '#fff',
                marginLeft: 5,
            },
            loadingSpinner: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            },
            scrollContainer: {
                paddingBottom: 15,
            },
        });

        export default GmailIntegration;

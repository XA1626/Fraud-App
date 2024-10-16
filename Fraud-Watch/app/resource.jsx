import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';

const apiKey = 'YOUR_API_KEY_HERE';  // Replace with your API key
const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

const Resource = ({ onBack }) => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [bookmarks, setBookmarks] = useState([]);
    const [showBookmarks, setShowBookmarks] = useState(false);

    // Fetch AI content from the API
    const fetchAIContent = async (query) => {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: query }] }],
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    };

    // Handle search
    const handleSearch = async () => {
        setLoading(true);
        try {
            const data = await fetchAIContent(query);
            const content = data.candidates[0]?.content.parts[0]?.text || 'No result found.';
            setResult(content);
        } catch (error) {
            console.error("Error fetching data:", error);
            setResult('An error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    };

    // Add the result to bookmarks
    const handleBookmark = () => {
        if (result) {
            setBookmarks([...bookmarks, result]);
            alert('Result bookmarked!');
        } else {
            alert('No result to bookmark.');
        }
    };

    // Toggle showing bookmarks
    const toggleBookmarks = () => {
        setShowBookmarks(!showBookmarks);
    };

    return (
        <View style={styles.container}>
            {/* Back button */}
<TouchableOpacity onPress={onBack} style={styles.backButton}>
    <Text style={styles.backButtonText}>{'←'}</Text>
</TouchableOpacity>


            {/* Title */}
            <Text style={styles.title}>Ask anything about cybersecurity</Text>

            {/* Input and search button */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Ask a question..."
                    value={query}
                    onChangeText={setQuery}
                />
                <Button title={loading ? 'Searching...' : 'Search'} onPress={handleSearch} disabled={loading} />
            </View>

            {/* Bookmark and toggle buttons */}
            <View style={styles.bookmarkButtons}>
                <Button title="Bookmark Result" onPress={handleBookmark} />
                <Button title={showBookmarks ? 'Hide Bookmarks' : 'Show Bookmarks'} onPress={toggleBookmarks} />
            </View>

            {/* Show Bookmarks */}
            {showBookmarks && (
                <View style={styles.bookmarkContainer}>
                    <Text style={styles.bookmarkTitle}>Bookmarked Results:</Text>
                    {bookmarks.length === 0 ? (
                        <Text>No bookmarks yet.</Text>
                    ) : (
                        <ScrollView>
                            {bookmarks.map((bookmark, index) => (
                                <Text key={index} style={styles.bookmarkItem}>{bookmark}</Text>
                            ))}
                        </ScrollView>
                    )}
                </View>
            )}

            {/* Show Results */}
            <View style={styles.resultContainer}>
                <Text style={styles.resultTitle}>Results:</Text>
                {loading ? (
                    <ActivityIndicator size="large" color="#007AFF" />
                ) : (
                    <ScrollView>
                        <Text style={styles.resultText}>{result || 'No result available.'}</Text>
                    </ScrollView>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    backButton: {
        marginBottom: 10,
    },
    backButtonText: {
        fontSize: 18,
        color: '#007bff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    bookmarkButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    bookmarkContainer: {
        marginBottom: 20,
    },
    bookmarkTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    bookmarkItem: {
        fontSize: 16,
        marginVertical: 5,
    },
    resultContainer: {
        flex: 1,
    },
    resultTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    resultText: {
        fontSize: 16,
        lineHeight: 24,
    },
});

export default Resource;

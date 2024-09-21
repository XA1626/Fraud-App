<<<<<<< Updated upstream
import React, { useState } from 'react';

const apiKey = 'AIzaSyDQLyRdEwWobwh4kZHGiduWruv6CDiNG4w';
const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

const Resource = ({ onBack }) => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [bookmarks, setBookmarks] = useState([]);
    const [showBookmarks, setShowBookmarks] = useState(false); // 북마크 목록 표시 여부

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

    const handleSearch = async () => {
        setLoading(true);
        try {
            const data = await fetchAIContent(query);
            const content = data.candidates[0]?.content.parts[0]?.text || 'No result found.';
            setResult(content);
        } catch (error) {
            console.error("Error fetching data:", error);
            setResult('An error occurred while fetching data.');
=======
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, Button } from 'react-native';

const Resource = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');
    const apiKey = 'YOUR_API_KEY_HERE';

    const fetchResources = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: input }],
                    max_tokens: 100,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error('API call failed');
            }

            const json = await response.json();
            console.log('API response:', json); // API 응답 확인
            setData(json.choices[0].message.content);
        } catch (error) {
            console.error('Error fetching data:', error);
            setData('Error fetching data.');
>>>>>>> Stashed changes
        } finally {
            setLoading(false);
        }
    };

<<<<<<< Updated upstream
    const handleBookmark = () => {
        if (result) {
            setBookmarks([...bookmarks, result]);
            alert('Result bookmarked!');
        } else {
            alert('No result to bookmark.');
        }
    };

    const toggleBookmarks = () => {
        setShowBookmarks(!showBookmarks); // 북마크 목록 토글
    };

    // 텍스트에서 **를 제거하고 볼드 처리
    const formatResult = (text) => {
        const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return { __html: formattedText }; // HTML로 렌더링
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '350px',
            margin: 'auto',
            padding: '20px',
            borderRadius: '16px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Helvetica, Arial, sans-serif',
            backgroundColor: '#ffffff',
            height: '100vh',
            justifyContent: 'flex-start',
        }}>
            <button onClick={onBack} style={{
                alignSelf: 'flex-start',
                padding: '10px',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                marginBottom: '15px',
                fontSize: '18px',
                color: '#007bff',
            }}>
                {'←'} {/* 화살표 문자 */}
            </button>
            <h1 style={{ textAlign: 'center', fontSize: '18px', marginBottom: '15px', color: '#333' }}>
                Feel free to ask anything related to cybersecurity.
            </h1>
            <div style={{ marginBottom: '12px' }}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask a question..."
                    style={{
                        padding: '14px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '12px',
                        marginBottom: '0',
                        fontSize: '16px',
                        transition: 'border-color 0.3s',
                        outline: 'none',
                        width: 'calc(100% - 30px)',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#007bff'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
                <button onClick={handleSearch} disabled={loading} style={{
                    padding: '14px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s, transform 0.2s',
                    boxShadow: '0 4px 10px rgba(0, 123, 255, 0.2)',
                    marginLeft: '5px',
                }}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>
            <button onClick={handleBookmark} style={{
                padding: '10px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                marginTop: '10px',
            }}>
                Bookmark Result
            </button>
            <button onClick={toggleBookmarks} style={{
                padding: '10px',
                backgroundColor: '#ffc107',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                marginTop: '10px',
            }}>
                {showBookmarks ? 'Hide Bookmarks' : 'Show Bookmarks'}
            </button>
            {showBookmarks && (
                <div style={{
                    marginTop: '20px',
                    background: '#f0f0f0',
                    padding: '12px',
                    borderRadius: '12px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                }}>
                    <h3 style={{ margin: '0 0 10px', fontSize: '18px' }}>Bookmarked Results:</h3>
                    {bookmarks.length === 0 ? (
                        <p>No bookmarks yet.</p>
                    ) : (
                        <ul style={{ paddingLeft: '20px' }}>
                            {bookmarks.map((bookmark, index) => (
                                <li key={index} style={{ marginBottom: '8px', wordBreak: 'break-word' }}>
                                    {bookmark}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
            <div style={{
                marginTop: '20px',
                background: '#f9f9f9',
                padding: '12px',
                borderRadius: '12px',
                flex: '1',
                overflowY: 'auto',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            }}>
                <h3 style={{ margin: '0 0 10px', fontSize: '18px' }}>Results:</h3>
                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0 }}>
                    <span dangerouslySetInnerHTML={formatResult(result)} />
                </pre>
            </div>
        </div>
    );
};

=======
    const handleSearch = () => {
        fetchResources();
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#007AFF" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cybersecurity Resources</Text>
            <TextInput
                style={styles.input}
                placeholder="Ask for resources..."
                value={input}
                onChangeText={setInput}
            />
            <Button title="Search" onPress={handleSearch} />
            <Text>{data || 'No data available.'}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});

>>>>>>> Stashed changes
export default Resource;

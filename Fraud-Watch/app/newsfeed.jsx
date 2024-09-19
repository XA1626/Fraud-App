import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, FlatList, ActivityIndicator, TouchableOpacity, Linking, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Newsfeed = ({ onNavigateBack }) => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://newsapi.org/v2/everything?q=fraud OR scam OR cyberscam OR cyberfraud OR internet&apiKey=2c141af289074e068d032a212d1a5990'
      );
      const json = await response.json();
      setNews(json.articles);
      setFilteredNews(json.articles);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = news.filter(article =>
      article.title.toLowerCase().includes(query) ||
      (article.description && article.description.toLowerCase().includes(query))
    );
    setFilteredNews(filtered);
  };

  const handlePress = (url) => {
    Linking.openURL(url);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.url)} style={styles.featureButton}>
      <Image source={{ uri: item.urlToImage }} style={styles.featureImage} />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onNavigateBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Cybersecurity News</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} color="#333" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for news..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <FlatList
            data={filteredNews}
            renderItem={renderItem}
            keyExtractor={(item) => item.url}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
          />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10, // Adjusted padding for a more compact layout
  },
  header: {
    height: 80, // Reduced height for a more compact header
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 20,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 8, // Reduced padding for compactness
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
    height: 100, // Reduced height for news items
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  featureImage: {
    width: '100%',
    height: '60%', // Adjusted image height
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 14, // Reduced font size for compactness
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  flatListContent: {
    paddingHorizontal: 20,
  },
});

export default Newsfeed;

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator, TouchableOpacity, Linking, TextInput, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Newsfeed = ({ onNavigateBack }) => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);

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

  const handleBookmarkToggle = (article) => {
    if (bookmarks.some(bookmark => bookmark.url === article.url)) {
      setBookmarks(bookmarks.filter(bookmark => bookmark.url !== article.url));
    } else {
      setBookmarks([...bookmarks, article]);
    }
  };

  const handleShare = async (url) => {
    try {
      await Share.share({
        message: `${url}`,
      });
    } catch (error) {
      console.error("Error sharing: ", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.newsItem}>
      <TouchableOpacity onPress={() => handlePress(item.url)} style={styles.newsContent}>
        <Image source={{ uri: item.urlToImage }} style={styles.thumbnail} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleShare(item.url)} style={styles.threeDotsButton}>
        <Ionicons name="ellipsis-vertical" size={24} color="#4A90E2" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleBookmarkToggle(item)} style={styles.bookmarkButton}>
        <Ionicons
          name={bookmarks.some(bookmark => bookmark.url === item.url) ? 'bookmark' : 'bookmark-outline'}
          size={24}
          color="#4A90E2"
        />
      </TouchableOpacity>
    </View>
  );

  const renderLatestNews = () => {
    const latestNews = news.slice(0, 1); // 최신 뉴스 하나 가져오기
    return latestNews.map((item) => (
      <TouchableOpacity key={item.url} onPress={() => handlePress(item.url)} style={styles.latestNewsItem}>
        <Image source={{ uri: item.urlToImage }} style={styles.latestThumbnail} />
        <Text style={styles.latestTitle}>{item.title}</Text>
        <Text style={styles.latestDescription}>{item.description}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onNavigateBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#4A90E2" />
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Cybersecurity News</Text>
        <TouchableOpacity onPress={() => setShowBookmarks(!showBookmarks)} style={styles.bookmarkButton}>
          <Ionicons name="bookmark" size={24} color="#4A90E2" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" />
      ) : showBookmarks ? (
        <FlatList
          data={bookmarks}
          renderItem={renderItem}
          keyExtractor={(item) => item.url}
          style={styles.newsList}
        />
      ) : (
        <View style={styles.content}>
          <Text style={styles.trendingHeader}>TRENDING NEWS</Text>
          <View style={styles.latestNewsContainer}>
            {renderLatestNews()}
          </View>
          <FlatList
            data={filteredNews}
            renderItem={renderItem}
            keyExtractor={(item) => item.url}
            style={styles.newsList}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 20,
    textAlign: 'center',
  },
  bookmarkButton: {
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    borderColor: '#4A90E2',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 5,
    padding: 10,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  trendingHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 10,
    textAlign: 'center',
  },
  latestNewsContainer: {
    marginBottom: 20,
  },
  latestNewsItem: {
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  latestThumbnail: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 5,
  },
  latestTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  latestDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  newsItem: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  newsContent: {
    flexDirection: 'row',
    flex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  newsList: {
    flex: 1,
  },
  threeDotsButton: {
    padding: 10,
  },
});

export default Newsfeed;

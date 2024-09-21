import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { firestore, auth } from './firebase';
import { collection, addDoc, query, orderBy, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';  // Hook for navigation

const ChatRoom = ({ onNavigateBack }) => {  // Accept onNavigateBack as a prop for back navigation
  const navigation = useNavigation();  // Hook for navigation
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const dummy = useRef();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(firestore, "User", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUserName(userData.firstName);
        } else {
          console.log("No such document!");
        }
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const q = query(collection(firestore, 'messages'), orderBy('createdAt'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedMessages = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setMessages(fetchedMessages);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const sendMessage = async () => {
    if (newMessage.trim() === '' || !userName) return;

    try {
      await addDoc(collection(firestore, 'messages'), {
        text: newMessage,
        createdAt: new Date(),
        uid: user.uid,
        displayName: userName
      });
      setNewMessage('');
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Go back to the previous screen
  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();  // Navigate back to the previous screen
    } else {
      console.log('No previous screen in the navigation stack');
    }
  };

  const Dashboard = () => {
    if (onNavigateBack) {
      onNavigateBack();  // Call the passed-in onNavigateBack prop to navigate back
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ChatRoom</Text>
      <ScrollView>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <View style={item.uid === user.uid ? styles.sentMessage : styles.receivedMessage}>
              <Text style={styles.sender}>{item.displayName}</Text>
              <Text style={styles.message}>{item.text}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
        />
        <div ref={dummy}></div>
      </ScrollView>
      <TextInput
        style={styles.input}
        placeholder="Type a message..."
        value={newMessage}
        onChangeText={setNewMessage}
      />
      <TouchableOpacity
        onPress={sendMessage}
        disabled={!newMessage.trim()}
        style={[styles.sendbutton, !newMessage.trim() && styles.disabledButton]}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>

      {/* Custom styled back button */}
      <TouchableOpacity onPress={Dashboard} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    //color: '#20FE03',
    
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#20FE03',
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#03FEF1',
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  message: {
    fontSize: 16,
  },
  sender: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    marginBottom: 20,
  },
  sendbutton: {
    backgroundColor: '#0FFEF6',
    padding: 10,
    borderRadius: 100,
    alignItems: 'center',
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  backButton: {
    backgroundColor: '#FE03AA',
    padding: 10,
    borderRadius: 100,
    width: 250,
    alignItems: 'center',
    marginBottom: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ChatRoom;

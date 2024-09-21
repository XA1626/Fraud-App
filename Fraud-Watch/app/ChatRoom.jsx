import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button, ScrollView } from 'react-native';
import { firestore, auth } from './firebase'; // Import Firebase setup
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

// ChatRoom Component
const ChatRoom = () => {
  const [user, setUser] = useState(null); // Authenticated user
  const [messages, setMessages] = useState([]); // Messages from Firestore
  const [newMessage, setNewMessage] = useState(''); // Message to be sent
  const dummy = useRef(); // For scrolling to the bottom of the chat

  // Monitor authentication state and set user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch messages in real-time
  useEffect(() => {
    const q = query(collection(firestore, 'messages'), orderBy('createdAt'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, []);

  // Function to send a message
  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      await addDoc(collection(firestore, 'messages'), {
        text: newMessage,
        createdAt: new Date(),
        uid: user.uid,
        displayName: user.displayName || 'Anonymous'
      });
      setNewMessage(''); // Clear input field
      dummy.current.scrollIntoView({ behavior: 'smooth' }); // Scroll to bottom
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Please log in to access the chat.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Display messages */}
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

      {/* Message input and send button */}
      <TextInput
        style={styles.input}
        placeholder="Type a message..."
        value={newMessage}
        onChangeText={setNewMessage}
      />
      <Button title="Send" onPress={sendMessage} disabled={!newMessage.trim()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#EAEAEA',
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
});

export default ChatRoom;



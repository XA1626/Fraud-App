import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  Clipboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import { firestore, auth } from "./firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigation } from "@react-navigation/native"; // Hook for navigation

const ChatRoom = ({ onNavigateBack }) => {
  const navigation = useNavigation(); // Hook for navigation
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const charLimit = 100;
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
      const q = query(collection(firestore, "messages"), orderBy("createdAt"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedMessages = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMessages(fetchedMessages);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const sendMessage = async () => {
    if (newMessage.trim() === "" || !userName) return;

    try {
      await addDoc(collection(firestore, "messages"), {
        text: newMessage,
        createdAt: new Date(),
        uid: user.uid,
        displayName: userName,
      });
      setNewMessage("");
      dummy.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      await deleteDoc(doc(firestore, "messages", messageId));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const copyMessage = (text) => {
    Clipboard.setString(text);
    Alert.alert("Copied", "Message copied to clipboard");
  };

  const forwardMessage = (text) => {
    Alert.alert("Forward Message", `Forwarding message: "${text}"`);
  };

  const promptMessageOptions = (message) => {
    Alert.alert(
      "Message Options",
      "Choose an action",
      [
        {
          text: "Copy",
          onPress: () => copyMessage(message.text),
        },
        {
          text: "Forward",
          onPress: () => forwardMessage(message.text),
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteMessage(message.id),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      console.log("No previous screen in the navigation stack");
    }
  };

  const Dashboard = () => {
    if (onNavigateBack) {
      onNavigateBack();
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${day}/${month}/${year} ${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ChatRoom</Text>
      <ScrollView>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <TouchableOpacity
              onLongPress={() => {
                if (item.uid === user.uid) {
                  promptMessageOptions(item);
                }
              }}
            >
              <View
                style={
                  item.uid === user.uid
                    ? styles.sentMessageContainer
                    : styles.receivedMessageContainer
                }
              >
                <Text style={styles.timestamp}>
                  {formatTimestamp(item.createdAt?.toDate())}
                </Text>
                <View
                  style={
                    item.uid === user.uid
                      ? styles.sentMessage
                      : styles.receivedMessage
                  }
                >
                  <Text style={styles.sender}>{item.displayName}</Text>
                  <Text style={styles.message}>{item.text}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
        <div ref={dummy}></div>
      </ScrollView>
      <TextInput
        style={styles.input}
        placeholder="Type a message..."
        value={newMessage}
        onChangeText={(text) => setNewMessage(text)}
        maxLength={charLimit}
        onSubmitEditing={sendMessage}
        returnKeyType="send"
      />
      <Text
        style={styles.charCount}
      >{`${newMessage.length}/${charLimit}`}</Text>

      <LinearGradient
        colors={["#6a11cb", "#f7971e"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientButton}
      >
        <TouchableOpacity
          onPress={sendMessage}
          disabled={!newMessage.trim()}
          style={styles.sendbutton}
        >
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </LinearGradient>

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
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  sentMessageContainer: {
    alignSelf: "flex-end",
    marginVertical: 5,
    maxWidth: "75%",
  },
  receivedMessageContainer: {
    alignSelf: "flex-start",
    marginVertical: 5,
    maxWidth: "75%",
  },
  sentMessage: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    padding: 10,
    maxWidth: "100%", // Ensure it doesn't exceed the container
    flexShrink: 1,
    flexDirection: "column",
  },
  receivedMessage: {
    backgroundColor: "#E5E5EA",
    borderRadius: 10,
    padding: 10,
    maxWidth: "100%",
    flexShrink: 1,
    flexDirection: "column",
  },
  message: {
    fontSize: 16,
    color: "#fff",
  },
  sender: {
    fontWeight: "bold",
    marginBottom: 2,
    color: "#fff",
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
    marginBottom: 2,
    alignSelf: "flex-start",
  },
  input: {
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    marginBottom: 5,
  },
  charCount: {
    alignSelf: "flex-end",
    fontSize: 12,
    color: "#888",
    marginBottom: 15,
  },
  gradientButton: {
    borderRadius: 100,
    marginBottom: 10,
  },
  sendbutton: {
    padding: 10,
    borderRadius: 100,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  backButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 100,
    width: 250,
    alignItems: "center",
    marginBottom: 10,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default ChatRoom;

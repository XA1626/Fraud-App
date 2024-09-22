import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, TouchableOpacity, TextInput, Clipboard, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons'; // For back arrow and copy icon
import { Image } from 'react-native';

// Utility function to generate a random item from an array
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Generate a fake username
const generateUsername = () => {
    const animals = [
        'Lion', 'Tiger', 'Elephant', 'Eagle', 'Shark',
        'Giraffe', 'Penguin', 'Koala', 'Leopard', 'Cheetah',
        'Crocodile', 'Bear', 'Wolf', 'Zebra', 'Kangaroo',
        'Panda', 'Whale', 'Dolphin', 'Rhino', 'Hippo',
        'Falcon', 'Fox', 'Otter', 'Ostrich', 'Buffalo',
        'Jaguar', 'Bison', 'Pelican', 'Camel', 'Monkey',
        'Rabbit', 'Hawk', 'Gecko', 'Seal', 'Horse',
        'Antelope', 'Badger', 'Frog', 'Lynx', 'Mole',
        'Moose', 'Orca', 'Swan', 'Turtle', 'Vulture',
        'Beetle', 'Robin', 'Sparrow', 'Squirrel', 'Turkey'
    ];
    
    const vehicles = [
        'Car', 'Bike', 'Jet', 'Truck', 'Boat',
        'Helicopter', 'Submarine', 'Scooter', 'Bus', 'Train',
        'Bicycle', 'Tractor', 'Motorcycle', 'Van', 'ATV',
        'Skateboard', 'Rollerblade', 'Blimp', 'Spaceship', 'Segway',
        'Hovercraft', 'Raft', 'Yacht', 'SUV', 'Skiff',
        'Trolley', 'Moped', 'Cruiser', 'Ferry', 'JetSki',
        'Skidoo', 'Minivan', 'GolfCart', 'Snowmobile', 'Canoe',
        'Kayak', 'Lorry', 'Pickup', 'Dinghy', 'Tricycle',
        'Rickshaw', 'Motorboat', 'Speedboat', 'Glider', 'Hoverboard',
        'Unicycle', 'Rowboat', 'Sidecar', 'Tank', 'Cart'
    ];
    
    const firstNames = [
        'John', 'Alice', 'Max', 'Emma', 'Sarah',
        'James', 'Olivia', 'Liam', 'Sophia', 'Ethan',
        'Isabella', 'Noah', 'Mia', 'William', 'Charlotte',
        'Benjamin', 'Amelia', 'Lucas', 'Ava', 'Henry',
        'Jack', 'Grace', 'Logan', 'Hannah', 'Mason',
        'Ella', 'Jackson', 'Emily', 'Leo', 'Harper',
        'Alexander', 'Aiden', 'Madison', 'Daniel', 'Scarlett',
        'Matthew', 'Lily', 'Jacob', 'Aria', 'Samuel',
        'Wyatt', 'Mila', 'David', 'Zoe', 'Isaac',
        'Owen', 'Chloe', 'Elijah', 'Luna', 'Aaron'
    ];
    
    const fruitsOrVeggies = [
        'Apple', 'Orange', 'Banana', 'Carrot', 'Potato',
        'Strawberry', 'Broccoli', 'Cucumber', 'Tomato', 'Pineapple',
        'Mango', 'Peach', 'Pear', 'Grapes', 'Watermelon',
        'Lettuce', 'Spinach', 'Onion', 'Blueberry', 'Avocado',
        'Celery', 'Radish', 'Garlic', 'Pumpkin', 'Turnip',
        'Peas', 'Leek', 'Plum', 'Kiwi', 'Apricot',
        'Cherries', 'Cabbage', 'Peppers', 'Fennel', 'Cauliflower',
        'Corn', 'Beet', 'Melon', 'Kale', 'Fig',
        'Papaya', 'Tangerine', 'Olives', 'Dates', 'Passionfrt',
        'Coconut', 'Raspberry', 'Quince', 'Lemon', 'Lychee'
    ];

    const usernameParts = [
        getRandomItem(animals),
        getRandomItem(vehicles),
        getRandomItem(firstNames),
        getRandomItem(fruitsOrVeggies),
    ];

    // Shuffle parts randomly and join with a random 4-digit number
    return usernameParts.sort(() => Math.random() - 0.5).slice(0, 2).join('') + Math.floor(1000 + Math.random() * 9000);
};

// Generate a strong password
const generatePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    let password = '';
    
    while (!(/[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*()_+]/.test(password))) {
        password = Array.from({ length: 15 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    }
    
    return password;
};

// Generate a temp email based on the username
const generateTempEmail = (username) => {
    const domains = ['@tempmail.com', '@example.com', '@mailinator.com'];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    return `${username}${randomDomain}`;
};

const FakeUserGenerator = ({ onNavigate }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [tempEmail, setTempEmail] = useState('');

    // Function to copy text to clipboard
    const copyToClipboard = (text) => {
        Clipboard.setString(text);
        alert('Copied to clipboard!');
    };

    // Generate fake user credentials on button click
    const generateFakeUser = () => {
        const generatedUsername = generateUsername();
        setUsername(generatedUsername);
        setPassword(generatePassword());
        setTempEmail(generateTempEmail(generatedUsername));  // Generate email based on the username
    };

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => onNavigate('Dashboard')}>
                <FontAwesome name="arrow-left" size={24} color="#000" />
                <Text style={styles.backButtonText}></Text>
            </TouchableOpacity>
           
            <Image 
                source={require('../assets/fakeusergen2.jpg')}  // Adjust path to your image
                style={styles.image}
            />

            <Text style={styles.title}>Fake User Generator</Text>

            {/* Username Field */}
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} value={username} editable={false} placeholder="Generated Username" />
                <TouchableOpacity 
                    onPress={() => copyToClipboard(username)} 
                    style={{ alignSelf: 'flex-end', marginLeft: 10, top: -9 }}>
                    <FontAwesome name="copy" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            {/* Password Field */}
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} value={password} editable={false} placeholder="Generated Password" secureTextEntry />
                <TouchableOpacity 
                    onPress={() => copyToClipboard(username)} 
                    style={{ alignSelf: 'flex-end', marginLeft: 10, top: -9 }}>
                    <FontAwesome name="copy" size={24} color="#333" />
                </TouchableOpacity>

            </View>

            {/* Temp Mail Field */}
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} value={tempEmail} editable={false} placeholder="Temporary Email" />
                <TouchableOpacity 
                    onPress={() => copyToClipboard(username)} 
                    style={{ alignSelf: 'flex-end', marginLeft: 10, top: -9 }}>
                    <FontAwesome name="copy" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            {/* Generate Button */}
            <TouchableOpacity style={styles.button} onPress={generateFakeUser}>
                <Text style={styles.buttonText}>Generate Fake User</Text>
            </TouchableOpacity>
        </View>
    );
};

// Get device dimensions for responsive design
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',  // Consistent background color with Dashboard and Settings
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,  // Add padding to match other components
    },
    backButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 50 : 20, // Adjust based on platform (iOS/Android)
        left: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButtonText: {
        fontSize: 18,
        color: '#000',
        marginLeft: 10,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333', // Consistent text color
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
    },
    input: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        marginTop: 10,
    },
    buttonText: {
        color: '#333',
        fontSize: 18,
        fontWeight: '600',
    },
    image: {
        backgroundColor: '#fff',
        width: 200,
        height: 200,
    }
});

export default FakeUserGenerator;

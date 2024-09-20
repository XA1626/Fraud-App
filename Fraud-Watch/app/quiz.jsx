import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { db } from './firebaseConfig'; // Make sure this points to your Firebase configuration
import { collection, getDocs } from 'firebase/firestore';

const Quiz = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState({});
    const [loading, setLoading] = useState(true);
    const [quizComplete, setQuizComplete] = useState(false);
    const [score, setScore] = useState(0);

    // Load categories from Firestore
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const snapshot = await getDocs(collection(db, 'categories'));
                if (!snapshot.empty) {
                    const fetchedCategories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setCategories(fetchedCategories);
                } else {
                    console.log("No categories found.");
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
            setLoading(false);
        };

        fetchCategories();
    }, []);

    // Load questions for the selected category
    useEffect(() => {
        if (!selectedCategory) return;

        const fetchQuestions = async () => {
            setLoading(true);
            try {
                const snapshot = await getDocs(collection(db, 'categories', selectedCategory, 'questions'));
                if (!snapshot.empty) {
                    const fetchedQuestions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setQuestions(fetchedQuestions);
                } else {
                    console.log("No questions found in this category.");
                }
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
            setLoading(false);
        };

        fetchQuestions();
    }, [selectedCategory]);

    const handleAnswerSelect = (questionId, answer) => {
        setSelectedAnswer({ ...selectedAnswer, [questionId]: answer });
        const isCorrect = questions[currentQuestionIndex].correctAnswer === answer;
        if (isCorrect) setScore(score + 1);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizComplete(true);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (quizComplete) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Quiz Complete!</Text>
                <Text style={styles.title}>Score: {score}/{questions.length}</Text>
                <TouchableOpacity style={styles.button} onPress={() => setSelectedCategory('')}>
                    <Text style={styles.buttonText}>Restart Quiz</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!selectedCategory) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Select a Category</Text>
                {categories.map(category => (
                    <TouchableOpacity key={category.id} style={styles.button} onPress={() => setSelectedCategory(category.id)}>
                        <Text style={styles.buttonText}>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    }

    const question = questions[currentQuestionIndex];

    return (
        <View style={styles.container}>
            <Text style={styles.question}>{question.text}</Text>
            {question.answers.map((answer, index) => (
                <TouchableOpacity key={index} style={styles.button} onPress={() => handleAnswerSelect(question.id, answer)}>
                    <Text style={styles.buttonText}>{answer}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    question: {
        fontSize: 18,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    }
});

export default Quiz;


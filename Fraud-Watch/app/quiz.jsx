import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { firestore } from './firebase'; // Ensure this points to your Firebase setup
import { collection, getDocs } from 'firebase/firestore';

const Quiz = ({ onNavigateBack }) => {
    const [selectedCategory, setSelectedCategory] = useState(''); // Category ID
    const [selectedCategoryName, setSelectedCategoryName] = useState(''); // Category Name
    const [categories, setCategories] = useState([]); // List of categories
    const [questions, setQuestions] = useState([]); // List of questions for the selected category
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index of the current question
    const [selectedAnswers, setSelectedAnswers] = useState({}); // User's selected answers
    const [loading, setLoading] = useState(false); // Loading state
    const [quizResult, setQuizResult] = useState(null); // Result after quiz completion

    // Fetch categories from Firestore
    useEffect(() => {
        setLoading(true);
        const categoriesCol = collection(firestore, 'Quiz');
        getDocs(categoriesCol).then(snapshot => {
            if (snapshot.empty) {
                console.log("No categories found.");
                setCategories([]);
            } else {
                const categoriesList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().name || "Unnamed Category"
                }));
                setCategories(categoriesList);
            }
            setLoading(false);
        }).catch(error => {
            console.error("Error fetching categories:", error);
            setLoading(false);
        });
    }, []);

    // Fetch questions when a category is selected
    useEffect(() => {
        if (selectedCategory) {
            setLoading(true);
            const questionsCol = collection(firestore, 'Quiz', selectedCategory, 'questions');
            getDocs(questionsCol).then(snapshot => {
                if (!snapshot.empty) {
                    const questionsList = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setQuestions(questionsList);
                    setCurrentQuestionIndex(0);
                    setQuizResult(null); // Reset result when new category is selected
                } else {
                    setQuestions([]); // Clear questions if none are found
                }
                setLoading(false);
            }).catch(error => {
                console.error("Error fetching questions:", error);
                setLoading(false);
            });
        }
    }, [selectedCategory]);

    // Handle category selection
    const handleCategorySelect = (category) => {
        setSelectedCategory(category.id);
        setSelectedCategoryName(category.name);
    };

    // Handle answer selection and move to the next question or end quiz
    const handleAnswerSelect = (answer) => {
        const question = questions[currentQuestionIndex];
        setSelectedAnswers(prev => ({ ...prev, [question.id]: answer }));

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to next question
        } else {
            handleSubmitAnswers(); // End the quiz and show results
        }
    };

    // Submit the quiz and calculate the result
    const handleSubmitAnswers = () => {
        const correctCount = questions.reduce((acc, question) => {
            return acc + (selectedAnswers[question.id] === question.correctAnswer ? 1 : 0);
        }, 0);
        setQuizResult(`Quiz ended. You got ${correctCount} out of ${questions.length} correct.`);
    };

    // Go back to the dashboard (main menu)
    const goBackToDashboard = () => {
        if (onNavigateBack) {
            onNavigateBack();  // Call the passed-in onNavigateBack prop to navigate back
        }
    };

    // Render category selection screen
    if (!selectedCategory) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Select a Quiz Category</Text>
                {loading ? <ActivityIndicator size="large" color="#fff" /> : categories.map(cat => (
                    <TouchableOpacity key={cat.id} onPress={() => handleCategorySelect(cat)} style={styles.button}>
                        <Text style={styles.buttonText}>{cat.name}</Text>
                    </TouchableOpacity>
                ))}
                {/* Back to Dashboard button with a different color */}
                <TouchableOpacity onPress={goBackToDashboard} style={styles.backButton}>
                    <Text style={styles.buttonText}>Back to Dashboard</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Render quiz result screen
    if (quizResult) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{quizResult}</Text>
                <TouchableOpacity onPress={() => setSelectedCategory('')} style={styles.button}>
                    <Text style={styles.buttonText}>Back to Categories</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Render quiz question screen
    const currentQuestion = questions[currentQuestionIndex];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Questions for {selectedCategoryName}</Text>
            {loading || !currentQuestion ? <Text>Loading questions...</Text> : (
                <View>
                    <Text style={styles.questionText}>
                        Question {currentQuestionIndex + 1}:
                    </Text>
                    <Text style={styles.QsentenceText}>
                        {currentQuestion.question}
                    </Text>
                    <View style={styles.answersContainer}>
                        {currentQuestion.options.map((option, index) => (
                            <TouchableOpacity key={index} onPress={() => handleAnswerSelect(option)} style={styles.answerBubble}>
                                <Text style={styles.answerText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            )}
            {/* Back to Categories button */}
            <TouchableOpacity onPress={() => setSelectedCategory('')} style={styles.backButton}>
                <Text style={styles.buttonText}>Back to Categories</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 20,
    },
    title: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 20,
    },
    questionText: {
        fontSize: 30,
        color: '#0FFEF6',
        marginBottom: 10,
        fontFamily: 'Arial',
        textAlign: 'center',
    },
    QsentenceText: {
        fontSize: 18,
        color: '#fff',
        fontStyle: 'italic',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#0FFEF6',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginVertical: 10, // Add margin between buttons
        width: 250,
        alignItems: 'center',
    },
    backButton: {
        backgroundColor: '#FF6347',  // A different color for the back button (tomato red)
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginVertical: 10,
        width: 250,
        alignItems: 'center',
    },
    answersContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    answerBubble: {
        backgroundColor: '#AE0FFE', // Bubble color
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 50, // Rounded like a bubble
        marginVertical: 10,
        width: 250, // Ensure the bubbles are wider
        justifyContent: 'center', // Center the text vertically
        alignItems: 'center', // Center the text horizontally
    },
    answerText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center', // Ensure text is centered within the bubble
    },
});

export default Quiz;





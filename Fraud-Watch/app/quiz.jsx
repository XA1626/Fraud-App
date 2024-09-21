import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { firestore } from './firebase'; // Ensure this points to your Firebase setup
import { collection, getDocs } from 'firebase/firestore';

const Quiz = ({ navigation }) => {  // Accept navigation as a prop
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
            setCurrentQuestionIndex(currentQuestionIndex + 1);
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
        navigation.navigate('Dashboard');  // Navigates back to the dashboard screen
    };

    // Render category selection screen
    if (!selectedCategory) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Select a Quiz Category</Text>
                {loading ? <ActivityIndicator size="large" color="#fff" /> : categories.map(cat => (
                    <TouchableOpacity key={cat.id} onPress={() => handleCategorySelect(cat)} style={styles.categoryButton}>
                        <Text style={styles.categoryButtonText}>{cat.name}</Text>
                    </TouchableOpacity>
                ))}
                {/* Go Back to Dashboard Button */}
                <TouchableOpacity onPress={goBackToDashboard} style={styles.goBackButton}>
                    <Text style={styles.goBackButtonText}>Go Back to Dashboard</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Render quiz result screen
    if (quizResult) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{quizResult}</Text>
                <TouchableOpacity onPress={() => setSelectedCategory('')} style={styles.glowOnHover}>
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
                    {currentQuestion.options.map((option, index) => (
                        <TouchableOpacity key={index} onPress={() => handleAnswerSelect(option)} style={styles.glowOnHover}>
                            <Text style={[
                                styles.answerText,
                                selectedAnswers[currentQuestion.id] === option ? styles.selectedText : null
                            ]}>
                                {option}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
            <TouchableOpacity onPress={() => setSelectedCategory('')} style={styles.glowOnHover}>
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
    },
    
    buttonText: {
        color: '#fff',
        fontSize: 20,
    },
    goBackButton: {
        width: 220,
        height: 50,
        backgroundColor: '#ff6347',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
    },
    goBackButtonText: {
        color: '#fff',
        fontSize: 18,
    },
   
    answerText: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#AE0FFE',
        borderRadius: 5,
        textAlign: 'center',
    },
    categoryButton: {
        width: 250,
        height: 60,
        backgroundColor: '#0FFE27',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginBottom: 15,
        padding: 10,
    },
    categoryButtonText: {
        color: '#000',
        fontSize: 18,
    }
});

export default Quiz;


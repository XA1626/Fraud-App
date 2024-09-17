import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { db } from './firebase'; // Ensure this points to your Firebase setup
import { collection, getDocs } from 'firebase/firestore';

const Quiz = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCategoryName, setSelectedCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [quizResult, setQuizResult] = useState(null);

    useEffect(() => {
        setLoading(true);
        const categoriesCol = collection(db, 'Quiz');
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
        });
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            setLoading(true);
            const questionsCol = collection(db, 'Quiz', selectedCategory, 'questions');
            getDocs(questionsCol).then(snapshot => {
                if (!snapshot.empty) {
                    const questionsList = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setQuestions(questionsList);
                    setCurrentQuestionIndex(0);
                    setQuizResult(null);
                }
                setLoading(false);
            });
        }
    }, [selectedCategory]);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category.id);
        setSelectedCategoryName(category.name);
    };

    const handleAnswerSelect = (answer) => {
        const question = questions[currentQuestionIndex];
        setSelectedAnswers(prev => ({ ...prev, [question.id]: answer }));
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            handleSubmitAnswers();
        }
    };

    const handleSubmitAnswers = () => {
        const correctCount = questions.reduce((acc, question) => {
            return acc + (selectedAnswers[question.id] === question.answer ? 1 : 0);
        }, 0);
        setQuizResult(`Quiz ended. You got ${correctCount} out of ${questions.length}`);
    };

    if (!selectedCategory) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Select a Quiz Category</Text>
                {categories.map(cat => (
                    <TouchableOpacity key={cat.id} onPress={() => handleCategorySelect(cat)} style={styles.categoryButton}>
                        <Text style={styles.categoryButtonText}>{cat.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    }

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
                                            styles.answerText, // Apply the answerText style to the answer options
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
        flex: 1, // Fills the available screen space
        justifyContent: 'center', // Centers content vertically
        alignItems: 'center', // Centers content horizontally
        backgroundColor: '#000', // Sets a black background
        padding: 20, // Adds padding inside the container
    },
    title: {
        fontSize: 36, // Sets the title text size to 36px
        color: '#fff', // Sets the text color to white
        marginBottom: 20, // Adds space below the title
    },
    questionText: {
        fontSize: 30, // Sets the question text size to 50px for better readability
        color: '#0FFEF6', // Ensures the question text color is white
        marginBottom: 10, // Adds space below the question text
        fontFamily: 'Arial', // Assuming you have this font integrated in your project (React Native doesn't support all web fonts)
        textAlign: 'center',
        fontWeight: 'normal' // Normal font weight; change as needed
    },
    QsentenceText: {
        fontSize: 34, // For the actual question sentence
        color: '#fff', // Different color for the sentence
        fontStyle: 'italic', // Optional styling to differentiate it
    },
    /*glowOnHover: {
        width: 220, // Sets the button width to 220px
        height: 50, // Sets the button height to 50px
        backgroundColor: '#111', // Sets the button background to dark gray
        justifyContent: 'center', // Centers text vertically inside the button
        alignItems: 'center', // Centers text horizontally inside the button
        borderRadius: 10, // Rounds the corners of the button
        marginBottom: 10, // Adds space below the button
    },*/
    buttonText: {
        color: '#fff', // Sets the button text color to white
        fontSize: 20, // Sets the button text size to 20px
    },
    /*selectedText: {
        fontWeight: 'bold', // Makes the selected option text bold
        color: '#ff7300', // Sets the color of the selected text to a bright orange
    },*/
    answerText: {
        fontSize: 18, // Sets the font size for the answer options
        color: '#fff', // Sets the text color to white for the answer options
        marginBottom: 10, // Adds space between each answer
        padding: 10, // Adds padding to make the answer area easier to click/tap
        backgroundColor: '#AE0FFE', // Dark background for answers
        borderRadius: 5, // Rounded corners for answers
        textAlign: 'center', // Centers the answer text
    },
    categoryButton: {
        width: 250, // Larger width for category buttons
        height: 60, // Larger height for category buttons
        backgroundColor: '#0FFE27', // Dark background for category buttons
        justifyContent: 'center', // Centers text vertically inside the button
        alignItems: 'center', // Centers text horizontally inside the button
        borderRadius: 15, // More rounded corners for the category buttons
        marginBottom: 15, // Adds more space below each category button
        padding: 10, // Adds padding inside the button
    },
    categoryButtonText: {
        color: '#000', // Sets the text color to white
        fontSize: 24, // Larger font size for category names
    }
});



export default Quiz;

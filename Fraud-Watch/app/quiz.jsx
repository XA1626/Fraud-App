import React, { useEffect, useState } from 'react';
import { db } from './firebase'; // Ensure this import path is correct
import { collection, getDocs, query, where } from 'firebase/firestore';

const Quiz = () => {
    const [category, setCategory] = useState('');
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to handle fetching questions based on the category
    useEffect(() => {
        if (category) {
            const fetchQuestions = async () => {
                setLoading(true);
                try {
                    const questionsCol = query(collection(db, 'Quiz'), where('category', '==', category));
                    const snapshot = await getDocs(questionsCol);
                    if (!snapshot.empty) {
                        const questionsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                        setQuestions(questionsList);
                        console.log("Questions fetched:", questionsList); // Debugging log
                    } else {
                        console.log("No questions found for category:", category); // Debugging log
                    }
                } catch (error) {
                    console.error("Failed to fetch questions:", error); // Error handling
                }
                setLoading(false);
            };
            fetchQuestions();
        }
    }, [category]);

    // Function to handle category selection
    const handleCategorySelect = (selectedCategory) => {
        setCategory(selectedCategory);
    };

    // Initial category selection view
    if (!category) {
        return (
            <div>
                <h1>Select a Quiz Category</h1>
                <button onClick={() => handleCategorySelect('Payroll fraud')}>Payroll Fraud</button>
                {/* You can add more buttons for other categories as needed */}
            </div>
        );
    }

    // Loading state
    if (loading) return <p>Loading questions...</p>;

    // Display the questions or a no-questions-found message
    return (
        <div>
            <h1>{category} Quiz</h1>
            {questions.length > 0 ? (
                questions.map((question) => (
                    <div key={question.id}>
                        <h4>{question.question}</h4>
                        <ul>
                            {question.options.map((option, index) => (
                                <li key={index}>{option}</li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p>No questions found</p> // Displayed if no questions are fetched
            )}
        </div>
    );
};

export default Quiz;

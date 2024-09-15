import React, { useEffect, useState } from 'react';
import { db } from './firebase'; // Ensure this points to your firebase setup
import { collection, getDocs } from 'firebase/firestore';

const Quiz = () => {
    const [selectedCategory, setSelectedCategory] = useState(''); // Stores the ID of the selected category
    const [categories, setCategories] = useState([]); // Stores the fetched categories
    const [questions, setQuestions] = useState([]); // Stores the fetched questions for the selected category
    const [loading, setLoading] = useState(false); // Loading state

    // Fetch categories from Firestore on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            console.log("Fetching categories...");
            try {
                const categoriesCol = collection(db, 'Quizzes', 'FraudWatchQuiz', 'Categories');
                const snapshot = await getDocs(categoriesCol);
                
                if (snapshot.empty) {
                    console.log("No categories found in the database.");
                } else {
                    const categoriesList = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    console.log("Categories fetched: ", categoriesList); // Debugging log
                    setCategories(categoriesList);
                }
            } catch (error) {
                console.error("Error fetching categories:", error); // Error handling
            }
            setLoading(false);
        };

        fetchCategories();
    }, []);

    // Fetch questions when a category is selected
    useEffect(() => {
        if (selectedCategory) {
            const fetchQuestions = async () => {
                setLoading(true);
                console.log("Fetching questions for category: ", selectedCategory); // Debugging log
                try {
                    const questionsCol = collection(db, 'Quizzes', 'FraudWatchQuiz', 'Categories', selectedCategory, 'Questions');
                    const snapshot = await getDocs(questionsCol);
                    const questionsList = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    console.log("Questions fetched: ", questionsList); // Debugging log
                    setQuestions(questionsList);
                } catch (error) {
                    console.error("Error fetching questions:", error);
                }
                setLoading(false);
            };

            fetchQuestions();
        }
    }, [selectedCategory]);

    const handleCategorySelect = (categoryId) => {
        console.log("Category selected: ", categoryId); // Debugging log
        setSelectedCategory(categoryId);
    };

    // If no category has been selected, display the category buttons
    if (!selectedCategory) {
        return (
            <div>
                <h1>Select a Quiz Category</h1>
                {loading && <p>Loading categories...</p>}
                {!loading && categories.length === 0 && <p>No categories found.</p>}
                {!loading && categories.length > 0 && (
                    categories.map(cat => (
                        <button key={cat.id} onClick={() => handleCategorySelect(cat.id)}>
                            {cat.name}
                        </button>
                    ))
                )}
            </div>
        );
    }

    // Loading and question display state
    return (
        <div>
            {loading ? <p>Loading questions...</p> : (
                <div>
                    <h1>Questions for {selectedCategory}</h1>
                    {questions.length > 0 ? (
                        questions.map(question => (
                            <div key={question.id}>
                                <h4>{question.question}</h4>
                                <ul>
                                    {question.options.map(option => (
                                        <li key={option}>{option}</li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    ) : <p>No questions available for this category.</p>}
                    <button onClick={() => setSelectedCategory('')}>Back to Categories</button>
                </div>
            )}
        </div>
    );
};

export default Quiz;


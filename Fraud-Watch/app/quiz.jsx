import React, { useEffect, useState } from 'react';
import { db } from './firebase';
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
                    setQuizResult(null); // Reset quiz result on new category select
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
        }
    };

    const handleSubmitAnswers = () => {
        const correctCount = questions.reduce((acc, question) => {
            if (selectedAnswers[question.id] === question.answer) {
                return acc + 1;
            }
            return acc;
        }, 0);
        setQuizResult(`Quiz ended. You got ${correctCount} / ${questions.length}`);
    };

    if (!selectedCategory) {
        return (
            <div>
                <h1>Select a Quiz Category</h1>
                {loading ? <p>Loading categories...</p> : categories.map(cat => (
                    <button key={cat.id} onClick={() => handleCategorySelect(cat)}>
                        {cat.name}
                    </button>
                ))}
            </div>
        );
    }

    if (quizResult) {
        return (
            <div>
                <h1>{quizResult}</h1>
                <button onClick={() => setSelectedCategory('')}>Back to Categories</button>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div>
            <h1>Questions for {selectedCategoryName}</h1>
            {loading || !currentQuestion ? <p>Loading questions...</p> : (
                <div>
                    <h4>Question {currentQuestionIndex + 1}: {currentQuestion.question}</h4>
                    <ul>
                        {currentQuestion.options.map((option, index) => (
                            <li key={index} onClick={() => handleAnswerSelect(option)}
                                style={{ cursor: 'pointer', fontWeight: selectedAnswers[currentQuestion.id] === option ? 'bold' : 'normal' }}>
                                {option}
                            </li>
                        ))}
                    </ul>
                    {currentQuestionIndex === questions.length - 1 && (
                        <button onClick={handleSubmitAnswers}>Submit Answers</button>
                    )}
                </div>
            )}
            <button onClick={() => setSelectedCategory('')}>Back to Categories</button>
        </div>
    );
};

export default Quiz;

import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

const categories = [
  'Payroll fraud', 'Tax evasion', 'Phishing', 'Mortgage fraud', 'Card fraud',
  'Identity theft', 'Advance fee fraud', 'Check fraud', 'Remote desktop software',
  'Accounting fraud', 'Charity scams', 'Bank fraud', 'Insurance fraud',
  'Blackmail scams', 'Payment fraud', 'Account takeover', 'Ponzi schemes',
  'Asset misappropriation', 'Bribery', 'CNP fraud', 'Employment scams',
  'Grandparent scams', 'Investment fraud', 'IP infringement'
];

// You will need to organize your questions by category
const questionsByCategory = {
  'Phishing': [
    {
      type: 'True/False',
      question: 'An email from a known company asking for your password is likely a phishing scam.',
      options: ['True', 'False'],
      answer: 'True'
    },
    // More questions specific to Phishing...
  ],
  'Payroll fraud': [
    // True/False Questions
    { question: 'Ghost employees are a common type of payroll fraud.', options: ['True', 'False'], answer: 'True' },
    { question: 'It is legal to pad hours on a timesheet if the employee worked hard.', options: ['True', 'False'], answer: 'False' },
    { question: 'Payroll fraud only occurs in large corporations.', options: ['True', 'False'], answer: 'False' },
    { question: 'Salary advancements without proper authorization count as payroll fraud.', options: ['True', 'False'], answer: 'True' },
    { question: 'Using manual timekeeping systems significantly reduces the risk of payroll fraud.', options: ['True', 'False'], answer: 'False' },

    // Fill-in-the-blank Questions
    { question: 'Creating fictitious _______ is a method of committing payroll fraud.', options: ['workers', 'invoices', 'expenses'], answer: 'workers' },
    { question: 'Unauthorized _______ to payroll records can lead to fraud.', options: ['access', 'changes', 'deletions'], answer: 'access' },
    { question: 'Payroll fraud can be detected through regular _______ of financial records.', options: ['review', 'deletion', 'ignorance'], answer: 'review' },
    { question: 'Misclassifying employees as _______ can lead to payroll fraud.', options: ['contractors', 'managers', 'interns'], answer: 'contractors' },
    { question: 'Payroll _______ are a direct method of committing payroll fraud.', options: ['adjustments', 'bonuses', 'reductions'], answer: 'adjustments' },

    // Multiple Choice Questions
    { question: 'Which is a sign of potential payroll fraud?', options: ['Unexplained increase in payroll costs', 'Regular audits', 'Decreased payroll costs'], answer: 'Unexplained increase in payroll costs' },
    { question: 'Which department should regularly check for signs of payroll fraud?', options: ['Human Resources', 'Marketing', 'IT'], answer: 'Human Resources' },
    { question: 'What can help prevent payroll fraud?', options: ['Using automated payroll systems', 'Decreasing employee benefits', 'Limiting audits'], answer: 'Using automated payroll systems' },
    { question: 'Who is most likely to commit payroll fraud?', options: ['New employees', 'Long-term employees', 'Contractors'], answer: 'Long-term employees' },
    { question: 'How should payroll discrepancies be handled?', options: ['Ignore if minor', 'Investigate promptly', 'Discuss annually'], answer: 'Investigate promptly' },
    { question: 'A method to reduce payroll fraud includes:', options: ['Decreasing payroll audits', 'Increasing transparency in payroll processing', 'Limiting financial record access'], answer: 'Increasing transparency in payroll processing' },
    { question: 'Which action is a red flag for payroll fraud?', options: ['Employees asking for payroll details', 'Frequent changes in payroll records', 'Annual financial audits'], answer: 'Frequent changes in payroll records' },
    { question: 'How does segregating payroll duties help?', options: ['Increases efficiency', 'Prevents fraud', 'Reduces payroll cost'], answer: 'Prevents fraud' },
    { question: 'What role can technology play in preventing payroll fraud?', options: ['Speeding up payroll processing', 'Monitoring for anomalies', 'Reducing employee interaction'], answer: 'Monitoring for anomalies' },
    { question: 'What is NOT a sign of payroll fraud?', options: ['Consistent payroll costs', 'Unusual changes in payroll expenses', 'Multiple adjustments to payroll records'], answer: 'Consistent payroll costs' },
  ],
  // Add other categories similarly
};

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [questions, setQuestions] = useState([]);

  const startQuiz = (category) => {
    setCurrentCategory(category);
    setQuestions(questionsByCategory[category]);
    setCurrentQuestion(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
  };

  const handleAnswer = (option) => {
    if (option === questions[currentQuestion].answer) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      alert(`You've finished the quiz! Score: ${correctAnswers}/${questions.length} Correct, ${incorrectAnswers}/${questions.length} Incorrect`);
    }
  };

  if (!currentCategory) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Select a Category:</Text>
        {categories.map(category => (
          <TouchableOpacity key={category} style={styles.categoryButton} onPress={() => startQuiz(category)}>
            <Text style={styles.buttonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.scoreBox}>
        <Text style={styles.scoreText}>Right: {correctAnswers}</Text>
        <Text style={styles.scoreText}>Wrong: {incorrectAnswers}</Text>
      </View>
      <Text style={styles.question}>{questions[currentQuestion].question}</Text>
      {questions[currentQuestion].options.map((option) => (
        <TouchableOpacity key={option} style={styles.button} onPress={() => handleAnswer(option)}>
          <Text style={styles.buttonText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
    margin: 20,
  },
  scoreBox: {
    position: 'absolute',
    right: 20,
    top: 20,
    alignItems: 'flex-end',
  },
  scoreText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  question: {
    fontSize: 18,
    color: 'black',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'pink',
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  categoryButton: {
    backgroundColor: 'lightpink',
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
});






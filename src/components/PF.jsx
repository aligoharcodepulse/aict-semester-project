import { useState } from 'react';
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  FormControl,
  FormLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SubmittedModal from '../Models/SubmittedModel';

const PF = () => {
  const [answers, setAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [isSubmittedModalOpen, setIsSubmittedModalOpen] = useState(false);
  const navigate = useNavigate()
  const questions = [
    {
      id: 1,
      question: 'What is the correct syntax to output "Hello, World!" in C++?',
      options: [
        'printf("Hello, World!");',
        'System.out.println("Hello, World!");',
        'cout << "Hello, World!";',
        'print("Hello, World!");',
      ],
      correctAnswer: 'cout << "Hello, World!";',
    },
    {
      id: 2,
      question: 'Which of the following is the correct data type to store a single character in C++?',
      options: [
        'int',
        'float',
        'char',
        'string',
      ],
      correctAnswer: 'char',
    },
    {
      id: 3,
      question: 'Which of the following loops is guaranteed to execute at least once?',
      options: [
        'while loop',
        'do-while loop',
        'for loop',
        'None of the above',
      ],
      correctAnswer: 'do-while loop',
    },
    {
      id: 4,
      question: 'What is the purpose of the #include <iostream> directive in a C++ program?',
      options: ['To define user-defined functions', 
        'To declare variables', 
        'To initialize the main function', 
        'To include input/output stream libraries'],
      correctAnswer: 'To include input/output stream libraries',
    },
    {
      id: 5,
      question: 'What is the primary purpose of a compiler in programming?',
      options: [
        'To execute the program line by line',
        'To convert high-level code into machine code',
        'To debug runtime errors',
        'To format and beautify the source code',
      ],
      correctAnswer: 'To convert high-level code into machine code',
    },
  ];

  const handleChange = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    const score = questions.reduce((acc, question) => {
      if (answers[question.id] === question.correctAnswer) {
        acc += 2;
      }
      return acc;
    }, 0);
    setQuizResult({ score, total: questions.length * 2 }); // Store the result temporarily
    setIsSubmittedModalOpen(true);
  };
  
  const handleModalClose = () => {
    setIsSubmittedModalOpen(false);
    if (quizResult) {
      navigate('/quizSelection/result', { state: quizResult });
    }
  };

  return (
    <Box sx={{ padding: 3, minWidth: '100vw', margin: '0 auto',backgroundColor:'#f1f1f1' }}>
      <Typography variant="h4" sx={{m:2}}>
        Programming Fundamentals Quiz
      </Typography>
      {questions.map((q) => (
        <Box key={q.id} sx={{ marginBottom: 4 }}>
          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{fontSize:20}}>{q.question}</FormLabel>
            <RadioGroup
              name={`question-${q.id}`}
              value={answers[q.id] || ''}
              onChange={(e) => handleChange(q.id, e.target.value)}
            >
              {q.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <SubmittedModal open={isSubmittedModalOpen} onClose={handleModalClose} />
    </Box>
    
  );
};

export default PF;

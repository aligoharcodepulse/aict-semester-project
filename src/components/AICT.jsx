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

const AICT = () => {
  const [isSubmittedModalOpen, setIsSubmittedModalOpen] = useState(false);
  const [answers, setAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const navigate = useNavigate()
  const questions = [
    {
      id: 1,
      question: 'What does AICT stand for?',
      options: [
        'Artificial Intelligence and Computational Techniques',
        'Applications of Information and Communication Technology',
        'Applied Information and Computational Tools',
        'Automated Intelligent Computing Technologies',
      ],
      correctAnswer: 'Applications of Information and Communication Technology',
    },
    {
      id: 2,
      question: 'Which of the following is NOT a component of AICT?',
      options: [
        'Data Analysis',
        'Communication Systems',
        'Machine Learning',
        'Photosynthesis',
      ],
      correctAnswer: 'Photosynthesis',
    },
    {
      id: 3,
      question: 'What is a key benefit of AICT?',
      options: [
        'Improved decision-making through data',
        'Reduction in hardware costs',
        'Elimination of all manual work',
        'Complete automation of all industries',
      ],
      correctAnswer: 'Improved decision-making through data',
    },
    {
      id: 4,
      question: 'Which programming language is commonly used in AICT?',
      options: ['Python', 'HTML', 'CSS', 'SQL'],
      correctAnswer: 'Python',
    },
    {
      id: 5,
      question: 'What is the primary focus of AICT?',
      options: [
        'Building hardware devices',
        'Enhancing digital communication and data processing',
        'Developing video games',
        'Creating traditional business models',
      ],
      correctAnswer: 'Enhancing digital communication and data processing',
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
    <Box sx={{ padding: 3, minWidth: '100vw', margin: '0 auto', bgcolor:'#f1f1f1' }}>
      <Typography variant="h4" sx={{m:2}}>
        AICT Quiz
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

export default AICT;

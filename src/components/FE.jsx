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

const FE = () => {
  const [answers, setAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [isSubmittedModalOpen, setIsSubmittedModalOpen] = useState(false);
  const navigate = useNavigate()
  const questions = [
    {
      id: 1,
      question: 'Which of the following is a compound sentence?',
      options: [
        'The sun is shining brightly',
        'She enjoys reading, and he likes painting',
        'They went to the park after school',
        'Because it was raining, we stayed indoors',
      ],
      correctAnswer: 'She enjoys reading, and he likes painting',
    },
    {
      id: 2,
      question: 'What is the correct form of the verb in the sentence: "She ___ the book already"?',
      options: [
        'read',
        'is reading',
        'will read',
        'has read',
      ],
      correctAnswer: 'has read',
    },
    {
      id: 3,
      question: 'Identify the preposition in the sentence: "He walked across the bridge."',
      options: [
        'across',
        'He',
        'walked',
        'bridge',
      ],
      correctAnswer: 'across',
    },
    {
      id: 4,
      question: 'Choose the correct passive form of the sentence: "They are building a new library.',
      options: ['A new library is being built', 
        'A new library has been built', 
        'A new library was built', 
        'A new library will be built'
      ],
      correctAnswer: 'A new library is being built',
    },
    {
      id: 5,
      question: 'Which of the following is an example of a metaphor?',
      options: [
        'As brave as a lion',
        'The world is a stage',
        'The leaves rustled in the wind',
        'She is like a flower',
      ],
      correctAnswer: 'The world is a stage',
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
    <Box sx={{ padding: 3, minWidth: '100vw', margin:'0 auto', backgroundColor:'#f1f1f1' }}>
      <Typography variant="h4" gutterBottom>
        Functional English Quiz
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

export default FE;

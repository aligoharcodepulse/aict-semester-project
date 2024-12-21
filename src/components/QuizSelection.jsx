import {Grid, Button,FormHelperText,Typography, RadioGroup,Radio,FormControlLabel} from '@mui/material'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizSelection = () => {
  const [selectedQuiz, setSelectedQuiz] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    if (!selectedQuiz) {
      setError(true);
    } else {
      setError(false);
      // Navigate to the selected quiz page
      switch (selectedQuiz) {
        case 'Functional English':
          navigate('/quizSelection/functional-english');
          break;
        case 'Applications of ICT':
          navigate('/quizSelection/applications-of-ict');
          break;
        case 'Programming Fundamentals':
          navigate('/quizSelection/programming-fundamentals');
          break;
        default:
          break;
      }
    }
  };
  return (
    <>
    <Grid container style={{ minHeight: '100vh',minWidth:'100vw' }}>
      <Grid
        item
        xs={12}
        md={6}
        style={{
          backgroundImage: 'url(/images/quizSelection.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          backgroundColor:'grey',
          transition: 'transform 0.3s ease-in-out',
        }}
        className="hover-zoom"
      />
      <Grid
      item
      xs={12}
      md={6}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 20px',
        backgroundColor: '#f1f1f1',
        paddingTop: '50px',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{fontFamily:'serif', mb:3}}>
        Select Quiz
      </Typography>

      <RadioGroup
        value={selectedQuiz}
        onChange={(e) => setSelectedQuiz(e.target.value)}
        sx={{mb:3}}
      >
        <FormControlLabel
          value="Functional English"
          control={<Radio />}
          label="Functional English"
        />
        <FormControlLabel
          value="Applications of ICT"
          control={<Radio />}
          label="Applications of ICT"
        />
        <FormControlLabel
          value="Programming Fundamentals"
          control={<Radio />}
          label="Programming Fundamentals"
        />
      </RadioGroup>

      {error && (
        <FormHelperText style={{ color: 'red', margin: '10px 0', fontSize:'16px' }}>
          Please select a quiz before proceeding.
        </FormHelperText>
      )}

      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '20px',fontSize:16,padding:'10px 25px' }}
        onClick={handleStartQuiz}
      >
        Start Quiz
      </Button>

      </Grid>
    
    </Grid>
    </>
  )
}

export default QuizSelection;

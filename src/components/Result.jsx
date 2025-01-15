import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const Result = () => {
  const location = useLocation();
  const { score, total } = location.state || { score: 0, total: 0 };
  const [studentDetails, setStudentDetails] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    // Retrieve data from session storage
    const data = sessionStorage.getItem('studentDetails');
    if (data) {
      setStudentDetails(JSON.parse(data));
    }
  }, []);
  const isSuccess = score > 5;
  const handleLogOut = () => {
    signOut(auth).then(() => {
      navigate('/');
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };
  return (
    <Grid sx={{maxWidth:'100vw'}}>
    <Grid container justifyContent="flex-end" minWidth='100vw' backgroundColor= '#f9f9f9'>
      <Button onClick={handleLogOut} sx={{marginRight:4, marginTop:2, padding:'7px 20px', backgroundColor:'black', color:'white'}}
      >Log Out
      </Button>
    </Grid>
    
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: '100vh',minWidth:'100vw', backgroundColor: '#f9f9f9', padding: '20px', display:'flex', flexDirection:'column' }}
    >
      <Card
        sx={{
          textAlign: 'center',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          backgroundColor: isSuccess ? '#e8f5e9' : '#ffebee',
          p:8,
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: isSuccess ? '#2e7d32' : '#d32f2f', fontWeight: 'bold' }}
          >
            {isSuccess ? 'Congratulations!' : 'Better Luck Next Time!'}
          </Typography>
          {studentDetails && (
            <Box mb={3}>
              <Typography variant="body1" sx={{ marginBottom: '8px' }}>
                <strong>Name:</strong> {studentDetails.name}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: '8px' }}>
                <strong>Reg. No:</strong> {studentDetails.regNo}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                <strong>Department:</strong> {studentDetails.department}
              </Typography>
            </Box>
          )}
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
            Score: {score} / {total}
          </Typography>
          <Typography variant="body1" sx={{ color: '#555' }}>
            {isSuccess
              ? 'You performed excellently! Keep up the great work!'
              : 'Don’t give up! Keep trying, and success will follow.'}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    </Grid>
  );
};

export default Result;
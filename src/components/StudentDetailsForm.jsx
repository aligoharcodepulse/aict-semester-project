import { useState } from 'react';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';
import SubmittedModal from '../Models/SubmittedModel';
import '../App.css'
import { useNavigate } from 'react-router-dom';
const StudentDetailsForm = () => {
const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    regNo: '',
    department: '',
  });
  const [isSubmittedModalOpen, setIsSubmittedModalOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.regNo) newErrors.regNo = 'Reg. No is required';
    if (!formData.department) newErrors.department = 'Department is required';

    if (Object.keys(newErrors).length === 0) {
      sessionStorage.setItem('studentDetails', JSON.stringify(formData));
      setIsSubmittedModalOpen(true);
    }
    setErrors(newErrors);
  };
  const handleModalClose = () => {
    setIsSubmittedModalOpen(false);
    navigate('/quizSelection'); // Redirect to QuizSelection after closing the modal
  };

  return (
    <>
    
    <Grid container style={{ minHeight: '100vh',minWidth:'100vw' }}>
      {/* Left section with image */}
      <Grid
        item
        xs={12}
        md={6}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 20px',
          backgroundColor:'#f1f1f1',
          paddingTop:'50px'
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%',
            maxWidth: '400px',
            display: 'flex',
            flexDirection: 'column',
            gap:'15px'
          }}
        >
          <Typography
            variant="h4"
            component="legend"
            gutterBottom
            textAlign="center"
            fontFamily={'serif'}
          >
            Student Details Form
          </Typography>
          <TextField
            label="Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            margin="normal"
          />
          <TextField
            label="Reg. No"
            name="regNo"
            fullWidth
            value={formData.regNo}
            onChange={handleChange}
            error={!!errors.regNo}
            helperText={errors.regNo}
            margin="normal"
          />
          <TextField
            label="Department"
            name="department"
            fullWidth
            value={formData.department}
            onChange={handleChange}
            error={!!errors.department}
            helperText={errors.department}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2,p:1,fontSize:18,mb:9 }}
          >
            Submit
          </Button>
        </Box>
      </Grid>
      {/* Right section with form */}
      <Grid
        item
        xs={12}
        md={6}
        style={{
          backgroundImage: 'url(/images/quiz.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          backgroundColor:'grey',
          transition: 'transform 0.3s ease-in-out',
        }}
        className="hover-zoom"
      />
    </Grid>
    <SubmittedModal open={isSubmittedModalOpen} onClose={handleModalClose} />
    </>
  );
};

export default StudentDetailsForm;

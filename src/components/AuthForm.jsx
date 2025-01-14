import logoImage from '../../public/images/logo1.png';
import namalImage from '../../public/images/namal.png';
import { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import {
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    Typography,
    Box,
    Container,
    Avatar,
    FormControl,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUpActive, setIsSignUpActive] = useState(true);
    const [error, setError] = useState("");
    const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const handleSignUp = async () => {
        if (!email || !password) {
            setError('Email and Password both are required');
            return;
        }

        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;

            await sendEmailVerification(user);
            setOpenSuccessDialog(true);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSignIn = async () => {
        if (!email || !password) {
            setError('Email and Password both are required');
            return;
        }

        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;

            if (user.emailVerified) {
                navigate('/details-form');
            } else {
                setError('Please verify your email before logging in.');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleMethodChange = () => setIsSignUpActive(!isSignUpActive);

    return (
        <Grid container style={{ minHeight: '100vh', minWidth: '100vw' }}>
            {/* Left Section - Image */}
            <Grid
                item
                xs={12}
                md={6}
                style={{
                    backgroundImage: `url(${namalImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                    backgroundColor: '#d3d3d3',
                    transition: 'transform 0.3s ease-in-out',
                }}
                className="hover-zoom"
            />

            {/* Right Section - Form */}
            <Grid
                item
                xs={12}
                md={6}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 20px',
                    backgroundColor: '#f7f7f7',
                }}
            >
                <Container maxWidth="sm" sx={{ mt: 1 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingTop: 4,
                            paddingBottom: 7,
                            paddingLeft: 4,
                            paddingRight: 4,
                            marginLeft: 3,
                            width: '80%',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                            <Avatar alt="Logo" src={logoImage} sx={{ width: 130, height: 130 }} />
                        </Box>
                        <Typography variant="h4" gutterBottom>
                            {isSignUpActive ? 'Sign Up' : 'Sign In'}
                        </Typography>
                        <form>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <TextField
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </FormControl>
                            <Button
                                type="button"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ marginTop: 2, p:1,fontSize:16 }}
                                onClick={isSignUpActive ? handleSignUp : handleSignIn}
                            >
                                {isSignUpActive ? 'Sign Up' : 'Sign In'}
                            </Button>
                            {error && (
                                <Typography color="error" sx={{ marginTop: 2 }}>
                                    {error}
                                </Typography>
                            )}
                            <Button
                                type="button"
                                color="secondary"
                                onClick={handleMethodChange}
                                fullWidth
                                sx={{ marginTop: 2 }}
                            >
                                {isSignUpActive
                                    ? 'Already have an account? Sign In'
                                    : 'Do not have an account? Sign Up'}
                            </Button>
                        </form>
                    </Box>
                </Container>
            </Grid>
            <Dialog open={openSuccessDialog} onClose={() => setOpenSuccessDialog(false)}>
                <DialogTitle>Success</DialogTitle>
                <DialogContent>
                    <Typography color="primary" sx={{ textAlign: 'center' }}>
                        Account created successfully. Please check your email to verify your account.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenSuccessDialog(false)} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default AuthForm;
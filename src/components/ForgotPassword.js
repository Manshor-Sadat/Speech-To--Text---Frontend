import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Grid,
  Link,
  Alert,
} from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  maxWidth: '450px',
  width: '100%',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  width: theme.spacing(7),
  height: theme.spacing(7),
}));

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 'calc(100vh - 64px)',
});

const ForgotPassword = () => {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin-forgot-password';
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      // Here you would typically make an API call to your backend
      console.log('Password reset request for:', email);
      setSuccess(true);
      setError('');
      setEmail('');
    } catch (err) {
      setError('Failed to process password reset request');
    }
  };

  return (
    <StyledContainer>
      <StyledPaper elevation={6}>
        <StyledAvatar sx={{ bgcolor: isAdmin ? 'error.main' : 'primary.main' }}>
          <LockResetIcon sx={{ fontSize: 32 }} />
        </StyledAvatar>
        <Typography component="h1" variant="h4" gutterBottom sx={{ fontWeight: 500 }}>
          {isAdmin ? 'Admin Password Reset' : 'Password Reset'}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, textAlign: 'center', maxWidth: '80%' }}>
          Enter your {isAdmin ? 'admin ' : ''}email address and we'll send you instructions to reset your password.
        </Typography>
        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
            If an account exists with this email, you will receive password reset instructions shortly.
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
          <Grid container spacing={2} sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Grid item xs={12} sm={8}>
              <TextField
                name="email"
                required
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                variant="outlined"
                autoFocus
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color={isAdmin ? 'error' : 'primary'}
            sx={{ 
              mt: 4, 
              mb: 2,
              py: 1.5,
              fontSize: '1.1rem',
              width: '66.67%',
              display: 'block',
              margin: '2rem auto',
            }}
          >
            Send Reset Instructions
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link 
                href={isAdmin ? '/admin-login' : '/login'} 
                variant="body1" 
                sx={{ 
                  textDecoration: 'none',
                  color: isAdmin ? 'error.main' : 'primary.main'
                }}
              >
                Back to {isAdmin ? 'Admin ' : ''}Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default ForgotPassword; 
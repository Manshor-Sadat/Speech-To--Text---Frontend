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
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  padding: theme.spacing(6),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  width: '500px',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  width: theme.spacing(7),
  height: theme.spacing(7),
}));

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 'calc(100vh - 64px)', // Subtract AppBar height
});

const inputStyles = {
  '& .MuiOutlinedInput-root': {
    height: '56px',
    fontSize: '1.1rem',
    width: '400px',
  },
  '& .MuiInputLabel-root': {
    fontSize: '1.1rem',
    transform: 'translate(14px, 16px) scale(1)',
    '&.Mui-focused, &.MuiFormLabel-filled': {
      transform: 'translate(14px, -9px) scale(0.75)'
    }
  },
  marginBottom: '20px'
};

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('All fields are required');
      return false;
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // Here you would typically make an API call to your backend
      console.log('Login attempt:', formData);
      setSuccess(true);
      setError('');
      
      // Reset form
      setFormData({
        email: '',
        password: '',
      });

      // Redirect to index.html after successful login
      setTimeout(() => {
        window.location.href = 'http://localhost:8000/static/index.html';
      }, 1000); // Wait 1 second to show the success message
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <StyledContainer>
      <StyledPaper elevation={6}>
        <StyledAvatar>
          <LoginIcon sx={{ fontSize: 32 }} />
        </StyledAvatar>
        <Typography component="h1" variant="h4" gutterBottom sx={{ fontWeight: 500, mb: 4 }}>
          Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
            Login successful!
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            name="email"
            required
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            autoFocus
            sx={inputStyles}
          />
          <TextField
            name="password"
            required
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            sx={inputStyles}
          />
          <Box sx={{ 
            width: '400px',
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 1,
            mb: 3
          }}>
            <Link 
              href="/forgot-password" 
              variant="body2" 
              sx={{ 
                textDecoration: 'none'
              }}
            >
              Forgot Password?
            </Link>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  onChange={(e) => console.log('Remember me:', e.target.checked)}
                />
              }
              label="Remember me"
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ 
              width: '400px',
              py: 1.5,
              fontSize: '1.1rem',
              mb: 3
            }}
          >
            Login
          </Button>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="/signup" variant="body1" sx={{ textDecoration: 'none' }}>
              Don't have an account? Sign Up
            </Link>
            <Link href="/admin-login" variant="body1" sx={{ textDecoration: 'none' }}>
              Admin Login
            </Link>
          </Box>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Login; 
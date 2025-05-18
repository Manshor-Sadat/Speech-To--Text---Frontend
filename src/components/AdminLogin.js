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
  InputAdornment,
  IconButton,
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
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
  backgroundColor: theme.palette.error.main, // Different color for admin
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

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
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

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    if (!formData.username || !formData.password) {
      setError('All fields are required');
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
      console.log('Admin login attempt:', formData);
      setSuccess(true);
      setError('');
      
      // Reset form
      setFormData({
        username: '',
        password: '',
      });

      // Redirect to index.html after successful login
      setTimeout(() => {
        window.location.href = 'http://localhost:8000/static/index.html';
      }, 1000); // Wait 1 second to show the success message
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <StyledContainer>
      <StyledPaper elevation={6}>
        <StyledAvatar>
          <AdminPanelSettingsIcon sx={{ fontSize: 32 }} />
        </StyledAvatar>
        <Typography component="h1" variant="h4" gutterBottom sx={{ fontWeight: 500, mb: 4 }}>
          Admin Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
            Admin login successful!
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            name="username"
            required
            label="Admin Username"
            value={formData.username}
            onChange={handleChange}
            variant="outlined"
            autoFocus
            sx={inputStyles}
          />
          <TextField
            name="password"
            required
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            sx={inputStyles}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
              href="/admin-forgot-password" 
              variant="body2" 
              sx={{ 
                textDecoration: 'none',
                color: 'error.main'
              }}
            >
              Forgot Password?
            </Link>
            <FormControlLabel
              control={
                <Checkbox
                  color="error"
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
            color="error"
            sx={{ 
              width: '400px',
              py: 1.5,
              fontSize: '1.1rem',
              mb: 3
            }}
          >
            Login as Admin
          </Button>
          <Link href="/login" variant="body1" sx={{ textDecoration: 'none', color: 'error.main' }}>
            Back to User Login
          </Link>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default AdminLogin; 
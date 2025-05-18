import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { AppBar, Toolbar, Typography, Button, Container, CssBaseline, Box } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import ForgotPassword from './components/ForgotPassword';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const Logo = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <MicIcon sx={{ fontSize: 32 }} />
    <TextFieldsIcon sx={{ fontSize: 32 }} />
  </Box>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <Logo />
              <Typography variant="h6" component="div" sx={{ ml: 2 }}>
                Speech-to-Text App
              </Typography>
            </Box>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Sign Up
            </Button>
          </Toolbar>
        </AppBar>
        <Container>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin-forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={
              <Box sx={{
                marginTop: '4rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4
              }}>
                <Box sx={{
                  transform: 'scale(2)',
                  marginBottom: '2rem'
                }}>
                  <Logo />
                </Box>
                <Typography variant="h3" gutterBottom fontWeight="bold" color="primary">
                  Speech-to-Text App
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '600px', mb: 4 }}>
                  Transform your voice into text instantly with our powerful speech recognition tool.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    href="http://localhost:8000/static/index.html"
                    sx={{ px: 4, py: 1.5 }}
                  >
                    Start Transcribing
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    component={Link}
                    to="/signup"
                    sx={{ px: 4, py: 1.5 }}
                  >
                    Create Account
                  </Button>
                </Box>
              </Box>
            } />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;

import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../contexts/AuthContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import LockIcon from '@mui/icons-material/Lock';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(38.73deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0) 50%),
            linear-gradient(141.27deg, rgba(29, 78, 216, 0) 50%, rgba(29, 78, 216, 0.15) 100%);
  background-color: ${({ theme }) => theme.bg};
`;

const LoginCard = styled.div`
  background-color: ${({ theme }) => theme.card};
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(password);

    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.error);
      setPassword('');
    }

    setLoading(false);
  };

  return (
    <Container>
      <LoginCard>
        <div>
          <Title>
            <LockIcon fontSize="large" />
            Admin Login
          </Title>
          <Subtitle>Enter your password to access the admin panel</Subtitle>
        </div>

        {error && <Alert severity="error">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
            disabled={loading}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={loading || !password}
            sx={{
              padding: '12px',
              fontSize: '16px',
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
      </LoginCard>
    </Container>
  );
};

export default Login;

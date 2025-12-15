import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.bg};
`;

const LoadingSpinner = () => {
  return (
    <Container>
      <CircularProgress size={60} />
    </Container>
  );
};

export default LoadingSpinner;

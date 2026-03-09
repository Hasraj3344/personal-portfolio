import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowBack } from '@mui/icons-material';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.bg};
  padding: 20px;
`;

const ErrorCode = styled(motion.h1)`
  font-size: 150px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 100px;
  }

  @media (max-width: 480px) {
    font-size: 80px;
  }
`;

const Title = styled(motion.h2)`
  font-size: 36px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin: 20px 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const Description = styled(motion.p)`
  font-size: 18px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  max-width: 500px;
  margin: 10px 0 40px 0;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;

  ${({ $primary, theme }) => $primary ? `
    background: ${theme.primary};
    color: ${theme.text_primary};
    border: 2px solid ${theme.primary};

    &:hover {
      background: transparent;
      color: ${theme.primary};
    }
  ` : `
    background: transparent;
    color: ${theme.text_primary};
    border: 2px solid ${theme.border};

    &:hover {
      border-color: ${theme.primary};
      color: ${theme.primary};
    }
  `}

  &:active {
    transform: scale(0.95);
  }
`;

const Animation404 = styled(motion.div)`
  width: 300px;
  height: 300px;
  margin-bottom: 30px;
  position: relative;

  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }

  @media (max-width: 480px) {
    width: 200px;
    height: 200px;
  }
`;

const Circle = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid ${({ theme }) => theme.primary};
  border-radius: 50%;
  opacity: 0.3;
`;

const NotFound = () => {
  return (
    <Container>
      <Animation404>
        <Circle
          animate={{
            scale: [1, 1.2, 1],
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <Circle
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: -360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </Animation404>

      <ErrorCode
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        404
      </ErrorCode>

      <Title
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Page Not Found
      </Title>

      <Description
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </Description>

      <ButtonGroup
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Button to="/" $primary>
          <Home /> Go to Homepage
        </Button>
        <Button to="#" onClick={() => window.history.back()}>
          <ArrowBack /> Go Back
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default NotFound;

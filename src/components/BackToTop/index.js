import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyboardArrowUp } from '@mui/icons-material';

const BackToTopButton = styled(motion.button)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text_primary};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary + 'dd'};
    transform: translateY(-4px);
    box-shadow: 0 6px 20px rgba(96, 165, 250, 0.4);
  }

  &:active {
    transform: translateY(-2px);
  }

  svg {
    font-size: 28px;
  }

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    bottom: 20px;
    right: 20px;

    svg {
      font-size: 24px;
    }
  }
`;

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <BackToTopButton
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          aria-label="Scroll to top"
          title="Back to top"
        >
          <KeyboardArrowUp />
        </BackToTopButton>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;

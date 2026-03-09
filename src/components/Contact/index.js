import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { submitContactForm } from '../../services/api';
import { trackFormSubmission } from '../../services/analytics';
import { scrollReveal, slideUp } from '../../utils/animations';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import CircularProgress from '@mui/material/CircularProgress';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  
  @media (max-width: 960px) {
    padding: 0px;
  }

`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0px 0px 20px rgba(0,0,0,0.2);
  margin-top: 28px;
  gap: 12px;
  transition: all 0.3s ease-in-out;
  &:hover{
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
        transform: translateY(-5px);
    }
`;

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.button`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: linear-gradient(225deg, hsla(210, 100%, 56%, 1) 0%, hsla(222, 100%, 61%, 1) 100%);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(96, 165, 250, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 14px;
  margin-top: -8px;
  margin-bottom: 4px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ValidationIcon = styled.div`
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  pointer-events: none;
`;

const CharacterCounter = styled.div`
  font-size: 14px;
  color: ${({ theme, isNearLimit }) => isNearLimit ? '#ef4444' : theme.text_secondary};
  text-align: right;
  margin-top: -8px;
  margin-bottom: 4px;
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Contact = ({ setSnackbarOpen }) => {
  const form = useRef();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const isFieldValid = (fieldName) => {
    const value = formData[fieldName];

    if (!value || !value.trim()) return false;

    if (fieldName === 'email') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    if (fieldName === 'message') {
      return value.trim().length >= 10;
    }

    return true;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);

    try {
      // Execute reCAPTCHA
      if (executeRecaptcha) {
        const token = await executeRecaptcha('contact_form');
        console.log('[Contact] reCAPTCHA token generated:', token ? 'Success' : 'Failed');
      }

      // Store in Supabase
      await submitContactForm(formData);

      // Send email via EmailJS (existing functionality)
      await emailjs.sendForm(
        'service_iqjx776',
        'template_qm528hj',
        form.current,
        'vGyLAS9NpXZ5yd1_V'
      );

      // Track successful submission
      trackFormSubmission('contact_form', true);

      // Show success message
      toast.success('Message sent successfully! I will get back to you soon.');
      setSnackbarOpen?.(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      form.current.reset();
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Failed to send message. Please try again.');
      trackFormSubmission('contact_form', false);
    } finally {
      setLoading(false);
    }
  };

 
  return (
    <Container id='contact'>
      <Wrapper>
        <Title
          as={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scrollReveal}
        >
          Contact
        </Title>
        <Desc
          as={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scrollReveal}
        >
          Feel free to reach out to me for any questions or opportunities!
        </Desc>
        <ContactForm
          as={motion.form}
          ref={form}
          onSubmit={handleSubmit}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideUp}
        >
          <ContactTitle>Email Me 🚀</ContactTitle>

          <InputWrapper>
            <ContactInput
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={loading}
              aria-label="Your name"
              aria-invalid={!!errors.name}
              style={{ paddingRight: formData.name ? '40px' : '16px' }}
            />
            {formData.name && (
              <ValidationIcon>
                {isFieldValid('name') ? (
                  <CheckCircleIcon style={{ color: '#10b981', fontSize: '20px' }} />
                ) : (
                  <ErrorIcon style={{ color: '#ef4444', fontSize: '20px' }} />
                )}
              </ValidationIcon>
            )}
          </InputWrapper>
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}

          <InputWrapper>
            <ContactInput
              placeholder="Your Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={loading}
              aria-label="Your email"
              aria-invalid={!!errors.email}
              style={{ paddingRight: formData.email ? '40px' : '16px' }}
            />
            {formData.email && (
              <ValidationIcon>
                {isFieldValid('email') ? (
                  <CheckCircleIcon style={{ color: '#10b981', fontSize: '20px' }} />
                ) : (
                  <ErrorIcon style={{ color: '#ef4444', fontSize: '20px' }} />
                )}
              </ValidationIcon>
            )}
          </InputWrapper>
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

          <InputWrapper>
            <ContactInput
              placeholder="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              disabled={loading}
              aria-label="Subject"
              aria-invalid={!!errors.subject}
              style={{ paddingRight: formData.subject ? '40px' : '16px' }}
            />
            {formData.subject && (
              <ValidationIcon>
                {isFieldValid('subject') ? (
                  <CheckCircleIcon style={{ color: '#10b981', fontSize: '20px' }} />
                ) : (
                  <ErrorIcon style={{ color: '#ef4444', fontSize: '20px' }} />
                )}
              </ValidationIcon>
            )}
          </InputWrapper>
          {errors.subject && <ErrorMessage>{errors.subject}</ErrorMessage>}

          <MessageWrapper>
            <ContactInputMessage
              placeholder="Message"
              rows="4"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              disabled={loading}
              aria-label="Your message"
              aria-invalid={!!errors.message}
              maxLength={1000}
            />
            <CharacterCounter isNearLimit={formData.message.length > 900}>
              {formData.message.length}/1000
            </CharacterCounter>
          </MessageWrapper>
          {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}

          <ContactButton
            as={motion.button}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            type="submit"
            disabled={loading}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            {loading ? (
              <>
                <CircularProgress size={20} style={{ color: 'white' }} />
                Sending...
              </>
            ) : (
              'Send'
            )}
          </ContactButton>

          <div style={{ fontSize: '12px', color: '#666', marginTop: '8px', textAlign: 'center' }}>
            This site is protected by reCAPTCHA and the Google{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#60A5FA' }}>
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" style={{ color: '#60A5FA' }}>
              Terms of Service
            </a>{' '}
            apply.
          </div>
        </ContactForm>


      </Wrapper>
    </Container>
  );
};

export default Contact;

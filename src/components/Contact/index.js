import React, { useRef } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';


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

const ContactButton = styled.input`
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
  &:hover{
  border: 2px solid #fff,
  background-color: transparent,
  color: #fff,
  transform: translateY(5px);
  }
`;

const Contact = ({ setSnackbarOpen }) => {
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_iqjx776', 'template_qm528hj', form.current, 'vGyLAS9NpXZ5yd1_V')
      .then(() => {
        setSnackbarOpen?.(true);  // trigger Snackbar from parent
        
        form.current.reset();
      }, (error) => {
        alert("Failed to send email. Please try again.");
        console.error("EmailJS Error:", error.text);
      });

    emailjs.sendForm('service_iqjx776', 'template_qm0q3e9', form.current, 'vGyLAS9NpXZ5yd1_V')
      .then(() => {
        setSnackbarOpen?.(true);  // again trigger from parent
        form.current.reset();
      }, (error) => {
        alert("Failed to send email. Please try again.");
        console.error("EmailJS Error:", error.text);
      });
  };

 
  return (
    <Container id='contact'>
      <Wrapper>
        <Title>Contact</Title>
        <Desc>Feel free to reach out to me for any questions or opportunities!</Desc>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Email Me 🚀</ContactTitle>
          <ContactInput placeholder="Your Email" name="from_email" required />
          <ContactInput placeholder="Your Name" name="from_name" required />
          <ContactInput placeholder="Subject" name="subject" required />
          <ContactInputMessage placeholder="Message" rows="4" name="message" required />
          <ContactButton type="submit" value="Send" />
        </ContactForm>


      </Wrapper>
    </Container>
  );
};

export default Contact;

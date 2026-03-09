
import React, { useContext } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { DataContext } from '../../contexts/DataContext';
import EducationCard from '../Cards/EducationCard';
import { scrollReveal, staggerContainer, staggerItem } from '../../utils/animations';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    padding: 0px 0px 60px 0px;
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
    padding: 40px 0px 0px 0px;
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

const TimelineSection = styled.div`
    width: 100%;
    max-width: 1000px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    @media (max-width: 660px) {
        align-items: end;
    }
`;

const StyledTimelineConnector = styled(TimelineConnector)`
    background: linear-gradient(180deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.primary + '80'});
    box-shadow: 0 0 10px ${({ theme }) => theme.accentGlow};
`;

const Education = () => {
    const { education } = useContext(DataContext);

    if (!education || education.length === 0) return null;

    return (
        <Container id="education">
            <Wrapper>
                <Title
                    as={motion.div}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scrollReveal}
                >
                    Education
                </Title>
                <Desc
                    as={motion.div}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={scrollReveal}
                >
                    My education has been a journey of self-discovery and growth. My educational details are as follows.
                </Desc>
                <TimelineSection
                    as={motion.div}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={staggerContainer}
                >
                    <Timeline>
                        {education.map((edu,index) => (
                            <TimelineItem
                                as={motion.div}
                                key={edu.id}
                                variants={staggerItem}
                            >
                                <TimelineContent sx={{ py: '15px', px: 2 }}>
                                    <EducationCard education={edu}/>
                                </TimelineContent>
                                <TimelineSeparator>
                                    <TimelineDot variant="outlined" color="primary" />
                                    {index !== education.length -1  && <StyledTimelineConnector />}
                                </TimelineSeparator>
                            </TimelineItem>
                        ))}
                    </Timeline>

                </TimelineSection>
            </Wrapper>
        </Container>
    )
}

export default Education
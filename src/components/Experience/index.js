import React from 'react'
import styled from 'styled-components'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ExperienceCard from '../Cards/ExperienceCard';
import { experiences } from '../../data/constants';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    padding: 40px 0px 80px 0px;
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
    padding: 80px 0;
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
`;

const TimelineItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const TimelineItemContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
`;

const TimelineItemDate = styled.span`
    position: absolute;
    font-size: 10px;
    color: ${({ theme }) => theme.primary};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
`;

const index = () => {
    return (
        <Container id="experience">
            <Wrapper>
                <Title>Experience</Title>
                <Desc>
                    My work experience as a software engineer and working on different companies and projects.
                </Desc>
                <TimelineSection>
                    <Timeline>
                        {experiences.map((experience, index) => (
                            <TimelineItemContainer>
                                <TimelineItem>
                                    <TimelineSeparator>
                                        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                                            <TimelineDot variant="outlined" color='primary' />
                                            <TimelineItemDate>
                                                {experience.startDate}
                                            </TimelineItemDate>
                                        </div>
                                        {index !== experiences.length - 1 && (
                                            <TimelineConnector style={{ background: '#60A5FA' }} />
                                        )}
                                    </TimelineSeparator>
                                    <TimelineContent sx={{ py: '15px', px: 2 }}>
                                        <TimelineItemContent>
                                            <ExperienceCard experience={experience} />
                                        </TimelineItemContent>
                                    </TimelineContent>
                                </TimelineItem>
                            </TimelineItemContainer>
                        ))}
                    </Timeline>
                </TimelineSection>
            </Wrapper>
        </Container>
    )
}

export default index
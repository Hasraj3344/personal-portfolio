import React from 'react'
import styled from 'styled-components'

const Document = styled.img`
    display: none;
    height: 70px;
    width: fit-content;
    background-color: #000;
    border-radius: 10px;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    &:hover{
        cursor: pointer;
        opacity: 1;
    }
`


const Description = styled.div`
    position: relative;
    z-index: 1;
    width: 100%;
    font-size: 15px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_primary + '99'};
    margin-bottom: 10px;
    @media only screen and (max-width: 768px){
        font-size: 12px;
    }
`

const Span = styled.span`
overflow: hidden;
display: -webkit-box;
max-width: 100%;
-webkit-line-clamp: 4;
-webkit-box-orient: vertical;
text-overflow: ellipsis;
`

const Card = styled.div`
    width: 650px;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    background: ${({ theme }) => theme.glassBg};
    backdrop-filter: blur(${({ theme }) => theme.blur.sm});
    -webkit-backdrop-filter: blur(${({ theme }) => theme.blur.sm});
    border: 1px solid ${({ theme }) => theme.primary + '40'};
    box-shadow: ${({ theme }) => theme.shadowSm}, ${({ theme }) => theme.shadowGlow};

    justify-content: space-between;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 12px;
    transition: all 0.3s ease-in-out;

    /* Gradient overlay on hover */
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: ${({ theme }) => theme.gradientOverlay};
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
    }

    &:hover{
        box-shadow: ${({ theme }) => theme.shadowMd}, ${({ theme }) => theme.shadowGlow};
        transform: translateY(-5px);
        border-color: ${({ theme }) => theme.primary + '60'};
    }

    &:hover::after {
        opacity: 1;
    }

    @media only screen and (max-width: 768px){
        padding: 10px;
        gap: 8px;
        width: 300px;
    }

    &:hover ${Document}{
        display: flex;
    }

    &:hover ${Span}{
        overflow: visible;
        -webkit-line-clamp: unset;

    }
`

const Top = styled.div`
    position: relative;
    z-index: 1;
    width: 100%;
    display: flex;
    gap: 12px
`

const Image = styled.img`
    height: 50px;
    background-color: #fff;
    border-radius: 10px;
    margin-top: 4px;
    @media only screen and (max-width: 768px){
        height: 40px;
    }
`

const Body = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column; 
`


const Role = styled.div`
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary + 99};
    @media only screen and (max-width: 768px){
        font-size: 14px;
    }
`

const Company = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_secondary + 99};
    @media only screen and (max-width: 768px){
        font-size: 12px;
    }
`

const Date = styled.div`
    font-size: 12px;
    font-weight: 700;
    color: ${({ theme }) => theme.text_secondary + 80};
    @media only screen and (max-width: 768px){
        font-size: 10px;
    }
`


const Skills = styled.div`
    width: 100%;
    display: flex;
    gap: 12px;
    margin-top: -10px;
`

const ItemWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`

const Skill = styled.div`
    font-size: 15px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_primary + 99};
    @media only screen and (max-width: 768px){
        font-size: 12px;
    }
`



const ExperienceCard = ({ experience }) => {
    return (
        <Card>
            <Top>
                <Image src={experience.company_logo_url} />
                <Body>
                    <Role>{experience.role}</Role>
                    <Company>{experience.company}</Company>
                    <Date>{experience.date_range}</Date>
                </Body>
            </Top>
            <Description>
                {experience?.description &&
                    <Span>{experience?.description}</Span>

                }
                {experience?.skills_used &&
                    <>
                        <br />
                        <Skills>
                            <b>Skills:</b>
                            <ItemWrapper>
                                {experience?.skills_used?.map((skill, index) => (
                                    <Skill key={index}>• {skill}</Skill>
                                ))}
                            </ItemWrapper>
                        </Skills>
                    </>
                }
            </Description>

        </Card>
    )
}

export default ExperienceCard
import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { liftHover } from '../../utils/animations'


const Button = styled.button`
    display: none;
    width: 100%;
    padding: 10px;
    background-color: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.text_black};
    font-size: 14px;
    font-weight: 700;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.8s ease-in-out;
`
const Card = styled.div`
    position: relative;
    width: 100%;
    max-width: 400px;
    min-height: 480px;
    height: auto;
    background: ${({ theme }) => theme.glassBg};
    backdrop-filter: blur(${({ theme }) => theme.blur.md});
    -webkit-backdrop-filter: blur(${({ theme }) => theme.blur.md});
    border: 1px solid ${({ theme }) => theme.border + '40'};
    cursor: pointer;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    box-shadow: ${({ theme }) => theme.shadowSm}, ${({ theme }) => theme.shadowGlow};
    overflow: hidden;
    padding: 26px 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    /* Performance optimizations */
    will-change: auto;

    &:hover {
        will-change: transform, box-shadow, opacity;
    }

    /* Gradient overlay on hover */
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 200px;
        background: ${({ theme }) => theme.gradientOverlay};
        opacity: 0;
        transition: opacity 0.4s ease;
        pointer-events: none;
        z-index: 1;
    }

    &:hover {
        box-shadow: ${({ theme }) => theme.shadowMd},
                    ${({ theme }) => theme.shadowGlow},
                    0 0 60px ${({ theme }) => theme.accentGlow};
        border-color: ${({ theme }) => theme.primary + '60'};
    }

    &:hover::before {
        opacity: 1;
    }

    &:hover ${Button} {
        display: block;
    }

    @media only screen and (max-width: 768px) {
        max-width: 100%;
    }
`

const Image = styled.img`
    position: relative;
    z-index: 2;
    width: 100%;
    height: 180px;
    background-color: ${({ theme }) => theme.white};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    box-shadow: ${({ theme }) => theme.shadowSm};
    object-fit: cover;
    transition: transform 0.3s ease;

    ${Card}:hover & {
        transform: scale(1.02);
    }
`

const Tags = styled.div`
    position: relative;
    z-index: 2;
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
`

const Tag = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.primary + '15'};
    padding: 4px 10px;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    border: 1px solid ${({ theme }) => theme.primary + '30'};
    transition: all 0.3s ease;

    ${Card}:hover & {
        background-color: ${({ theme }) => theme.primary + '25'};
        border-color: ${({ theme }) => theme.primary + '50'};
    }
`

const Details = styled.div`
    position: relative;
    z-index: 2;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0px;
    padding: 0px 2px;
`
const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_secondary};
    overflow: hidden;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`

const Date = styled.div`
    font-size: 12px;
    margin-left: 2px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary + 80};
    @media only screen and (max-width: 768px){
        font-size: 10px;
    }
`


const Description = styled.div`
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary + 99};
    overflow: hidden;
    margin-top: 8px;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
`




const ProjectCards = ({project,setOpenModal}) => {
    return (
        <Card
            as={motion.div}
            variants={liftHover}
            initial="rest"
            whileHover="hover"
            onClick={() => setOpenModal({state: true, project: project})}
        >
            <Image src={project.image_url}/>
            <Tags>
                {project.tags?.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
                ))}
            </Tags>
            <Details>
                <Title>{project.title}</Title>
                <Date>{project.date_range}</Date>
                <Description>{project.description}</Description>
            </Details>
            {/* <Button>View Project</Button> */}
        </Card>
    )
}

export default ProjectCards
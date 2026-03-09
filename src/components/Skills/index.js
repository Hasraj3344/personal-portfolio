import React, { useContext } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { DataContext } from '../../contexts/DataContext'
import { scrollReveal, staggerContainer, staggerItem } from '../../utils/animations'

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
position: relative;
z-index: 1;
align-items: center;
`

const Wrapper = styled.div`
position: relative;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: column;
width: 100%;
max-width: 1100px;
gap: 12px;
@media (max-width: 960px) {
    flex-direction: column;
}
`

export const Title = styled.div`
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

export const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

const SkillsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  gap: 30px;
  justify-content: center;
  
`

const Skill = styled.div`
  width: 100%;
  max-width: 500px;
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.blur.sm});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.blur.sm});
  border: 1px solid ${({ theme }) => theme.primary + '40'};
  box-shadow: ${({ theme }) => theme.shadowMd}, ${({ theme }) => theme.shadowGlow};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 18px 36px;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.shadowLg}, ${({ theme }) => theme.shadowGlow};
    border-color: ${({ theme }) => theme.primary};
  }
  @media (max-width: 768px) {
    max-width: 400px;
    padding: 10px 36px;
  }
  @media (max-width: 500px) {
    max-width: 330px;
    padding: 10px 36px;
  }


`

const SkillTitle = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 20px;
  text-align: center;
`

const SkillList = styled.div`
  display: flex;
  justify-content: center; 
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
`

const SkillItem = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + '80'};
  border: 1px solid ${({ theme }) => theme.text_primary + '80'};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  background: transparent;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 20px ${({ theme }) => theme.accentGlow};
    border-color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary + '10'};
    color: ${({ theme }) => theme.text_primary};
  }
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 12px;
  }
  @media (max-width: 500px) {
    font-size: 14px;
    padding: 6px 12px;
  }
`

const SkillImage = styled.img`
  width: 24px;
  height: 24px;
`


const Skills = () => {
  const { skills } = useContext(DataContext);

  if (!skills || skills.length === 0) return null;

  return (
    <Container id="skills">
      <Wrapper>
        <Title
          as={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scrollReveal}
        >
          Skills
        </Title>
        <Desc
          as={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scrollReveal}
        >
          Here are some of my skills on which I have been working on for the past 4 years.
        </Desc>
        <SkillsContainer
          as={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {skills.map((skill, index) => (
            <Skill
              as={motion.div}
              key={skill.id}
              variants={staggerItem}
              whileHover={{ y: -8 }}
            >
              <SkillTitle>{skill.title}</SkillTitle>
              <SkillList>
                {skill.skills && skill.skills.map((item) => (
                  <SkillItem
                    as={motion.div}
                    key={item.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SkillImage src={item.image_url}/>
                    {item.name}
                  </SkillItem>
                ))}
              </SkillList>
            </Skill>
          ))}

        </SkillsContainer>
      </Wrapper>
    </Container>
  )
}

export default Skills
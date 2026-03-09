import React, { useContext } from 'react';
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container, Wrapper, Title, Desc, CardContainer, ToggleButtonGroup, ToggleButton, Divider } from './ProjectsStyle';
import ProjectCard from '../Cards/ProjectsCard.jsx';
import { DataContext } from '../../contexts/DataContext';
import { scrollReveal, staggerContainer, staggerItem } from '../../utils/animations';


const Projects = ({openModal,setOpenModal}) => {
  const { projects } = useContext(DataContext);
  const [toggle, setToggle] = useState('all');

  if (!projects || projects.length === 0) return null;

  return (
    <Container id="projects">
      <Wrapper>
        <Title
          as={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scrollReveal}
        >
          Projects
        </Title>
        <Desc
          as={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scrollReveal}
        >
          I have worked on a wide range of projects. From web apps to android apps. Here are some of my projects.
        </Desc>
        <ToggleButtonGroup
          as={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scrollReveal}
        >
          {toggle === 'all' ?
            <ToggleButton as={motion.button} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} active value="all" onClick={() => setToggle('all')}>All</ToggleButton>
            :
            <ToggleButton as={motion.button} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} value="all" onClick={() => setToggle('all')}>All</ToggleButton>
          }
          <Divider />
          {toggle === 'web app' ?
            <ToggleButton as={motion.button} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} active value="web app" onClick={() => setToggle('web app')}>WEB APP'S</ToggleButton>
            :
            <ToggleButton as={motion.button} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} value="web app" onClick={() => setToggle('web app')}>WEB APP'S</ToggleButton>
          }
          <Divider />
          {toggle === 'machine learning' ?
            <ToggleButton as={motion.button} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} active value="machine learning" onClick={() => setToggle('machine learning')}>MACHINE LEARNING</ToggleButton>
            :
            <ToggleButton as={motion.button} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} value="machine learning" onClick={() => setToggle('machine learning')}>MACHINE LEARNING</ToggleButton>
          }
        </ToggleButtonGroup>
        <CardContainer
          as={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <AnimatePresence mode="wait">
            {toggle === 'all' && projects
              .map((project) => (
                <motion.div key={project.id} variants={staggerItem}>
                  <ProjectCard project={project} openModal={openModal} setOpenModal={setOpenModal}/>
                </motion.div>
              ))}
            {projects
              .filter((item) => item.category === toggle)
              .map((project) => (
                <motion.div key={project.id} variants={staggerItem}>
                  <ProjectCard project={project} openModal={openModal} setOpenModal={setOpenModal}/>
                </motion.div>
              ))}
          </AnimatePresence>
        </CardContainer>
      </Wrapper>
    </Container>
  )
}

export default Projects
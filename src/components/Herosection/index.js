import React, { useContext } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import HeroBgAnimation from '../Bganimation'
import { HeroContainer, HeroBg, HeroLeftContainer, Img, HeroRightContainer, HeroInnerContainer, TextLoop, Title, Span, SubTitle, ResumeButton } from './HeroStyle'
import HeroImg from '../../images/HeroImage.jpg'
import { Typewriter } from 'react-simple-typewriter';
import { DataContext } from '../../contexts/DataContext';
import { slideInLeft, slideInRight } from '../../utils/animations';

const HeroSection = () => {
    const { bio } = useContext(DataContext);

    // Parallax scroll effect
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 150]); // Background moves down
    const y2 = useTransform(scrollY, [0, 500], [0, -50]); // Content moves up

    // Show nothing while loading or if no bio data (loading handled by App.js)
    if (!bio) return null;

    return (
        <div id="about">
            <HeroContainer>
                <HeroBg as={motion.div} style={{ y: y1 }}>
                    <HeroBgAnimation />
                </HeroBg>
                <HeroInnerContainer>
                    <HeroLeftContainer
                        as={motion.div}
                        initial="hidden"
                        animate="visible"
                        variants={slideInLeft}
                        style={{ y: y2 }}
                        id="Left"
                    >
                        <Title>Hi, I am <br /> {bio.name}</Title>
                        <TextLoop>
                            I am a
                            <Span>
                            <Typewriter
                            words={bio.roles}
                            loop={true}
                            cursor
                            cursorStyle="|"
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1000}
                            />

                            </Span>
                        </TextLoop>
                        <SubTitle>{bio.description}</SubTitle>
                        <ResumeButton
                            as={motion.a}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={bio.resume_url}
                            target='display'
                        >
                            Check Resume
                        </ResumeButton>
                    </HeroLeftContainer>

                    <HeroRightContainer
                        as={motion.div}
                        initial="hidden"
                        animate="visible"
                        variants={slideInRight}
                        id="Right"
                    >
                        <Img src={HeroImg} alt="hero-image" />
                    </HeroRightContainer>
                </HeroInnerContainer>

            </HeroContainer>
        </div>
    )
}

export default HeroSection
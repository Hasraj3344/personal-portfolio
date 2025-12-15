import React, { useContext } from 'react'
import HeroBgAnimation from '../Bganimation'
import { HeroContainer, HeroBg, HeroLeftContainer, Img, HeroRightContainer, HeroInnerContainer, TextLoop, Title, Span, SubTitle,SocialMediaIcons,SocialMediaIcon, ResumeButton } from './HeroStyle'
import HeroImg from '../../images/HeroImage.jpg'
import { Typewriter } from 'react-simple-typewriter';
import { DataContext } from '../../contexts/DataContext';

const HeroSection = () => {
    const { bio } = useContext(DataContext);

    // Show nothing while loading or if no bio data (loading handled by App.js)
    if (!bio) return null;

    return (
        <div id="about">
            <HeroContainer>
                <HeroBg>
                    <HeroBgAnimation />
                </HeroBg>
                <HeroInnerContainer >
                    <HeroLeftContainer id="Left">
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
                        <ResumeButton href={bio.resume_url} target='display'>Check Resume</ResumeButton>
                    </HeroLeftContainer>

                    <HeroRightContainer id="Right">

                        <Img src={HeroImg} alt="hero-image" />
                    </HeroRightContainer>
                </HeroInnerContainer>

            </HeroContainer>
        </div>
    )
}

export default HeroSection
import React, { useState } from "react";
import { Link as LinkR } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { Bio } from "../../data/constants";
import { MenuRounded } from "@mui/icons-material";
import ThemeToggle from "../ThemeToggle";

const Nav = styled.div`
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.blur.lg});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.blur.lg});
  border-bottom: 1px solid ${({ theme }) => theme.border + '40'};
  box-shadow: ${({ theme }) => theme.shadowSm};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;
const NavLogo = styled(LinkR)`
  display: flex;
  align-items: center;
  width: 80%;
  padding: 0 6px;
  font-weight: 1000;
  font-size: 18px;
  text-decoration: none;
  color: inherit;
`;

const NavItems = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primary};
    text-shadow: 0 0 10px ${({ theme }) => theme.accentGlow};
  }
`;

const ButtonContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 6px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const GithubButton = styled.a`
  border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
  text-decoration: none;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const MobileIcon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  padding: 0 6px;
  list-style: none;
  width: 100%;
  padding: 12px 40px 24px 40px;
  background: ${({ theme }) => theme.card_light + 99};
  position: absolute;
  top: 80px;
  right: 0;

  transition: all 0.6s ease-in-out;
  transform: ${({ isOpen }) =>
    isOpen ? "translateY(0)" : "translateY(-100%)"};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  z-index: ${({ isOpen }) => (isOpen ? "1000" : "-1000")};
`;

const SkipLink = styled.a`
  position: absolute;
  left: -9999px;
  z-index: 999;
  padding: 1rem;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  border-radius: 4px;

  &:focus {
    left: 50%;
    transform: translateX(-50%);
    top: 1rem;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  return (
    <>
      <SkipLink href="#about">Skip to main content</SkipLink>
      <Nav role="navigation" aria-label="Main navigation">
        <NavbarContainer>
          <NavLogo to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Home">
            <NavLink href="/">Haswanth Rajesh</NavLink>
          </NavLogo>

          <MobileIcon
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setIsOpen(!isOpen);
              }
            }}
          >
            <MenuRounded style={{ color: "inherit" }} />
          </MobileIcon>

          <NavItems role="menubar" aria-label="Desktop navigation">
            <NavLink href="#about" role="menuitem">About</NavLink>
            <NavLink href="#skills" role="menuitem">Skills</NavLink>
            <NavLink href="#experience" role="menuitem">Experience</NavLink>
            <NavLink href="#projects" role="menuitem">Projects</NavLink>
            <NavLink href="#education" role="menuitem">Education</NavLink>
            <NavLink href="#contact" role="menuitem">ContactMe</NavLink>
          </NavItems>

        {isOpen && (
          <MobileMenu isOpen={isOpen} role="menu" aria-label="Mobile navigation">
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#about" role="menuitem">
              About
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#skills" role="menuitem">
              Skills
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#experience" role="menuitem">
              Experience
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#projects" role="menuitem">
              Projects
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#education" role="menuitem">
              Education
            </NavLink>
            <NavLink onClick={() => setIsOpen(!isOpen)} href="#contact" role="menuitem">
              ContactMe
            </NavLink>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', width: '100%' }}>
              <ThemeToggle />
              <GithubButton
                href={Bio.linkedin}
                target="_Blank"
                aria-label="Visit LinkedIn profile"
                style={{
                  background: theme.primary,
                  color: theme.text_primary,
                  flex: 1,
                }}
              >
                LinkedIn Profile
              </GithubButton>
            </div>
          </MobileMenu>
        )}

        <ButtonContainer>
          <ThemeToggle />
          <GithubButton
            href={Bio.linkedin}
            target="_Blank"
            aria-label="Visit LinkedIn profile"
            style={{ marginLeft: '16px' }}
          >
            LinkedIn Profile
          </GithubButton>
        </ButtonContainer>
      </NavbarContainer>
    </Nav>
    </>
  );
};

export default Navbar;

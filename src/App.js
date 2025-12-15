import React, { useState } from "react";
import './App.css';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './utils/Themes';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from "./components/Herosection";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import Education from "./components/Education";
import ProjectDetails from "./components/ProjectDetails";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import styled from "styled-components";
import { Analytics } from "@vercel/analytics/react";
import { DataProvider } from './contexts/DataContext';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';
import { DataContext } from './contexts/DataContext';
import AdminLayout from './components/Admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import EditBio from './pages/Admin/EditBio';
import ManageSkills from './pages/Admin/ManageSkills';
import ManageExperience from './pages/Admin/ManageExperience';
import ManageEducation from './pages/Admin/ManageEducation';
import ManageProjects from './pages/Admin/ManageProjects';

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
`
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Wrapper = styled.div`
  background: linear-gradient(38.73deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0) 50%),
            linear-gradient(141.27deg, rgba(29, 78, 216, 0) 50%, rgba(29, 78, 216, 0.15) 100%);
width: 100%;
clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);

`

const PortfolioHome = ({ openModal, setOpenModal, snackbarOpen, setSnackbarOpen }) => {
  const { loading, error } = React.useContext(DataContext);

  if (loading) return <LoadingSpinner />;
  if (error) return <Body><div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>Error loading data: {error}</div></Body>;

  return (
    <Body>
      <HeroSection />
      <Wrapper>
        <Skills />
        <Experience />
      </Wrapper>
      <Projects openModal={openModal} setOpenModal={setOpenModal} />
      <Wrapper>
        <Education />
        <Contact setSnackbarOpen={setSnackbarOpen} />
      </Wrapper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ zIndex: 9999, position: 'fixed !important' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%', height: '60px' , bgcolor: 'green', color: 'white' }}>
          Email sent successfully!
        </Alert>
      </Snackbar>
      <Footer />
      {openModal.state &&
        <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
      }
    </Body>
  );
};

function App() {
  const [darkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <AuthProvider>
        <DataProvider>
          <Router>
            <Analytics />
            <Routes>
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="bio" element={<EditBio />} />
                <Route path="skills" element={<ManageSkills />} />
                <Route path="experience" element={<ManageExperience />} />
                <Route path="education" element={<ManageEducation />} />
                <Route path="projects" element={<ManageProjects />} />
              </Route>
              <Route path="/*" element={
                <>
                  <Navbar />
                  <PortfolioHome
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    snackbarOpen={snackbarOpen}
                    setSnackbarOpen={setSnackbarOpen}
                  />
                </>
              } />
            </Routes>
          </Router>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;


/* ####when ever made changes run this to update git so vercel will redeploy automatically
git add .
git commit -m "Describe your changes"
git push origin main
*/

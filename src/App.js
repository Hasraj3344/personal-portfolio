import React, { useState, lazy, Suspense, useEffect } from "react";
import './App.css';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from "./components/Navbar";
import SEO from "./components/SEO";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HeroSection from "./components/Herosection";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import styled from "styled-components";
import { Analytics } from "@vercel/analytics/react";
import { DataProvider } from './contexts/DataContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';
import { DataContext } from './contexts/DataContext';
import { Toaster } from 'react-hot-toast';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { initGA, trackPageView } from './services/analytics';

const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Experience = lazy(() => import('./components/Experience'));
const Education = lazy(() => import('./components/Education'));
const ProjectDetails = lazy(() => import('./components/ProjectDetails'));

const Login = lazy(() => import('./components/Login'));
const AdminLayout = lazy(() => import('./components/Admin/AdminLayout'));
const Dashboard = lazy(() => import('./pages/Admin/Dashboard'));
const EditBio = lazy(() => import('./pages/Admin/EditBio'));
const ManageSkills = lazy(() => import('./pages/Admin/ManageSkills'));
const ManageExperience = lazy(() => import('./pages/Admin/ManageExperience'));
const ManageEducation = lazy(() => import('./pages/Admin/ManageEducation'));
const ManageProjects = lazy(() => import('./pages/Admin/ManageProjects'));
const AdminAnalytics = lazy(() => import('./pages/Admin/Analytics'));
const ManageContacts = lazy(() => import('./pages/Admin/ManageContacts'));

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
      <SEO />
      <HeroSection />
      <Suspense fallback={<LoadingSpinner />}>
        <Wrapper>
          <Skills />
          <Experience />
        </Wrapper>
        <Projects openModal={openModal} setOpenModal={setOpenModal} />
        <Wrapper>
          <Education />
          <Contact setSnackbarOpen={setSnackbarOpen} />
        </Wrapper>
      </Suspense>
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
        <Suspense fallback={<div />}>
          <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
        </Suspense>
      }
    </Body>
  );
};

// Component to track page views
const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

function App() {
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Initialize Google Analytics on app load
  useEffect(() => {
    initGA();
  }, []);

  const recaptchaKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey || 'test-key'}>
      <ThemeProvider>
        <AuthProvider>
          <DataProvider>
            <Router>
              <PageTracker />
              <Analytics />
              <Toaster position="bottom-right" />
              <BackToTop />
              <Suspense fallback={<LoadingSpinner />}>
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
                  <Route path="analytics" element={<AdminAnalytics />} />
                  <Route path="contacts" element={<ManageContacts />} />
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
            </Suspense>
          </Router>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
    </GoogleReCaptchaProvider>
  );
}

export default App;


/* ####when ever made changes run this to update git so vercel will redeploy automatically
git add .
git commit -m "Describe your changes"
git push origin main
*/

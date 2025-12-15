import React, { createContext, useState, useEffect, useCallback } from 'react';
import {
  getBio,
  getSkillsWithCategories,
  getExperiences,
  getEducation,
  getProjects
} from '../services/api';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [bio, setBio] = useState(null);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [bioData, skillsData, experiencesData, educationData, projectsData] = await Promise.all([
        getBio(),
        getSkillsWithCategories(),
        getExperiences(),
        getEducation(),
        getProjects()
      ]);

      setBio(bioData);
      setSkills(skillsData);
      setExperiences(experiencesData);
      setEducation(educationData);
      setProjects(projectsData);
    } catch (err) {
      console.error('Error fetching portfolio data:', err);
      setError(err.message || 'Failed to load portfolio data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const refreshData = useCallback(() => {
    fetchAllData();
  }, [fetchAllData]);

  const value = {
    bio,
    skills,
    experiences,
    education,
    projects,
    loading,
    error,
    refreshData
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

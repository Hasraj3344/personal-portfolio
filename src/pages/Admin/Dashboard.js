import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../contexts/DataContext';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Paper
} from '@mui/material';
import {
  Person as PersonIcon,
  Code as CodeIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Folder as FolderIcon
} from '@mui/icons-material';

const Dashboard = () => {
  const { bio, skills, experiences, education, projects } = useContext(DataContext);
  const navigate = useNavigate();

  const statsCards = [
    {
      title: 'Bio',
      value: bio?.name || 'Not set',
      icon: <PersonIcon sx={{ fontSize: 48, color: '#60A5FA' }} />,
      path: '/admin/bio',
      description: 'Edit your personal information'
    },
    {
      title: 'Skills',
      value: skills?.reduce((acc, category) => acc + category.skills.length, 0) || 0,
      icon: <CodeIcon sx={{ fontSize: 48, color: '#60A5FA' }} />,
      path: '/admin/skills',
      description: `${skills?.length || 0} categories`
    },
    {
      title: 'Experience',
      value: experiences?.length || 0,
      icon: <WorkIcon sx={{ fontSize: 48, color: '#60A5FA' }} />,
      path: '/admin/experience',
      description: 'Work history entries'
    },
    {
      title: 'Education',
      value: education?.length || 0,
      icon: <SchoolIcon sx={{ fontSize: 48, color: '#60A5FA' }} />,
      path: '/admin/education',
      description: 'Educational background'
    },
    {
      title: 'Projects',
      value: projects?.length || 0,
      icon: <FolderIcon sx={{ fontSize: 48, color: '#60A5FA' }} />,
      path: '/admin/projects',
      description: 'Portfolio projects'
    }
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 700, color: '#fff' }}>
        Dashboard
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: '#9CA3AF' }}>
        Welcome to your portfolio admin panel. Manage all your content from here.
      </Typography>

      <Grid container spacing={3}>
        {statsCards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.title}>
            <Card
              sx={{
                bgcolor: '#1a1a1a',
                border: '1px solid #333',
                height: '100%'
              }}
            >
              <CardActionArea
                onClick={() => navigate(card.path)}
                sx={{
                  height: '100%',
                  '&:hover': {
                    bgcolor: '#252525'
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {card.icon}
                    <Box sx={{ ml: 2, flex: 1 }}>
                      <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>
                        {card.title}
                      </Typography>
                      <Typography variant="h4" sx={{ color: '#60A5FA', fontWeight: 700 }}>
                        {card.value}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                    {card.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper
        sx={{
          mt: 4,
          p: 3,
          bgcolor: '#1a1a1a',
          border: '1px solid #333'
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: '#fff', fontWeight: 600 }}>
          Quick Tips
        </Typography>
        <Box component="ul" sx={{ color: '#9CA3AF', m: 0, pl: 3 }}>
          <li>Click on any card above to manage that section</li>
          <li>Changes are saved directly to the database and reflect immediately on your portfolio</li>
          <li>Use the sidebar navigation to access different management sections</li>
          <li>Remember to upload images to get their URLs for logos and project images</li>
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;

import React, { useContext } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Container
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Code as CodeIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Folder as FolderIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
  { text: 'Edit Bio', icon: <PersonIcon />, path: '/admin/bio' },
  { text: 'Manage Skills', icon: <CodeIcon />, path: '/admin/skills' },
  { text: 'Manage Experience', icon: <WorkIcon />, path: '/admin/experience' },
  { text: 'Manage Education', icon: <SchoolIcon />, path: '/admin/education' },
  { text: 'Manage Projects', icon: <FolderIcon />, path: '/admin/projects' }
];

const AdminLayout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#0a0a0a' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          bgcolor: '#1a1a1a',
          borderBottom: '1px solid #333'
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: '#fff' }}>
            Portfolio Admin Panel
          </Typography>
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ color: '#fff' }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#1a1a1a',
            color: '#fff',
            borderRight: '1px solid #333'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#60A5FA' }}>
            Admin
          </Typography>
        </Toolbar>
        <Divider sx={{ bgcolor: '#333' }} />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  '&.Mui-selected': {
                    bgcolor: '#60A5FA20',
                    borderRight: '3px solid #60A5FA',
                    '& .MuiListItemIcon-root': {
                      color: '#60A5FA'
                    }
                  },
                  '&:hover': {
                    bgcolor: '#60A5FA10'
                  }
                }}
              >
                <ListItemIcon sx={{ color: '#fff' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#0a0a0a',
          p: 3,
          minHeight: '100vh',
          color: '#fff'
        }}
      >
        <Toolbar />
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default AdminLayout;

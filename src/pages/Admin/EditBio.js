import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { updateBio } from '../../services/api';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Chip,
  Stack
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';

const EditBio = () => {
  const { bio, refreshData } = useContext(DataContext);
  const [formData, setFormData] = useState({
    name: '',
    roles: [],
    description: '',
    resume_url: '',
    linkedin_url: '',
    instagram_url: ''
  });
  const [roleInput, setRoleInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (bio) {
      setFormData({
        name: bio.name || '',
        roles: bio.roles || [],
        description: bio.description || '',
        resume_url: bio.resume_url || '',
        linkedin_url: bio.linkedin_url || '',
        instagram_url: bio.instagram_url || ''
      });
    }
  }, [bio]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddRole = (e) => {
    if (e.key === 'Enter' && roleInput.trim()) {
      e.preventDefault();
      if (!formData.roles.includes(roleInput.trim())) {
        setFormData({
          ...formData,
          roles: [...formData.roles, roleInput.trim()]
        });
      }
      setRoleInput('');
    }
  };

  const handleDeleteRole = (roleToDelete) => {
    setFormData({
      ...formData,
      roles: formData.roles.filter(role => role !== roleToDelete)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');

    try {
      await updateBio(formData);
      await refreshData();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update bio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 700, color: '#fff' }}>
        Edit Bio
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: '#9CA3AF' }}>
        Update your personal information and professional summary
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Bio updated successfully!
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 3,
          bgcolor: '#1a1a1a',
          border: '1px solid #333'
        }}
      >
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': { borderColor: '#333' },
                '&:hover fieldset': { borderColor: '#60A5FA' },
                '&.Mui-focused fieldset': { borderColor: '#60A5FA' }
              },
              '& .MuiInputLabel-root': { color: '#9CA3AF' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#60A5FA' }
            }}
          />

          <Box>
            <TextField
              fullWidth
              label="Add Role"
              value={roleInput}
              onChange={(e) => setRoleInput(e.target.value)}
              onKeyDown={handleAddRole}
              placeholder="Type a role and press Enter"
              helperText="Press Enter to add each role"
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: '#333' },
                  '&:hover fieldset': { borderColor: '#60A5FA' },
                  '&.Mui-focused fieldset': { borderColor: '#60A5FA' }
                },
                '& .MuiInputLabel-root': { color: '#9CA3AF' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#60A5FA' },
                '& .MuiFormHelperText-root': { color: '#9CA3AF' }
              }}
            />
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.roles.map((role, index) => (
                <Chip
                  key={index}
                  label={role}
                  onDelete={() => handleDeleteRole(role)}
                  sx={{
                    bgcolor: '#60A5FA20',
                    color: '#60A5FA',
                    border: '1px solid #60A5FA',
                    '& .MuiChip-deleteIcon': {
                      color: '#60A5FA',
                      '&:hover': { color: '#93C5FD' }
                    }
                  }}
                />
              ))}
            </Box>
          </Box>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': { borderColor: '#333' },
                '&:hover fieldset': { borderColor: '#60A5FA' },
                '&.Mui-focused fieldset': { borderColor: '#60A5FA' }
              },
              '& .MuiInputLabel-root': { color: '#9CA3AF' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#60A5FA' }
            }}
          />

          <TextField
            fullWidth
            label="Resume URL"
            name="resume_url"
            value={formData.resume_url}
            onChange={handleChange}
            placeholder="https://..."
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': { borderColor: '#333' },
                '&:hover fieldset': { borderColor: '#60A5FA' },
                '&.Mui-focused fieldset': { borderColor: '#60A5FA' }
              },
              '& .MuiInputLabel-root': { color: '#9CA3AF' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#60A5FA' }
            }}
          />

          <TextField
            fullWidth
            label="LinkedIn URL"
            name="linkedin_url"
            value={formData.linkedin_url}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/..."
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': { borderColor: '#333' },
                '&:hover fieldset': { borderColor: '#60A5FA' },
                '&.Mui-focused fieldset': { borderColor: '#60A5FA' }
              },
              '& .MuiInputLabel-root': { color: '#9CA3AF' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#60A5FA' }
            }}
          />

          <TextField
            fullWidth
            label="Instagram URL"
            name="instagram_url"
            value={formData.instagram_url}
            onChange={handleChange}
            placeholder="https://instagram.com/..."
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': { borderColor: '#333' },
                '&:hover fieldset': { borderColor: '#60A5FA' },
                '&.Mui-focused fieldset': { borderColor: '#60A5FA' }
              },
              '& .MuiInputLabel-root': { color: '#9CA3AF' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#60A5FA' }
            }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<SaveIcon />}
            disabled={loading}
            sx={{
              bgcolor: '#60A5FA',
              color: '#0a0a0a',
              fontWeight: 600,
              '&:hover': {
                bgcolor: '#3B82F6'
              },
              '&:disabled': {
                bgcolor: '#333',
                color: '#666'
              }
            }}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default EditBio;

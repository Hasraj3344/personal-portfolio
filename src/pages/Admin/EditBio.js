import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { updateBio } from '../../services/api';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Chip,
  Stack,
  CircularProgress
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import { toast } from 'react-hot-toast';

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

    try {
      await updateBio(formData);
      await refreshData();
      toast.success('Bio updated successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to update bio');
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
            />
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.roles.map((role, index) => (
                <Chip
                  key={index}
                  label={role}
                  onDelete={() => handleDeleteRole(role)}
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
            inputProps={{ maxLength: 500 }}
            helperText={
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Brief professional summary</span>
                <span>{formData.description.length}/500</span>
              </Box>
            }
          />

          <TextField
            fullWidth
            label="Resume URL"
            name="resume_url"
            value={formData.resume_url}
            onChange={handleChange}
            placeholder="https://..."
          />

          <TextField
            fullWidth
            label="LinkedIn URL"
            name="linkedin_url"
            value={formData.linkedin_url}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/..."
          />

          <TextField
            fullWidth
            label="Instagram URL"
            name="instagram_url"
            value={formData.instagram_url}
            onChange={handleChange}
            placeholder="https://instagram.com/..."
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default EditBio;

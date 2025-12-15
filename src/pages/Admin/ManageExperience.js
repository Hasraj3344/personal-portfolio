import React, { useContext, useState } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { addExperience, updateExperience, deleteExperience } from '../../services/api';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Card,
  CardContent,
  Alert,
  Stack,
  Chip
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const ManageExperience = () => {
  const { experiences, refreshData } = useContext(DataContext);
  const [dialog, setDialog] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    company_logo_url: '',
    role: '',
    company: '',
    date_range: '',
    description: '',
    skills_used: []
  });
  const [skillInput, setSkillInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleOpenDialog = (experience = null) => {
    if (experience) {
      setEditing(experience);
      setFormData({
        company_logo_url: experience.company_logo_url || '',
        role: experience.role || '',
        company: experience.company || '',
        date_range: experience.date_range || '',
        description: experience.description || '',
        skills_used: experience.skills_used || []
      });
    } else {
      setEditing(null);
      setFormData({
        company_logo_url: '',
        role: '',
        company: '',
        date_range: '',
        description: '',
        skills_used: []
      });
    }
    setDialog(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!formData.skills_used.includes(skillInput.trim())) {
        setFormData({
          ...formData,
          skills_used: [...formData.skills_used, skillInput.trim()]
        });
      }
      setSkillInput('');
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setFormData({
      ...formData,
      skills_used: formData.skills_used.filter(skill => skill !== skillToDelete)
    });
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    try {
      const maxOrder = experiences.length > 0
        ? Math.max(...experiences.map(e => e.order_index))
        : -1;

      const dataToSave = {
        ...formData,
        order_index: editing ? editing.order_index : maxOrder + 1
      };

      if (editing) {
        await updateExperience(editing.id, dataToSave);
      } else {
        await addExperience(dataToSave);
      }
      await refreshData();
      setDialog(false);
      setSuccess(editing ? 'Experience updated!' : 'Experience added!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to save experience');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this experience?')) return;
    setLoading(true);
    setError('');
    try {
      await deleteExperience(id);
      await refreshData();
      setSuccess('Experience deleted!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to delete experience');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff' }}>
          Manage Experience
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            bgcolor: '#60A5FA',
            color: '#0a0a0a',
            fontWeight: 600,
            '&:hover': { bgcolor: '#3B82F6' }
          }}
        >
          Add Experience
        </Button>
      </Box>
      <Typography variant="body1" sx={{ mb: 4, color: '#9CA3AF' }}>
        Manage your work experience history
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Stack spacing={2}>
        {experiences?.map((exp) => (
          <Card
            key={exp.id}
            sx={{
              bgcolor: '#1a1a1a',
              border: '1px solid #333'
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'between', gap: 2 }}>
                {exp.company_logo_url && (
                  <img
                    src={exp.company_logo_url}
                    alt={exp.company}
                    style={{ width: 64, height: 64, objectFit: 'contain', borderRadius: 8 }}
                  />
                )}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>
                    {exp.role}
                  </Typography>
                  <Typography sx={{ color: '#60A5FA', mb: 1 }}>
                    {exp.company} • {exp.date_range}
                  </Typography>
                  <Typography sx={{ color: '#9CA3AF', mb: 2 }}>
                    {exp.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {exp.skills_used?.map((skill, idx) => (
                      <Chip
                        key={idx}
                        label={skill}
                        size="small"
                        sx={{
                          bgcolor: '#60A5FA20',
                          color: '#60A5FA',
                          border: '1px solid #60A5FA50'
                        }}
                      />
                    ))}
                  </Box>
                </Box>
                <Box>
                  <IconButton
                    onClick={() => handleOpenDialog(exp)}
                    sx={{ color: '#9CA3AF' }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(exp.id)}
                    sx={{ color: '#EF4444' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Dialog */}
      <Dialog
        open={dialog}
        onClose={() => setDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { bgcolor: '#1a1a1a', color: '#fff' }
        }}
      >
        <DialogTitle>
          {editing ? 'Edit Experience' : 'Add Experience'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Role"
              name="role"
              value={formData.role}
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
              label="Company"
              name="company"
              value={formData.company}
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
              label="Date Range"
              name="date_range"
              value={formData.date_range}
              onChange={handleChange}
              placeholder="e.g., Jan 2020 - Dec 2021"
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
              label="Company Logo URL"
              name="company_logo_url"
              value={formData.company_logo_url}
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
            <Box>
              <TextField
                fullWidth
                label="Add Skills Used"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleAddSkill}
                placeholder="Type a skill and press Enter"
                helperText="Press Enter to add each skill"
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
                {formData.skills_used.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    onDelete={() => handleDeleteSkill(skill)}
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
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(false)} sx={{ color: '#9CA3AF' }}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading || !formData.role.trim() || !formData.company.trim()}
            sx={{ color: '#60A5FA' }}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageExperience;

import React, { useContext, useState } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { addEducation, updateEducation, deleteEducation } from '../../services/api';
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
  Stack,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { toast } from 'react-hot-toast';
import ConfirmDialog from '../../components/ConfirmDialog';

const ManageEducation = () => {
  const { education, refreshData } = useContext(DataContext);
  const [dialog, setDialog] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    school_logo_url: '',
    school_name: '',
    degree: '',
    date_range: '',
    grade: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, action: null, title: '', message: '' });

  const handleOpenDialog = (edu = null) => {
    if (edu) {
      setEditing(edu);
      setFormData({
        school_logo_url: edu.school_logo_url || '',
        school_name: edu.school_name || '',
        degree: edu.degree || '',
        date_range: edu.date_range || '',
        grade: edu.grade || '',
        description: edu.description || ''
      });
    } else {
      setEditing(null);
      setFormData({
        school_logo_url: '',
        school_name: '',
        degree: '',
        date_range: '',
        grade: '',
        description: ''
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

  const handleSave = async () => {
    setLoading(true);
    try {
      const maxOrder = education.length > 0
        ? Math.max(...education.map(e => e.order_index))
        : -1;

      const dataToSave = {
        ...formData,
        order_index: editing ? editing.order_index : maxOrder + 1
      };

      if (editing) {
        await updateEducation(editing.id, dataToSave);
        toast.success('Education updated successfully!');
      } else {
        await addEducation(dataToSave);
        toast.success('Education added successfully!');
      }
      await refreshData();
      setDialog(false);
    } catch (err) {
      toast.error(err.message || 'Failed to save education');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id, schoolName, degree) => {
    setConfirmDialog({
      open: true,
      action: () => handleDelete(id),
      title: 'Delete Education',
      message: `Are you sure you want to delete "${degree}" from ${schoolName}?`,
      severity: 'error'
    });
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteEducation(id);
      await refreshData();
      toast.success('Education deleted successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to delete education');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff' }}>
          Manage Education
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
          Add Education
        </Button>
      </Box>
      <Typography variant="body1" sx={{ mb: 4, color: '#9CA3AF' }}>
        Manage your educational background
      </Typography>

      <Stack spacing={2}>
        {education?.map((edu) => (
          <Card
            key={edu.id}
            sx={{
              bgcolor: '#1a1a1a',
              border: '1px solid #333'
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'between', gap: 2 }}>
                {edu.school_logo_url && (
                  <img
                    src={edu.school_logo_url}
                    alt={edu.school_name}
                    style={{ width: 64, height: 64, objectFit: 'contain', borderRadius: 8 }}
                  />
                )}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>
                    {edu.degree}
                  </Typography>
                  <Typography sx={{ color: '#60A5FA', mb: 1 }}>
                    {edu.school_name} • {edu.date_range}
                  </Typography>
                  {edu.grade && (
                    <Typography sx={{ color: '#9CA3AF', mb: 1 }}>
                      Grade: {edu.grade}
                    </Typography>
                  )}
                  <Typography sx={{ color: '#9CA3AF' }}>
                    {edu.description}
                  </Typography>
                </Box>
                <Box>
                  <IconButton
                    onClick={() => handleOpenDialog(edu)}
                    sx={{ color: '#9CA3AF' }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteClick(edu.id, edu.school_name, edu.degree)}
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
          {editing ? 'Edit Education' : 'Add Education'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="School Name"
              name="school_name"
              value={formData.school_name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Degree"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Date Range"
              name="date_range"
              value={formData.date_range}
              onChange={handleChange}
              placeholder="e.g., Sep 2018 - Jun 2022"
              required
            />
            <TextField
              fullWidth
              label="Grade/GPA"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              placeholder="e.g., 3.8 GPA"
              required
            />
            <TextField
              fullWidth
              label="School Logo URL"
              name="school_logo_url"
              value={formData.school_logo_url}
              onChange={handleChange}
              placeholder="https://..."
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
              inputProps={{ maxLength: 500 }}
              helperText={
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Brief description of your studies</span>
                  <span>{formData.description.length}/500</span>
                </Box>
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog(false)} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading || !formData.school_name.trim() || !formData.degree.trim()}
            variant="contained"
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, action: null, title: '', message: '' })}
        onConfirm={confirmDialog.action}
        title={confirmDialog.title}
        message={confirmDialog.message}
        severity={confirmDialog.severity}
      />
    </Box>
  );
};

export default ManageEducation;

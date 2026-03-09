import React, { useContext, useState } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { addProject, updateProject, deleteProject } from '../../services/api';
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
  CardMedia,
  Stack,
  Chip,
  MenuItem,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { toast } from 'react-hot-toast';
import ConfirmDialog from '../../components/ConfirmDialog';

const ManageProjects = () => {
  const { projects, refreshData } = useContext(DataContext);
  const [dialog, setDialog] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date_range: '',
    description: '',
    image_url: '',
    tags: [],
    category: '',
    github_url: '',
    webapp_url: ''
  });
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, action: null, title: '', message: '' });

  const categories = ['web app', 'machine learning', 'android app'];

  const handleOpenDialog = (project = null) => {
    if (project) {
      setEditing(project);
      setFormData({
        title: project.title || '',
        date_range: project.date_range || '',
        description: project.description || '',
        image_url: project.image_url || '',
        tags: project.tags || [],
        category: project.category || '',
        github_url: project.github_url || '',
        webapp_url: project.webapp_url || ''
      });
    } else {
      setEditing(null);
      setFormData({
        title: '',
        date_range: '',
        description: '',
        image_url: '',
        tags: [],
        category: '',
        github_url: '',
        webapp_url: ''
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

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({
          ...formData,
          tags: [...formData.tags, tagInput.trim()]
        });
      }
      setTagInput('');
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToDelete)
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const maxOrder = projects.length > 0
        ? Math.max(...projects.map(p => p.order_index))
        : -1;

      const dataToSave = {
        ...formData,
        order_index: editing ? editing.order_index : maxOrder + 1
      };

      if (editing) {
        await updateProject(editing.id, dataToSave);
        toast.success('Project updated successfully!');
      } else {
        await addProject(dataToSave);
        toast.success('Project added successfully!');
      }
      await refreshData();
      setDialog(false);
    } catch (err) {
      toast.error(err.message || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id, title) => {
    setConfirmDialog({
      open: true,
      action: () => handleDelete(id),
      title: 'Delete Project',
      message: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
      severity: 'error'
    });
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteProject(id);
      await refreshData();
      toast.success('Project deleted successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to delete project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff' }}>
          Manage Projects
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
          Add Project
        </Button>
      </Box>
      <Typography variant="body1" sx={{ mb: 4, color: '#9CA3AF' }}>
        Manage your portfolio projects
      </Typography>

      <Stack spacing={2}>
        {projects?.map((project) => (
          <Card
            key={project.id}
            sx={{
              bgcolor: '#1a1a1a',
              border: '1px solid #333',
              display: 'flex'
            }}
          >
            {project.image_url && (
              <CardMedia
                component="img"
                sx={{ width: 200, objectFit: 'cover' }}
                image={project.image_url}
                alt={project.title}
              />
            )}
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <CardContent sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600, mb: 1 }}>
                      {project.title}
                    </Typography>
                    <Typography sx={{ color: '#60A5FA', mb: 1 }}>
                      {project.date_range}
                    </Typography>
                    <Chip
                      label={project.category}
                      size="small"
                      sx={{
                        bgcolor: '#60A5FA20',
                        color: '#60A5FA',
                        border: '1px solid #60A5FA50',
                        mb: 2
                      }}
                    />
                    <Typography sx={{ color: '#9CA3AF', mb: 2 }}>
                      {project.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {project.tags?.map((tag, idx) => (
                        <Chip
                          key={idx}
                          label={tag}
                          size="small"
                          sx={{
                            bgcolor: '#333',
                            color: '#9CA3AF'
                          }}
                        />
                      ))}
                    </Box>
                    <Stack direction="row" spacing={1}>
                      {project.github_url && (
                        <Typography sx={{ color: '#60A5FA', fontSize: '0.875rem' }}>
                          GitHub: {project.github_url}
                        </Typography>
                      )}
                      {project.webapp_url && (
                        <Typography sx={{ color: '#60A5FA', fontSize: '0.875rem' }}>
                          Live: {project.webapp_url}
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                  <Box>
                    <IconButton
                      onClick={() => handleOpenDialog(project)}
                      sx={{ color: '#9CA3AF' }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteClick(project.id, project.title)}
                      sx={{ color: '#EF4444' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Box>
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
          {editing ? 'Edit Project' : 'Add Project'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Date Range"
              name="date_range"
              value={formData.date_range}
              onChange={handleChange}
              placeholder="e.g., Jan 2023 - Mar 2023"
              required
            />
            <TextField
              fullWidth
              select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Image URL"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://..."
            />
            <Box>
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
                helperText={`${formData.description.length}/500 characters`}
              />
            </Box>
            <TextField
              fullWidth
              label="GitHub URL"
              name="github_url"
              value={formData.github_url}
              onChange={handleChange}
              placeholder="https://github.com/..."
            />
            <TextField
              fullWidth
              label="Live Demo URL"
              name="webapp_url"
              value={formData.webapp_url}
              onChange={handleChange}
              placeholder="https://..."
            />
            <Box>
              <TextField
                fullWidth
                label="Add Tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Type a tag and press Enter"
                helperText="Press Enter to add each tag"
              />
              <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    onDelete={() => handleDeleteTag(tag)}
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
          <Button onClick={() => setDialog(false)} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading || !formData.title.trim() || !formData.description.trim()}
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

export default ManageProjects;

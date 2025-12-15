import React, { useContext, useState } from 'react';
import { DataContext } from '../../contexts/DataContext';
import {
  addSkillCategory,
  updateSkillCategory,
  deleteSkillCategory,
  addSkill,
  updateSkill,
  deleteSkill
} from '../../services/api';
import {
  Box,
  Paper,
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
  Grid,
  Alert,
  Stack
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const ManageSkills = () => {
  const { skills, refreshData } = useContext(DataContext);
  const [categoryDialog, setCategoryDialog] = useState(false);
  const [skillDialog, setSkillDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [categoryForm, setCategoryForm] = useState({ title: '' });
  const [skillForm, setSkillForm] = useState({ name: '', image_url: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleOpenCategoryDialog = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setCategoryForm({ title: category.title });
    } else {
      setEditingCategory(null);
      setCategoryForm({ title: '' });
    }
    setCategoryDialog(true);
  };

  const handleOpenSkillDialog = (categoryId, skill = null) => {
    setSelectedCategoryId(categoryId);
    if (skill) {
      setEditingSkill(skill);
      setSkillForm({ name: skill.name, image_url: skill.image_url });
    } else {
      setEditingSkill(null);
      setSkillForm({ name: '', image_url: '' });
    }
    setSkillDialog(true);
  };

  const handleSaveCategory = async () => {
    setLoading(true);
    setError('');
    try {
      if (editingCategory) {
        await updateSkillCategory(editingCategory.id, categoryForm.title, editingCategory.order_index);
      } else {
        const maxOrder = skills.length > 0 ? Math.max(...skills.map(c => c.order_index)) : -1;
        await addSkillCategory(categoryForm.title, maxOrder + 1);
      }
      await refreshData();
      setCategoryDialog(false);
      setSuccess(editingCategory ? 'Category updated!' : 'Category added!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to save category');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm('Delete this category and all its skills?')) return;
    setLoading(true);
    setError('');
    try {
      await deleteSkillCategory(categoryId);
      await refreshData();
      setSuccess('Category deleted!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to delete category');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSkill = async () => {
    setLoading(true);
    setError('');
    try {
      if (editingSkill) {
        await updateSkill(editingSkill.id, {
          ...skillForm,
          category_id: selectedCategoryId,
          order_index: editingSkill.order_index
        });
      } else {
        const category = skills.find(c => c.id === selectedCategoryId);
        const maxOrder = category.skills.length > 0
          ? Math.max(...category.skills.map(s => s.order_index))
          : -1;
        await addSkill(selectedCategoryId, skillForm.name, skillForm.image_url, maxOrder + 1);
      }
      await refreshData();
      setSkillDialog(false);
      setSuccess(editingSkill ? 'Skill updated!' : 'Skill added!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to save skill');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkill = async (skillId) => {
    if (!window.confirm('Delete this skill?')) return;
    setLoading(true);
    setError('');
    try {
      await deleteSkill(skillId);
      await refreshData();
      setSuccess('Skill deleted!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to delete skill');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#fff' }}>
          Manage Skills
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenCategoryDialog()}
          sx={{
            bgcolor: '#60A5FA',
            color: '#0a0a0a',
            fontWeight: 600,
            '&:hover': { bgcolor: '#3B82F6' }
          }}
        >
          Add Category
        </Button>
      </Box>
      <Typography variant="body1" sx={{ mb: 4, color: '#9CA3AF' }}>
        Organize your skills by categories
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

      <Stack spacing={3}>
        {skills?.map((category) => (
          <Paper
            key={category.id}
            sx={{
              p: 3,
              bgcolor: '#1a1a1a',
              border: '1px solid #333'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>
                {category.title}
              </Typography>
              <Box>
                <Button
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenSkillDialog(category.id)}
                  sx={{ color: '#60A5FA', mr: 1 }}
                >
                  Add Skill
                </Button>
                <IconButton
                  size="small"
                  onClick={() => handleOpenCategoryDialog(category)}
                  sx={{ color: '#9CA3AF' }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteCategory(category.id)}
                  sx={{ color: '#EF4444' }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>

            <Grid container spacing={2}>
              {category.skills?.map((skill) => (
                <Grid item xs={12} sm={6} md={4} key={skill.id}>
                  <Card sx={{ bgcolor: '#0a0a0a', border: '1px solid #333' }}>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <img
                            src={skill.image_url}
                            alt={skill.name}
                            style={{ width: 32, height: 32, objectFit: 'contain' }}
                          />
                          <Typography sx={{ color: '#fff' }}>{skill.name}</Typography>
                        </Box>
                        <Box>
                          <IconButton
                            size="small"
                            onClick={() => handleOpenSkillDialog(category.id, skill)}
                            sx={{ color: '#9CA3AF' }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteSkill(skill.id)}
                            sx={{ color: '#EF4444' }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {category.skills?.length === 0 && (
              <Typography sx={{ color: '#666', textAlign: 'center', py: 2 }}>
                No skills in this category yet
              </Typography>
            )}
          </Paper>
        ))}
      </Stack>

      {/* Category Dialog */}
      <Dialog
        open={categoryDialog}
        onClose={() => setCategoryDialog(false)}
        PaperProps={{
          sx: { bgcolor: '#1a1a1a', color: '#fff', minWidth: 400 }
        }}
      >
        <DialogTitle>
          {editingCategory ? 'Edit Category' : 'Add Category'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Category Title"
            value={categoryForm.title}
            onChange={(e) => setCategoryForm({ title: e.target.value })}
            sx={{
              mt: 2,
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCategoryDialog(false)} sx={{ color: '#9CA3AF' }}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveCategory}
            disabled={loading || !categoryForm.title.trim()}
            sx={{ color: '#60A5FA' }}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Skill Dialog */}
      <Dialog
        open={skillDialog}
        onClose={() => setSkillDialog(false)}
        PaperProps={{
          sx: { bgcolor: '#1a1a1a', color: '#fff', minWidth: 400 }
        }}
      >
        <DialogTitle>
          {editingSkill ? 'Edit Skill' : 'Add Skill'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Skill Name"
              value={skillForm.name}
              onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
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
              label="Image URL"
              value={skillForm.image_url}
              onChange={(e) => setSkillForm({ ...skillForm, image_url: e.target.value })}
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
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSkillDialog(false)} sx={{ color: '#9CA3AF' }}>
            Cancel
          </Button>
          <Button
            onClick={handleSaveSkill}
            disabled={loading || !skillForm.name.trim() || !skillForm.image_url.trim()}
            sx={{ color: '#60A5FA' }}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageSkills;

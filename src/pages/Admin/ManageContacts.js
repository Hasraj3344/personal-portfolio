import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from '@mui/material';
import {
  Delete,
  Visibility,
  Email,
  FilterList,
  Search,
} from '@mui/icons-material';
import toast from 'react-hot-toast';
import {
  getContactSubmissions,
  updateContactSubmissionStatus,
  deleteContactSubmission,
} from '../../services/api';

const Container = styled.div`
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
`;

const PageTitle = styled(Typography)`
  font-size: 32px !important;
  font-weight: 600 !important;
  margin-bottom: 24px !important;
  color: ${({ theme }) => theme.text_primary};
`;

const ToolBar = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;
`;

const SearchBox = styled(TextField)`
  flex: 1;
  min-width: 250px;

  & .MuiOutlinedInput-root {
    background: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text_primary};

    & fieldset {
      border-color: ${({ theme }) => theme.border};
    }

    &:hover fieldset {
      border-color: ${({ theme }) => theme.primary};
    }
  }
`;

const ContactCard = styled(Card)`
  background: ${({ theme }) => theme.card} !important;
  border: 1px solid ${({ theme }) => theme.border} !important;
  border-radius: 12px !important;
  margin-bottom: 16px;
  transition: all 0.3s ease !important;

  &:hover {
    transform: translateX(4px);
    border-color: ${({ theme }) => theme.primary} !important;
  }
`;

const ContactHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 12px;
`;

const ContactInfo = styled.div`
  flex: 1;
  min-width: 200px;
`;

const ContactName = styled(Typography)`
  font-size: 18px !important;
  font-weight: 600 !important;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 4px !important;
`;

const ContactEmail = styled(Typography)`
  font-size: 14px !important;
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ContactSubject = styled(Typography)`
  font-size: 16px !important;
  font-weight: 500 !important;
  color: ${({ theme }) => theme.primary};
  margin: 8px 0 !important;
`;

const ContactMessage = styled(Typography)`
  font-size: 14px !important;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6 !important;
  margin: 12px 0 !important;
  max-height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const ContactActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ContactMeta = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-top: 12px;
  flex-wrap: wrap;
`;

const getStatusColor = (status) => {
  const colors = {
    new: 'primary',
    read: 'info',
    replied: 'success',
    archived: 'default',
  };
  return colors[status] || 'default';
};

const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [contacts, statusFilter, searchQuery]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await getContactSubmissions();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to load contact submissions');
    } finally {
      setLoading(false);
    }
  };

  const filterContacts = () => {
    let filtered = [...contacts];

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter((c) => c.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.email.toLowerCase().includes(query) ||
          c.subject.toLowerCase().includes(query) ||
          c.message.toLowerCase().includes(query)
      );
    }

    setFilteredContacts(filtered);
  };

  const handleViewDetails = async (contact) => {
    setSelectedContact(contact);
    setDetailsOpen(true);

    // Mark as read if it's new
    if (contact.status === 'new') {
      try {
        await updateContactSubmissionStatus(contact.id, 'read');
        setContacts((prev) =>
          prev.map((c) => (c.id === contact.id ? { ...c, status: 'read' } : c))
        );
      } catch (error) {
        console.error('Error updating status:', error);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateContactSubmissionStatus(id, newStatus);
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
      toast.success('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleDeleteClick = (contact) => {
    setContactToDelete(contact);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteContactSubmission(contactToDelete.id);
      setContacts((prev) => prev.filter((c) => c.id !== contactToDelete.id));
      toast.success('Contact submission deleted');
      setDeleteDialogOpen(false);
      setContactToDelete(null);
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete contact submission');
    }
  };

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PageTitle variant="h4">Contact Submissions ({filteredContacts.length})</PageTitle>

        <ToolBar>
          <SearchBox
            placeholder="Search by name, email, subject, or message..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="read">Read</MenuItem>
              <MenuItem value="replied">Replied</MenuItem>
              <MenuItem value="archived">Archived</MenuItem>
            </Select>
          </FormControl>
        </ToolBar>

        <AnimatePresence>
          {filteredContacts.map((contact, index) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ContactCard>
                <CardContent>
                  <ContactHeader>
                    <ContactInfo>
                      <ContactName>{contact.name}</ContactName>
                      <ContactEmail>
                        <Email fontSize="small" />
                        {contact.email}
                      </ContactEmail>
                    </ContactInfo>
                    <ContactActions>
                      <FormControl size="small" sx={{ minWidth: 100 }}>
                        <Select
                          value={contact.status}
                          onChange={(e) => handleStatusChange(contact.id, e.target.value)}
                          size="small"
                        >
                          <MenuItem value="new">New</MenuItem>
                          <MenuItem value="read">Read</MenuItem>
                          <MenuItem value="replied">Replied</MenuItem>
                          <MenuItem value="archived">Archived</MenuItem>
                        </Select>
                      </FormControl>
                      <IconButton
                        color="primary"
                        onClick={() => handleViewDetails(contact)}
                        title="View details"
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteClick(contact)}
                        title="Delete"
                      >
                        <Delete />
                      </IconButton>
                    </ContactActions>
                  </ContactHeader>

                  <ContactSubject>{contact.subject}</ContactSubject>
                  <ContactMessage>{contact.message}</ContactMessage>

                  <ContactMeta>
                    <Chip
                      label={contact.status}
                      size="small"
                      color={getStatusColor(contact.status)}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {new Date(contact.created_at).toLocaleString()}
                    </Typography>
                  </ContactMeta>
                </CardContent>
              </ContactCard>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredContacts.length === 0 && (
          <Box textAlign="center" py={8}>
            <Typography variant="h6" color="text.secondary">
              No contact submissions found
            </Typography>
          </Box>
        )}

        {/* Details Dialog */}
        <Dialog
          open={detailsOpen}
          onClose={() => setDetailsOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Contact Submission Details</DialogTitle>
          <DialogContent>
            {selectedContact && (
              <Box sx={{ pt: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Name
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedContact.name}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
                  Email
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedContact.email}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
                  Subject
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {selectedContact.subject}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
                  Message
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {selectedContact.message}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
                  Submitted
                </Typography>
                <Typography variant="body1">
                  {new Date(selectedContact.created_at).toLocaleString()}
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Chip label={selectedContact.status} color={getStatusColor(selectedContact.status)} />
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDetailsOpen(false)}>Close</Button>
            {selectedContact && (
              <Button
                variant="contained"
                href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                startIcon={<Email />}
              >
                Reply via Email
              </Button>
            )}
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Delete Contact Submission</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this contact submission from{' '}
              <strong>{contactToDelete?.name}</strong>? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </Container>
  );
};

export default ManageContacts;

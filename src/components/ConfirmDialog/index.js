import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  Box,
} from '@mui/material';
import {
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

/**
 * Professional confirmation dialog component
 * Replaces window.confirm() with a modern MUI dialog
 *
 * @param {boolean} open - Controls dialog visibility
 * @param {function} onClose - Called when dialog is closed/cancelled
 * @param {function} onConfirm - Called when user confirms action
 * @param {string} title - Dialog title
 * @param {string} message - Dialog message/description
 * @param {string} severity - Visual style: 'error', 'warning', 'info', 'success'
 * @param {string} confirmText - Text for confirm button (default: 'Confirm')
 * @param {string} cancelText - Text for cancel button (default: 'Cancel')
 */
const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  severity = 'warning',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error('Error during confirm action:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = () => {
    const iconProps = { sx: { fontSize: 48, mb: 2 } };

    switch (severity) {
      case 'error':
        return <ErrorIcon {...iconProps} color="error" />;
      case 'warning':
        return <WarningIcon {...iconProps} color="warning" />;
      case 'success':
        return <CheckCircleIcon {...iconProps} color="success" />;
      case 'info':
      default:
        return <InfoIcon {...iconProps} color="info" />;
    }
  };

  const getConfirmButtonColor = () => {
    switch (severity) {
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'success':
        return 'success';
      case 'info':
      default:
        return 'primary';
    }
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? null : onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>{title}</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            py: 2,
          }}
        >
          {getIcon()}
          <DialogContentText sx={{ fontSize: '1rem' }}>
            {message}
          </DialogContentText>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          disabled={loading}
          variant="outlined"
          sx={{ minWidth: 100 }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={loading}
          variant="contained"
          color={getConfirmButtonColor()}
          sx={{ minWidth: 100 }}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {loading ? 'Processing...' : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;

import { createTheme } from '@mui/material/styles';

/**
 * Creates a Material-UI theme based on dark/light mode
 * This eliminates 1650+ lines of duplicated sx props across admin forms
 */
export const createPortfolioTheme = (isDarkMode) => {
  const colors = isDarkMode ? {
    bg: '#1a1a1a',
    bgLight: '#1C1E27',
    card: '#1E293B',
    border: '#333',
    borderHover: '#60A5FA',
    text: '#fff',
    textSecondary: '#9CA3AF',
    primary: '#60A5FA',
    primaryHover: '#3B82F6',
    error: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
  } : {
    bg: '#E0F2FE',
    bgLight: '#f0f0f0',
    card: '#FFFFFF',
    border: '#CBD5E1',
    borderHover: '#BE1ADB',
    text: '#111111',
    textSecondary: '#48494a',
    primary: '#BE1ADB',
    primaryHover: '#A41CC1',
    error: '#dc2626',
    success: '#059669',
    warning: '#d97706',
  };

  return createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: colors.primary,
        light: colors.primaryHover,
      },
      background: {
        default: colors.bg,
        paper: colors.card,
      },
      text: {
        primary: colors.text,
        secondary: colors.textSecondary,
      },
      error: {
        main: colors.error,
      },
      success: {
        main: colors.success,
      },
      warning: {
        main: colors.warning,
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      // TextField component styling - replaces all duplicated sx props
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
          InputLabelProps: {
            shrink: true, // Floating labels
          },
        },
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              color: colors.text,
              backgroundColor: colors.bgLight,
              transition: 'all 0.3s ease',
              '& fieldset': {
                borderColor: colors.border,
                transition: 'border-color 0.3s ease',
              },
              '&:hover fieldset': {
                borderColor: colors.borderHover,
              },
              '&.Mui-focused fieldset': {
                borderColor: colors.borderHover,
                borderWidth: '2px',
              },
              '&.Mui-error fieldset': {
                borderColor: colors.error,
              },
            },
            '& .MuiInputLabel-root': {
              color: colors.textSecondary,
              fontWeight: 500,
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: colors.borderHover,
            },
            '& .MuiInputLabel-root.Mui-error': {
              color: colors.error,
            },
            '& .MuiFormHelperText-root': {
              marginLeft: '4px',
              marginTop: '4px',
            },
          },
        },
      },
      // Button component styling
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            padding: '10px 24px',
            fontWeight: 600,
            textTransform: 'none',
            transition: 'all 0.3s ease',
          },
          contained: {
            backgroundColor: colors.primary,
            color: '#fff',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            '&:hover': {
              backgroundColor: colors.primaryHover,
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
            },
            '&:disabled': {
              backgroundColor: colors.border,
              color: colors.textSecondary,
            },
          },
          outlined: {
            borderColor: colors.border,
            color: colors.text,
            '&:hover': {
              borderColor: colors.borderHover,
              backgroundColor: `${colors.borderHover}10`,
            },
          },
        },
      },
      // Select component styling
      MuiSelect: {
        styleOverrides: {
          root: {
            color: colors.text,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.border,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.borderHover,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.borderHover,
            },
          },
        },
      },
      // MenuItem styling
      MuiMenuItem: {
        styleOverrides: {
          root: {
            color: colors.text,
            '&:hover': {
              backgroundColor: `${colors.borderHover}20`,
            },
            '&.Mui-selected': {
              backgroundColor: `${colors.borderHover}30`,
              '&:hover': {
                backgroundColor: `${colors.borderHover}40`,
              },
            },
          },
        },
      },
      // Chip styling (for tags)
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: `${colors.primary}20`,
            color: colors.text,
            border: `1px solid ${colors.primary}40`,
            '&:hover': {
              backgroundColor: `${colors.primary}30`,
            },
          },
          deleteIcon: {
            color: colors.text,
            '&:hover': {
              color: colors.primary,
            },
          },
        },
      },
      // Dialog styling
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: colors.card,
            backgroundImage: 'none',
          },
        },
      },
      // Paper styling
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: colors.card,
            backgroundImage: 'none',
          },
        },
      },
      // Alert styling
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
          },
          standardSuccess: {
            backgroundColor: `${colors.success}20`,
            color: colors.text,
            border: `1px solid ${colors.success}`,
          },
          standardError: {
            backgroundColor: `${colors.error}20`,
            color: colors.text,
            border: `1px solid ${colors.error}`,
          },
          standardWarning: {
            backgroundColor: `${colors.warning}20`,
            color: colors.text,
            border: `1px solid ${colors.warning}`,
          },
        },
      },
      // CircularProgress styling
      MuiCircularProgress: {
        styleOverrides: {
          root: {
            color: colors.primary,
          },
        },
      },
    },
  });
};

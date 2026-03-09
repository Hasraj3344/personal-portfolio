import { useState, useCallback } from 'react';

/**
 * Centralized form validation hook
 * Provides real-time validation with common validators
 *
 * @param {object} initialValues - Initial form values
 * @param {object} validationRules - Validation rules for each field
 * @returns {object} Form state and validation handlers
 */
const useFormValidation = (initialValues, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Common validators
  const validators = {
    required: (value, message = 'This field is required') => {
      if (!value || (typeof value === 'string' && !value.trim())) {
        return message;
      }
      return null;
    },

    email: (value, message = 'Invalid email address') => {
      if (!value) return null; // Let required handle empty values
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return message;
      }
      return null;
    },

    minLength: (min, message) => (value) => {
      if (!value) return null;
      if (value.length < min) {
        return message || `Minimum ${min} characters required`;
      }
      return null;
    },

    maxLength: (max, message) => (value) => {
      if (!value) return null;
      if (value.length > max) {
        return message || `Maximum ${max} characters allowed`;
      }
      return null;
    },

    url: (value, message = 'Invalid URL format') => {
      if (!value) return null;
      try {
        new URL(value);
        return null;
      } catch {
        return message;
      }
    },

    pattern: (regex, message = 'Invalid format') => (value) => {
      if (!value) return null;
      if (!regex.test(value)) {
        return message;
      }
      return null;
    },

    custom: (validatorFn) => (value) => {
      return validatorFn(value);
    },
  };

  // Validate a single field
  const validateField = useCallback((name, value) => {
    const rules = validationRules[name];
    if (!rules) return null;

    // Convert single rule to array
    const ruleArray = Array.isArray(rules) ? rules : [rules];

    for (const rule of ruleArray) {
      if (typeof rule === 'function') {
        const error = rule(value);
        if (error) return error;
      }
    }

    return null;
  }, [validationRules]);

  // Validate all fields
  const validateAll = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach((name) => {
      const error = validateField(name, values[name]);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validationRules, validateField]);

  // Handle field change
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));

    // Real-time validation if field has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error,
      }));
    }
  }, [touched, validateField]);

  // Handle field blur
  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    // Validate on blur
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  }, [validateField]);

  // Reset form
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  // Set specific field value
  const setValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);

  // Set specific field error
  const setError = useCallback((name, error) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  // Check if field has error
  const hasError = useCallback((name) => {
    return touched[name] && !!errors[name];
  }, [touched, errors]);

  // Get error message for field
  const getError = useCallback((name) => {
    return touched[name] ? errors[name] : '';
  }, [touched, errors]);

  return {
    values,
    errors,
    touched,
    validators,
    handleChange,
    handleBlur,
    validateField,
    validateAll,
    reset,
    setValue,
    setError,
    hasError,
    getError,
    setValues,
    setErrors,
    setTouched,
  };
};

export default useFormValidation;

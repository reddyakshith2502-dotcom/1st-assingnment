"use client";

import React, { useState, useEffect } from 'react';
import './SettingsForm.css';

interface SettingsFormData {
  fullName: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  theme: 'light' | 'dark' | 'system';
  receiveNotifications: boolean;
  weeklyDigest: 'none' | 'summary' | 'full';
  bio: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  theme?: string;
  weeklyDigest?: string;
  bio?: string;
}

export default function SettingsForm() {
  const [formData, setFormData] = useState<SettingsFormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    theme: 'system',
    receiveNotifications: true,
    weeklyDigest: 'summary',
    bio: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Auto-dismiss toast after 4 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const validateField = (name: string, value: any, currentFormData: SettingsFormData): string => {
    switch (name) {
      case 'fullName': {
        if (!value || String(value).trim() === '') {
          return 'Full Name is required';
        }
        const valStr = String(value);
        if (valStr.length < 2 || valStr.length > 50) {
          return 'Full Name must be between 2 and 50 characters';
        }
        const nameRegex = /^[a-zA-Z\s-]+$/;
        if (!nameRegex.test(valStr)) {
          return 'Full Name can only contain letters, spaces, and hyphens';
        }
        return '';
      }
      case 'email': {
        if (!value || String(value).trim() === '') {
          return 'Email Address is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(String(value))) {
          return 'Please enter a valid email address';
        }
        return '';
      }
      case 'password': {
        if (!value) return ''; // Optional
        const valStr = String(value);
        if (valStr.length < 8) {
          return 'Password must be at least 8 characters long';
        }
        if (!/[A-Z]/.test(valStr)) {
          return 'Password must contain at least one uppercase letter';
        }
        if (!/[a-z]/.test(valStr)) {
          return 'Password must contain at least one lowercase letter';
        }
        if (!/[0-9]/.test(valStr)) {
          return 'Password must contain at least one number';
        }
        if (!/[@$!%*?&]/.test(valStr)) {
          return 'Password must contain at least one special character (@$!%*?&)';
        }
        return '';
      }
      case 'confirmPassword': {
        if (currentFormData.password && !value) {
          return 'Confirm Password is required';
        }
        if (currentFormData.password && value !== currentFormData.password) {
          return 'Passwords do not match';
        }
        return '';
      }
      case 'theme': {
        if (!value) {
          return 'Theme Preference is required';
        }
        return '';
      }
      case 'bio': {
        if (value && String(value).length > 200) {
          return 'Bio must not exceed 200 characters';
        }
        return '';
      }
      default:
        return '';
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    let val: any = value;

    if (type === 'checkbox') {
      val = (e.target as HTMLInputElement).checked;
    }

    const updatedFormData = {
      ...formData,
      [name]: val,
    };

    setFormData(updatedFormData);

    // Run field validation on change if the field already has an active error
    if (errors[name as keyof FormErrors]) {
      const errorMsg = validateField(name, val, updatedFormData);
      setErrors((prev) => {
        const nextErrors = { ...prev };
        if (!errorMsg) {
          delete nextErrors[name as keyof FormErrors];
        } else {
          nextErrors[name as keyof FormErrors] = errorMsg;
        }
        return nextErrors;
      });
    }

    // Special cross-field checks:
    // 1. If password changes, validate confirmPassword if it currently has an error
    if (name === 'password') {
      if (errors.confirmPassword) {
        const confirmErr = validateField('confirmPassword', formData.confirmPassword, updatedFormData);
        setErrors((prev) => {
          const nextErrors = { ...prev };
          if (!confirmErr) {
            delete nextErrors.confirmPassword;
          } else {
            nextErrors.confirmPassword = confirmErr;
          }
          return nextErrors;
        });
      }
    }

    // 2. If confirmPassword changes, validate it immediately if it has an error
    if (name === 'confirmPassword') {
      if (errors.confirmPassword) {
        const confirmErr = validateField('confirmPassword', val, updatedFormData);
        setErrors((prev) => {
          const nextErrors = { ...prev };
          if (!confirmErr) {
            delete nextErrors.confirmPassword;
          } else {
            nextErrors.confirmPassword = confirmErr;
          }
          return nextErrors;
        });
      }
    }

    // 3. Disable weeklyDigest error when notifications are disabled
    if (name === 'receiveNotifications' && !val) {
      setErrors((prev) => {
        const nextErrors = { ...prev };
        delete nextErrors.weeklyDigest;
        return nextErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};

    // Validate all fields
    const nameError = validateField('fullName', formData.fullName, formData);
    if (nameError) newErrors.fullName = nameError;

    const emailError = validateField('email', formData.email, formData);
    if (emailError) newErrors.email = emailError;

    const passwordError = validateField('password', formData.password, formData);
    if (passwordError) newErrors.password = passwordError;

    const confirmPasswordError = validateField('confirmPassword', formData.confirmPassword, formData);
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

    const themeError = validateField('theme', formData.theme, formData);
    if (themeError) newErrors.theme = themeError;

    const bioError = validateField('bio', formData.bio, formData);
    if (bioError) newErrors.bio = bioError;

    setErrors(newErrors);

    // If there are errors, stop submission
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Start saving simulation
    setIsLoading(true);
    setShowToast(false);

    setTimeout(() => {
      setIsLoading(false);
      setShowToast(true);
    }, 1000);
  };

  const remainingChars = 200 - formData.bio.length;

  return (
    <div className="settings-container">
      <div className="settings-card">
        <h2 className="settings-title">User Settings</h2>
        <form onSubmit={handleSubmit} className="settings-form" noValidate>
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              className="form-input"
              value={formData.fullName}
              onChange={handleChange}
              disabled={isLoading}
              aria-invalid={errors.fullName ? 'true' : 'false'}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            />
            {errors.fullName && (
              <span id="fullName-error" className="error-message" role="alert">
                {errors.fullName}
              </span>
            )}
          </div>

          {/* Email Address */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span id="email-error" className="error-message" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              New Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
            {errors.password && (
              <span id="password-error" className="error-message" role="alert">
                {errors.password}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="form-input"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
              aria-invalid={errors.confirmPassword ? 'true' : 'false'}
              aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
            />
            {errors.confirmPassword && (
              <span id="confirmPassword-error" className="error-message" role="alert">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          {/* Theme Preference */}
          <div className="form-group">
            <label htmlFor="theme" className="form-label">
              Theme Preference
            </label>
            <select
              id="theme"
              name="theme"
              className="form-input"
              value={formData.theme}
              onChange={handleChange}
              disabled={isLoading}
              aria-invalid={errors.theme ? 'true' : 'false'}
              aria-describedby={errors.theme ? 'theme-error' : undefined}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
            {errors.theme && (
              <span id="theme-error" className="error-message" role="alert">
                {errors.theme}
              </span>
            )}
          </div>

          {/* Enable Email Notifications Checkbox */}
          <div className="form-group checkbox-group">
            <label
              htmlFor="receiveNotifications"
              className={`checkbox-container ${isLoading ? 'disabled' : ''}`}
            >
              <input
                id="receiveNotifications"
                name="receiveNotifications"
                type="checkbox"
                checked={formData.receiveNotifications}
                onChange={handleChange}
                disabled={isLoading}
              />
              <span className="checkmark"></span>
              Enable Email Notifications
            </label>
          </div>

          {/* Weekly Digest Detail Select */}
          <div className="form-group">
            <label htmlFor="weeklyDigest" className="form-label">
              Weekly Digest Detail
            </label>
            <select
              id="weeklyDigest"
              name="weeklyDigest"
              className="form-input"
              value={formData.weeklyDigest}
              onChange={handleChange}
              disabled={!formData.receiveNotifications || isLoading}
            >
              <option value="none">None</option>
              <option value="summary">Summary</option>
              <option value="full">Full</option>
            </select>
          </div>

          {/* Bio Textarea */}
          <div className="form-group">
            <label htmlFor="bio" className="form-label">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              className="form-input"
              rows={4}
              maxLength={200}
              value={formData.bio}
              onChange={handleChange}
              disabled={isLoading}
              aria-invalid={errors.bio ? 'true' : 'false'}
              aria-describedby={errors.bio ? 'bio-error' : undefined}
            />
            <span className="bio-counter" aria-live="polite">
              {remainingChars}/200 characters remaining
            </span>
            {errors.bio && (
              <span id="bio-error" className="error-message" role="alert">
                {errors.bio}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner" aria-hidden="true" />
                <span>Saving...</span>
              </>
            ) : (
              'Save Settings'
            )}
          </button>
        </form>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="toast-container" role="status" aria-live="polite">
          <div className="toast">
            <span>Settings saved successfully!</span>
            <button
              type="button"
              className="toast-close-btn"
              onClick={() => setShowToast(false)}
              aria-label="Close notification"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

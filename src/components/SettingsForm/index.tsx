import React, { useState, useEffect } from 'react';
import './SettingsForm.css';

interface SettingsState {
  username: string;
  email: string;
  theme: 'light' | 'dark' | 'system';
  notifications: 'all' | 'mentions' | 'none';
  newsletter: boolean;
  bio: string;
  visibility: 'public' | 'private' | 'friends';
}

interface ErrorsState {
  username?: string;
  email?: string;
  bio?: string;
}

const DEFAULT_SETTINGS: SettingsState = {
  username: 'antigravity_dev',
  email: 'antigravity@deepmind.com',
  theme: 'dark',
  notifications: 'all',
  newsletter: true,
  bio: 'Building the future of agentic coding interfaces.',
  visibility: 'public',
};

export const SettingsForm: React.FC = () => {
  const [settings, setSettings] = useState<SettingsState>(DEFAULT_SETTINGS);
  const [errors, setErrors] = useState<ErrorsState>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Reset success message after 4 seconds
  useEffect(() => {
    if (saveSuccess) {
      const timer = setTimeout(() => {
        setSaveSuccess(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [saveSuccess]);

  const validateField = (name: keyof SettingsState, value: any): string | undefined => {
    if (name === 'username') {
      const val = value as string;
      if (!val.trim()) return 'Username is required';
      if (val.length < 3) return 'Username must be at least 3 characters';
      if (!/^[a-zA-Z0-9._]+$/.test(val)) {
        return 'Only letters, numbers, periods, and underscores are allowed';
      }
    }
    if (name === 'email') {
      const val = value as string;
      if (!val.trim()) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        return 'Enter a valid email address';
      }
    }
    if (name === 'bio') {
      const val = value as string;
      if (val.length > 150) return 'Bio cannot exceed 150 characters';
    }
    return undefined;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    let val: any = value;
    if (type === 'checkbox') {
      val = (e.target as HTMLInputElement).checked;
    }

    setSettings((prev) => ({
      ...prev,
      [name]: val,
    }));

    if (touched[name]) {
      const error = validateField(name as keyof SettingsState, val);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    const error = validateField(name as keyof SettingsState, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    setSettings((prev) => ({
      ...prev,
      theme,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    const newErrors: ErrorsState = {};

    Object.keys(settings).forEach((key) => {
      allTouched[key] = true;
      const error = validateField(key as keyof SettingsState, settings[key as keyof SettingsState]);
      if (error) {
        newErrors[key as keyof ErrorsState] = error;
      }
    });

    setTouched(allTouched);
    setErrors(newErrors);

    // If there are validation errors, don't submit
    if (Object.values(newErrors).some((error) => error !== undefined)) {
      return;
    }

    setIsSubmitting(true);
    setSaveSuccess(false);

    // Simulate API Request
    setTimeout(() => {
      setIsSubmitting(false);
      setSaveSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    setErrors({});
    setTouched({});
    setSaveSuccess(false);
  };

  return (
    <div className="settings-container">
      {saveSuccess && (
        <div className="toast success-toast" role="alert">
          <div className="toast-icon">✓</div>
          <div className="toast-content">
            <span className="toast-title">Settings saved!</span>
            <span className="toast-desc">Your changes have been updated successfully.</span>
          </div>
          <button type="button" className="toast-close" onClick={() => setSaveSuccess(false)}>
            ×
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="settings-form" noValidate>
        <div className="form-header">
          <h2>Application Settings</h2>
          <p>Manage your account preferences, notifications, and profile details.</p>
        </div>

        {/* Profile Details Section */}
        <fieldset className="form-section">
          <legend className="section-title">Profile Info</legend>
          
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username <span className="required">*</span>
            </label>
            <div className="input-wrapper">
              <span className="input-prefix">@</span>
              <input
                type="text"
                id="username"
                name="username"
                value={settings.username}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`form-input ${errors.username ? 'input-error' : ''}`}
                placeholder="username"
              />
            </div>
            {errors.username && <span className="error-message" id="username-error">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={settings.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              placeholder="you@example.com"
            />
            {errors.email && <span className="error-message" id="email-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <div className="label-row">
              <label htmlFor="bio" className="form-label">Bio</label>
              <span className={`char-counter ${settings.bio.length > 150 ? 'over-limit' : ''}`}>
                {settings.bio.length}/150
              </span>
            </div>
            <textarea
              id="bio"
              name="bio"
              value={settings.bio}
              onChange={handleInputChange}
              onBlur={handleBlur}
              rows={3}
              className={`form-textarea ${errors.bio ? 'input-error' : ''}`}
              placeholder="Tell us about yourself..."
            />
            {errors.bio ? (
              <span className="error-message" id="bio-error">{errors.bio}</span>
            ) : (
              <span className="help-text">Brief description for your profile page.</span>
            )}
          </div>
        </fieldset>

        {/* Appearance Preference Section */}
        <fieldset className="form-section">
          <legend className="section-title">Preferences</legend>
          
          <div className="form-group">
            <span className="form-label">Theme Mode</span>
            <div className="theme-selector">
              {(['light', 'dark', 'system'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleThemeChange(t)}
                  className={`theme-card ${settings.theme === t ? 'active' : ''}`}
                >
                  <span className="theme-card-icon">
                    {t === 'light' && '☀️'}
                    {t === 'dark' && '🌙'}
                    {t === 'system' && '💻'}
                  </span>
                  <span className="theme-card-label">
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notifications" className="form-label">
              Notification Level
            </label>
            <select
              id="notifications"
              name="notifications"
              value={settings.notifications}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="all">All Activities & Mentions</option>
              <option value="mentions">Mentions & Replies Only</option>
              <option value="none">Muted (No Notifications)</option>
            </select>
          </div>

          <div className="form-group toggle-group">
            <div className="toggle-info">
              <span className="toggle-title">Weekly Newsletter</span>
              <span className="toggle-desc">Receive updates, articles, and product announcements weekly.</span>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                name="newsletter"
                checked={settings.newsletter}
                onChange={handleInputChange}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </fieldset>

        {/* Privacy Section */}
        <fieldset className="form-section">
          <legend className="section-title">Privacy</legend>
          
          <div className="form-group">
            <label htmlFor="visibility" className="form-label">
              Profile Visibility
            </label>
            <select
              id="visibility"
              name="visibility"
              value={settings.visibility}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="public">Public (Visible to everyone)</option>
              <option value="friends">Friends Only (Visible to connections)</option>
              <option value="private">Private (Only visible to you)</option>
            </select>
          </div>
        </fieldset>

        {/* Actions Section */}
        <div className="form-actions">
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary"
            disabled={isSubmitting}
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span> Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

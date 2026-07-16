import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SettingsForm from './index';

describe('SettingsForm Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('1. renders all required fields with appropriate labels', () => {
    render(<SettingsForm />);

    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('New Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm New Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Theme Preference')).toBeInTheDocument();
    expect(screen.getByLabelText('Enable Email Notifications')).toBeInTheDocument();
    expect(screen.getByLabelText('Weekly Digest Detail')).toBeInTheDocument();
    expect(screen.getByLabelText('Bio')).toBeInTheDocument();
  });

  it('2. submitting empty required fields shows validation errors', () => {
    render(<SettingsForm />);

    const submitButton = screen.getByRole('button', { name: 'Save Settings' });
    fireEvent.click(submitButton);

    // Assert validation errors are displayed
    expect(screen.getByText('Full Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email Address is required')).toBeInTheDocument();

    // Assert accessibility attributes for error states
    const nameInput = screen.getByLabelText('Full Name');
    const emailInput = screen.getByLabelText('Email Address');

    expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    expect(emailInput).toHaveAttribute('aria-invalid', 'true');

    expect(nameInput).toHaveAttribute('aria-describedby', 'fullName-error');
    expect(emailInput).toHaveAttribute('aria-describedby', 'email-error');
  });

  it('3. toggling the "Receive Notifications" checkbox enables and disables the "Weekly Digest Detail" select', () => {
    render(<SettingsForm />);

    const notificationsCheckbox = screen.getByLabelText('Enable Email Notifications') as HTMLInputElement;
    const digestSelect = screen.getByLabelText('Weekly Digest Detail') as HTMLSelectElement;

    // Default state: Checked and Enabled
    expect(notificationsCheckbox.checked).toBe(true);
    expect(digestSelect.disabled).toBe(false);

    // Uncheck notifications
    fireEvent.click(notificationsCheckbox);
    expect(notificationsCheckbox.checked).toBe(false);
    expect(digestSelect.disabled).toBe(true);

    // Check notifications again
    fireEvent.click(notificationsCheckbox);
    expect(notificationsCheckbox.checked).toBe(true);
    expect(digestSelect.disabled).toBe(false);
  });

  it('4. entering an invalid email shows a pattern error and clears on-change when corrected', () => {
    render(<SettingsForm />);

    const nameInput = screen.getByLabelText('Full Name');
    const emailInput = screen.getByLabelText('Email Address');
    const submitButton = screen.getByRole('button', { name: 'Save Settings' });

    // Enter valid name, invalid email
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    fireEvent.click(submitButton);

    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('aria-invalid', 'true');

    // Change to valid email, should clear error on-change
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument();
    expect(emailInput).toHaveAttribute('aria-invalid', 'false');
  });

  it('5. password strength and mismatch validations show appropriate errors', () => {
    render(<SettingsForm />);

    const nameInput = screen.getByLabelText('Full Name');
    const emailInput = screen.getByLabelText('Email Address');
    const passwordInput = screen.getByLabelText('New Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm New Password');
    const submitButton = screen.getByRole('button', { name: 'Save Settings' });

    // Fill out valid name and email
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    // Scenario A: Less than 8 characters
    fireEvent.change(passwordInput, { target: { value: 'Short1!' } });
    fireEvent.click(submitButton);
    expect(screen.getByText('Password must be at least 8 characters long')).toBeInTheDocument();

    // Scenario B: Missing uppercase
    fireEvent.change(passwordInput, { target: { value: 'nouppercase1!' } });
    fireEvent.click(submitButton);
    expect(screen.getByText('Password must contain at least one uppercase letter')).toBeInTheDocument();

    // Scenario C: Missing lowercase
    fireEvent.change(passwordInput, { target: { value: 'NOLOWERCASE1!' } });
    fireEvent.click(submitButton);
    expect(screen.getByText('Password must contain at least one lowercase letter')).toBeInTheDocument();

    // Scenario D: Missing digit
    fireEvent.change(passwordInput, { target: { value: 'NoDigitsHere!' } });
    fireEvent.click(submitButton);
    expect(screen.getByText('Password must contain at least one number')).toBeInTheDocument();

    // Scenario E: Missing special character
    fireEvent.change(passwordInput, { target: { value: 'NoSpecial1' } });
    fireEvent.click(submitButton);
    expect(screen.getByText('Password must contain at least one special character (@$!%*?&)')).toBeInTheDocument();

    // Scenario F: Valid password but mismatch confirm password
    fireEvent.change(passwordInput, { target: { value: 'ValidPassword1!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'DifferentPassword1!' } });
    fireEvent.click(submitButton);
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();

    // Scenario G: Missing confirm password when password is set
    fireEvent.change(confirmPasswordInput, { target: { value: '' } });
    fireEvent.click(submitButton);
    expect(screen.getByText('Confirm Password is required')).toBeInTheDocument();

    // Correct confirm password
    fireEvent.change(confirmPasswordInput, { target: { value: 'ValidPassword1!' } });
    expect(screen.queryByText('Passwords do not match')).not.toBeInTheDocument();
    expect(screen.queryByText('Confirm Password is required')).not.toBeInTheDocument();
  });

  it('6 & 7. submitting a valid form shows loading state, disables fields, shows success toast, and auto-dismisses toast', async () => {
    render(<SettingsForm />);

    const nameInput = screen.getByLabelText('Full Name');
    const emailInput = screen.getByLabelText('Email Address');
    const passwordInput = screen.getByLabelText('New Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm New Password');
    const themeSelect = screen.getByLabelText('Theme Preference');
    const notificationsCheckbox = screen.getByLabelText('Enable Email Notifications');
    const digestSelect = screen.getByLabelText('Weekly Digest Detail');
    const bioTextarea = screen.getByLabelText('Bio');
    const submitButton = screen.getByRole('button', { name: 'Save Settings' });

    // Fill form with valid inputs
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'SecurePass123!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'SecurePass123!' } });
    fireEvent.change(themeSelect, { target: { value: 'dark' } });
    fireEvent.change(bioTextarea, { target: { value: 'Software Developer' } });

    // Click submit
    fireEvent.click(submitButton);

    // Check loading state
    expect(submitButton).toHaveTextContent('Saving...');
    expect(submitButton).toBeDisabled();
    expect(nameInput).toBeDisabled();
    expect(emailInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();
    expect(confirmPasswordInput).toBeDisabled();
    expect(themeSelect).toBeDisabled();
    expect(notificationsCheckbox).toBeDisabled();
    expect(digestSelect).toBeDisabled();
    expect(bioTextarea).toBeDisabled();

    // Fast-forward API simulator (1 second)
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    // Loading should be complete
    expect(submitButton).not.toHaveTextContent('Saving...');
    expect(submitButton).not.toBeDisabled();
    expect(nameInput).not.toBeDisabled();

    // Success toast should appear
    const toast = screen.getByRole('status');
    expect(toast).toBeInTheDocument();
    expect(screen.getByText('Settings saved successfully!')).toBeInTheDocument();

    // Fast-forward auto-dismiss timer (4 seconds)
    await act(async () => {
      vi.advanceTimersByTime(4000);
    });

    // Toast should disappear
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('8. accessibility markers (labels, aria-invalid, role="alert") are present and update correctly', () => {
    render(<SettingsForm />);

    const nameInput = screen.getByLabelText('Full Name');
    const submitButton = screen.getByRole('button', { name: 'Save Settings' });

    // Initial state: not invalid
    expect(nameInput).toHaveAttribute('aria-invalid', 'false');
    expect(nameInput).not.toHaveAttribute('aria-describedby');

    // Trigger error
    fireEvent.click(submitButton);

    // Error state
    expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    expect(nameInput).toHaveAttribute('aria-describedby', 'fullName-error');
    
    const errorEl = screen.getByText('Full Name is required');
    expect(errorEl).toHaveAttribute('id', 'fullName-error');
    expect(errorEl).toHaveAttribute('role', 'alert');
  });

  it('allows manual dismiss of success toast via close button', async () => {
    render(<SettingsForm />);

    const nameInput = screen.getByLabelText('Full Name');
    const emailInput = screen.getByLabelText('Email Address');
    const submitButton = screen.getByRole('button', { name: 'Save Settings' });

    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });

    fireEvent.click(submitButton);

    // Fast-forward API simulator (1 second)
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    // Success toast is visible
    expect(screen.getByRole('status')).toBeInTheDocument();

    const closeBtn = screen.getByLabelText('Close notification');
    fireEvent.click(closeBtn);

    // Success toast is dismissed immediately
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});

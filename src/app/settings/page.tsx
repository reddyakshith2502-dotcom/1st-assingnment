import React from 'react';
import SettingsForm from '../../components/SettingsForm';

export const metadata = {
  title: 'Settings - Capstone Portal',
  description: 'Manage your user profile configuration and email notification settings.',
};

export default function SettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full py-6">
      <div className="w-full max-w-xl">
        <SettingsForm />
      </div>
    </div>
  );
}

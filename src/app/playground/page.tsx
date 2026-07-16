"use client";

import { useState } from 'react';
import Modal from '../../../playground/Modal';
import Tabs from '../../../playground/Tabs';
import Disclosure from '../../../playground/Disclosure';

export default function PlaygroundPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mockTabs = [
    {
      label: 'Profile Info',
      content: (
        <div className="space-y-3">
          <h4 className="font-semibold text-text-h">User Profile Information</h4>
          <p className="text-xs text-text">
            This tab panel is keyboard focusable. Try using your Tab key to focus elements or navigate between tab headings with Left/Right arrow keys.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Display Name"
              className="px-3 py-1.5 border border-border bg-bg/50 rounded-lg text-xs w-full focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>
      ),
    },
    {
      label: 'Security Settings',
      content: (
        <div className="space-y-3">
          <h4 className="font-semibold text-text-h">Security & Authentication</h4>
          <p className="text-xs text-text">
            Configure passwords, two-factor authentication, and login sessions. Focus is controlled automatically via Home, End, and Arrow keys.
          </p>
          <button
            type="button"
            className="px-3 py-1.5 bg-accent text-white font-semibold rounded-lg text-xs hover:bg-accent/90"
          >
            Enable 2FA
          </button>
        </div>
      ),
    },
    {
      label: 'Notification Config',
      content: (
        <div className="space-y-3">
          <h4 className="font-semibold text-text-h">Notification Preferences</h4>
          <p className="text-xs text-text">
            Set up email digests and push alerts. Conditional fields automatically lock based on selections.
          </p>
          <label className="flex items-center gap-2 text-xs">
            <input type="checkbox" defaultChecked className="rounded border-border text-accent focus:ring-accent" />
            <span>Subscribed to Weekly Digest</span>
          </label>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent border border-accent/20 mb-3">
          W3C ARIA Testing
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-text-h mb-2">
          Accessible Component Playground
        </h2>
        <p className="text-sm text-text">
          Interactive widgets built entirely from scratch with functional focus management, key listeners, and accessible roles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Interactive Modal Demo */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-border bg-bg/40 backdrop-blur-md space-y-4">
            <h3 className="text-lg font-bold text-text-h">1. Accessible Modal Dialog</h3>
            <p className="text-xs text-text leading-relaxed">
              Implemented against the W3C Modal Dialog pattern. Pressing the button below opens the dialog, traps focus inside using `Tab` and `Shift+Tab`, and restores focus to this button upon close. The dialog can be closed with the `Escape` key.
            </p>
            <button
              type="button"
              id="open-modal-trigger"
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 bg-accent text-white font-semibold rounded-xl text-xs shadow-md shadow-accent/10 hover:bg-accent/90 transition-all hover:scale-[1.02] active:scale-100"
            >
              Open Accessible Modal
            </button>
          </div>

          {/* Custom Disclosure Widget */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-text-h">2. Disclosure Widget</h3>
            <p className="text-xs text-text mb-2">
              Implemented against the W3C Disclosure pattern. Press `Tab` to focus the trigger below, then toggle with `Space` or `Enter`.
            </p>
            <Disclosure title="Frequently Asked Questions (FAQ) Disclosure" id="custom-disclosure">
              <div className="space-y-2">
                <p className="text-xs leading-relaxed text-text">
                  This custom disclosure works natively using `aria-expanded` and `aria-controls` properties linked to this panel.
                </p>
                <a href="#demo" className="text-xs text-accent font-semibold hover:underline">
                  Test link within disclosure
                </a>
              </div>
            </Disclosure>
          </div>
        </div>

        {/* Right Column: Custom Tabs Demo */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-text-h">3. Accessible Tabs</h3>
          <p className="text-xs text-text">
            Implemented against the W3C Tabs pattern. Selecting a tab focuses the header. Left/Right arrows rotate focus, Home/End jump to ends.
          </p>
          <Tabs tabs={mockTabs} baseId="demo-tabs" />
        </div>
      </div>

      {/* Custom Modal Rendering */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Interactive Verification Dialog"
      >
        <div className="space-y-4">
          <p className="text-xs leading-relaxed text-text">
            This modal traps keyboard focus. Try pressing `Tab` repeatedly to cycle focus between the input below, close buttons, and actions.
          </p>
          <div className="space-y-2">
            <label htmlFor="modal-input-name" className="text-xs font-semibold text-text-h block">
              Enter Profile Name
            </label>
            <input
              id="modal-input-name"
              type="text"
              placeholder="e.g. Jane Doe"
              className="w-full px-3 py-2 border border-border bg-bg/50 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="modal-select-role" className="text-xs font-semibold text-text-h block">
              Select Profile Role
            </label>
            <select
              id="modal-select-role"
              className="w-full px-3 py-2 border border-border bg-bg/50 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-accent"
            >
              <option value="user">Standard User</option>
              <option value="admin">Administrator</option>
              <option value="guest">Guest</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}

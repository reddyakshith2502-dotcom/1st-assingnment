import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Selector for all focusable elements
  const focusableElementsSelector =
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

  useEffect(() => {
    if (isOpen) {
      // Save current active element to restore focus later
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Focus the modal container or the first focusable element
      if (modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          focusableElementsSelector
        );
        if (focusableElements.length > 0) {
          // Focus first element (e.g. Close button or input)
          focusableElements[0].focus();
        } else {
          modalRef.current.focus();
        }
      }

      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Restore focus
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Tab trapping and Escape key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === 'Escape') {
      onClose();
      return;
    }

    if (e.key === 'Tab') {
      if (!modalRef.current) return;

      const focusableElements = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(focusableElementsSelector)
      );

      if (focusableElements.length === 0) {
        e.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (e.shiftKey) {
        // Shift + Tab: trap backwards
        if (activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        // Tab: trap forwards
        if (activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className="w-full max-w-lg bg-bg border border-border rounded-2xl shadow-xl p-6 relative flex flex-col focus:outline-none animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking dialog body
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
          <h2 id="modal-title" className="text-xl font-bold text-text-h">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="text-text hover:text-text-h h-8 w-8 rounded-lg flex items-center justify-center border border-border bg-bg/50 hover:bg-bg hover:scale-105 active:scale-100 transition-all"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="text-sm text-text mb-6 flex-1 overflow-y-auto max-h-[60vh]">
          {children}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-border pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg border border-border text-text hover:bg-bg/50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-accent text-white hover:bg-accent/90 shadow-md shadow-accent/15 transition-colors"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
}

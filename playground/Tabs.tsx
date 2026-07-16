import React, { useState, useRef, useEffect } from 'react';

interface TabItem {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  baseId?: string;
}

export default function Tabs({ tabs, baseId = 'custom-tabs' }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Keep array of refs aligned with tab length
  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, tabs.length);
  }, [tabs]);

  const focusTab = (index: number) => {
    const nextIndex = (index + tabs.length) % tabs.length;
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'ArrowRight':
        focusTab(index + 1);
        e.preventDefault();
        break;
      case 'ArrowLeft':
        focusTab(index - 1);
        e.preventDefault();
        break;
      case 'Home':
        focusTab(0);
        e.preventDefault();
        break;
      case 'End':
        focusTab(tabs.length - 1);
        e.preventDefault();
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full flex flex-col border border-border rounded-2xl bg-bg/40 backdrop-blur-md p-6">
      {/* Tab List */}
      <div
        role="tablist"
        aria-label="Interactive Sections"
        className="flex border-b border-border mb-6 gap-2"
      >
        {tabs.map((tab, idx) => {
          const isSelected = activeIndex === idx;
          const tabId = `${baseId}-tab-${idx}`;
          const panelId = `${baseId}-panel-${idx}`;

          return (
            <button
              key={idx}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              role="tab"
              id={tabId}
              aria-selected={isSelected}
              aria-controls={panelId}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setActiveIndex(idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`px-4 py-2 text-sm font-semibold rounded-t-lg border-b-2 transition-all ${
                isSelected
                  ? 'border-accent text-accent'
                  : 'border-transparent text-text hover:text-text-h hover:border-border'
              } focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      {tabs.map((tab, idx) => {
        const isSelected = activeIndex === idx;
        const tabId = `${baseId}-tab-${idx}`;
        const panelId = `${baseId}-panel-${idx}`;

        return (
          <div
            key={idx}
            role="tabpanel"
            id={panelId}
            aria-labelledby={tabId}
            tabIndex={0}
            hidden={!isSelected}
            className={`p-4 bg-bg/60 border border-border rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
              isSelected ? 'block' : 'hidden'
            }`}
          >
            {tab.content}
          </div>
        );
      })}
    </div>
  );
}

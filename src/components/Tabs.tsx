import { useState, type ReactNode } from "react";

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export function Tabs({ tabs, defaultTab, className = "" }: TabsProps) {
  const [activeId, setActiveId] = useState(defaultTab ?? tabs[0]?.id ?? "");

  const active = tabs.find((t) => t.id === activeId);

  return (
    <div data-bui-tabs="true" className={className}>
      <div className="flex gap-1 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveId(tab.id)}
            className={`px-4 py-2 text-body-1 font-bold border-b-2 transition-colors ${
              tab.id === activeId
                ? "text-primary border-primary"
                : "text-text-secondary border-transparent hover:text-text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-4">{active?.content}</div>
    </div>
  );
}

// ─── ViewToggle ─────────────────────────────────────────────────────────────

export interface ViewToggleProps {
  view: "grid" | "list";
  onChange: (view: "grid" | "list") => void;
  className?: string;
}

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="6" height="6" rx="1" fill="currentColor" />
    <rect x="9" y="1" width="6" height="6" rx="1" fill="currentColor" />
    <rect x="1" y="9" width="6" height="6" rx="1" fill="currentColor" />
    <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" />
  </svg>
);

const ListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="3" width="14" height="2" rx="1" fill="currentColor" />
    <rect x="1" y="7" width="14" height="2" rx="1" fill="currentColor" />
    <rect x="1" y="11" width="14" height="2" rx="1" fill="currentColor" />
  </svg>
);

export function ViewToggle({ view, onChange, className = "" }: ViewToggleProps) {
  return (
    <div
      data-bui-view-toggle="true"
      className={`inline-flex rounded-md bg-surface-elev border border-border p-0.5 ${className}`}
    >
      <button
        type="button"
        onClick={() => onChange("grid")}
        className={`px-3 py-1.5 rounded-sm text-body-2 font-bold transition-colors ${
          view === "grid"
            ? "bg-surface text-text-primary"
            : "text-text-secondary hover:text-text-primary"
        }`}
        aria-label="Grid view"
      >
        <GridIcon />
      </button>
      <button
        type="button"
        onClick={() => onChange("list")}
        className={`px-3 py-1.5 rounded-sm text-body-2 font-bold transition-colors ${
          view === "list"
            ? "bg-surface text-text-primary"
            : "text-text-secondary hover:text-text-primary"
        }`}
        aria-label="List view"
      >
        <ListIcon />
      </button>
    </div>
  );
}

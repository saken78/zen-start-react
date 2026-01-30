import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useConfig } from "@/hooks/useConfig";
import { palettes } from "@/lib/palette";
import type { PaletteName } from "@/types/config";

interface Command {
  id: string;
  label: string;
  description?: string;
  action: () => void;
  category: string;
  shortcut?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onOpenSettings: () => void;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onOpenSettings,
  onClose,
}) => {
  const { config, switchPalette, updateNested } = useConfig();
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Build command list
  const commands: Command[] = [
    // Theme commands
    ...Object.keys(palettes).map((paletteName) => ({
      id: `theme-${paletteName}`,
      label: `Switch to ${paletteName} theme`,
      description: paletteName.charAt(0).toUpperCase() + paletteName.slice(1),
      action: () => {
        switchPalette(paletteName as PaletteName);
        onClose();
      },
      category: "Theme",
    })),

    // Settings command
    {
      id: "open-settings",
      label: "Open Settings",
      description: "Configure display, clock, and weather",
      action: () => {
        onOpenSettings();
        onClose();
      },
      category: "Settings",
      shortcut: "⌘S",
    },

    // Clock commands
    {
      id: "toggle-clock",
      label: `${config.clock.enabled ? "Disable" : "Enable"} Clock`,
      description: "Toggle clock display in status bar",
      action: () => {
        updateNested("clock", { enabled: !config.clock.enabled });
        onClose();
      },
      category: "Display",
    },

    // Weather commands
    {
      id: "toggle-weather",
      label: `${config.temperature.enabled ? "Disable" : "Enable"} Weather`,
      description: "Toggle weather display in status bar",
      action: () => {
        updateNested("temperature", { enabled: !config.temperature.enabled });
        onClose();
      },
      category: "Display",
    },
  ];

  // Filter commands based on search
  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(search.toLowerCase()) ||
      cmd.description?.toLowerCase().includes(search.toLowerCase()) ||
      cmd.category.toLowerCase().includes(search.toLowerCase()),
  );

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev === 0 ? filteredCommands.length - 1 : prev - 1));
          break;
        case "Enter":
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20'>
      <div className='bg-mantle rounded-lg shadow-2xl w-96 border border-surface0 overflow-hidden'>
        {/* Search Input */}
        <div className='flex items-center gap-3 px-4 py-3 border-b border-surface0'>
          <Search className='w-5 h-5 text-subtext1 flex-shrink-0' />
          <input
            ref={inputRef}
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search commands...'
            className='flex-1 bg-transparent text-text placeholder-subtext1 outline-none text-sm'
          />
          <button onClick={onClose} className='p-1 hover:bg-surface0 rounded transition-colors'>
            <X className='w-4 h-4 text-subtext1' />
          </button>
        </div>

        {/* Commands List */}
        <div className='max-h-96 overflow-y-auto'>
          {filteredCommands.length > 0 ? (
            <div>
              {/* Group by category */}
              {Array.from(new Set(filteredCommands.map((cmd) => cmd.category))).map((category) => {
                const categoryCommands = filteredCommands.filter(
                  (cmd) => cmd.category === category,
                );

                return (
                  <div key={category}>
                    {/* Category Header */}
                    <div className='px-4 py-2 text-xs font-bold uppercase tracking-wider text-subtext0 bg-crust sticky top-0'>
                      {category}
                    </div>

                    {/* Commands */}
                    {categoryCommands.map((cmd) => {
                      const globalIndex = filteredCommands.indexOf(cmd);
                      const isSelected = globalIndex === selectedIndex;

                      return (
                        <button
                          key={cmd.id}
                          onClick={() => cmd.action()}
                          className={`w-full px-4 py-3 flex items-center justify-between transition-colors text-left border-b border-surface0 hover:bg-surface0 ${
                            isSelected ? "bg-surface1" : ""
                          }`}
                        >
                          <div className='flex-1 min-w-0'>
                            <div className='text-sm font-medium text-text truncate'>
                              {cmd.label}
                            </div>
                            {cmd.description && (
                              <div className='text-xs text-subtext1 truncate'>
                                {cmd.description}
                              </div>
                            )}
                          </div>
                          {cmd.shortcut && (
                            <span className='text-xs text-subtext1 ml-2 flex-shrink-0'>
                              {cmd.shortcut}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className='p-8 text-center'>
              <p className='text-sm text-subtext1'>No commands found</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className='px-4 py-2 bg-crust border-t border-surface0 text-xs text-subtext1 flex items-center justify-between'>
          <span>↑↓ Navigate • Enter Select • Esc Close</span>
        </div>
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import { CommandPalette } from "@/components/CommandPalette/CommandPalette";
import { SettingsDialog } from "@/components/Settings/SettingsDialog";
import { StatusBar } from "@/components/StatusBar/StatusBar";
import { Tabs } from "@/components/Tabs/Tabs";
import { ConfigProvider } from "@/contexts/ConfigContext";
import { useConfig } from "@/hooks/useConfig";
import "@/index.css";

function AppContent() {
  const { config } = useConfig();
  const [showSettings, setShowSettings] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  // Handle Cmd+K for command palette and Cmd+, for settings
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if user is typing in input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Cmd+K (Ctrl+K on Windows/Linux) for command palette
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowCommandPalette(true);
      }

      // Cmd+, (Ctrl+,) for settings
      if ((e.metaKey || e.ctrlKey) && e.key === ",") {
        e.preventDefault();
        setShowSettings(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!config.tabs || config.tabs.length === 0) {
    return (
      <div className='w-screen h-screen bg-base flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-text mb-2'>Zen Start</h1>
          <p className='text-subtext0'>No tabs configured yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-screen h-screen bg-base flex flex-col overflow-hidden'>
      {/* Main content area */}
      <div className='flex-1 relative overflow-hidden'>
        <Tabs tabs={config.tabs} />
      </div>

      {/* Status bar */}
      <StatusBar tabCount={config.tabs.length} onSettingsClick={() => setShowSettings(true)} />

      {/* Dialogs */}
      <SettingsDialog isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <CommandPalette
        isOpen={showCommandPalette}
        onOpenSettings={() => setShowSettings(true)}
        onClose={() => setShowCommandPalette(false)}
      />
    </div>
  );
}

function App() {
  return (
    <ConfigProvider>
      <AppContent />
    </ConfigProvider>
  );
}

export default App;

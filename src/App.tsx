import { ConfigProvider } from '@/contexts/ConfigContext';
import { useConfig } from '@/hooks/useConfig';
import { Tabs } from '@/components/Tabs/Tabs';
import { StatusBar } from '@/components/StatusBar/StatusBar';
import '@/index.css';

function AppContent() {
  const { config } = useConfig();

  if (!config.tabs || config.tabs.length === 0) {
    return (
      <div className="w-screen h-screen bg-base flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text mb-2">Zen Start</h1>
          <p className="text-subtext0">No tabs configured yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-base flex flex-col overflow-hidden">
      {/* Main content area */}
      <div className="flex-1 relative overflow-hidden">
        <Tabs tabs={config.tabs} />
      </div>

      {/* Status bar */}
      <StatusBar tabCount={config.tabs.length} />
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

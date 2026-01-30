import { Settings } from 'lucide-react';
import type React from 'react';
import { Clock } from '@/components/Clock/Clock';
import { Weather } from '@/components/Weather/Weather';
import { useConfig } from '@/hooks/useConfig';

interface StatusBarProps {
  tabName?: string;
  tabIndex?: number;
  tabCount?: number;
  onSettingsClick?: () => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  tabName,
  tabIndex = 0,
  tabCount = 1,
  onSettingsClick,
}) => {
  const { config } = useConfig();

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-mantle border-t border-surface0 shadow-catppuccin z-40'>
      <div className='flex items-center justify-between px-4 py-2 h-12'>
        {/* Left section - Tab info */}
        <div className='flex items-center gap-4'>
          {tabName && (
            <span className='text-xs text-subtext0 uppercase tracking-wider'>
              {tabName} · {tabIndex + 1}/{tabCount}
            </span>
          )}

          {/* Tab indicators */}
          {config.tabs && (
            <div className='flex items-center gap-2 pl-2 border-l border-surface0'>
              {config.tabs.map((tab, index) => (
                <div
                  key={tab.id}
                  className={`text-xs font-bold transition-colors ${
                    index === tabIndex ? 'text-green' : 'text-subtext1'
                  }`}
                  title={tab.name}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Center section - Spacer */}
        <div className='flex-1' />

        {/* Right section - Widgets */}
        <div className='flex items-center gap-4 pl-4 border-l border-surface0'>
          {/* Weather widget */}
          {config.temperature.enabled && (
            <div>
              <Weather />
            </div>
          )}

          {/* Clock widget */}
          {config.clock.enabled && (
            <div>
              <Clock />
            </div>
          )}

          {/* Settings button */}
          {onSettingsClick && (
            <button
              onClick={onSettingsClick}
              className='p-1 hover:bg-surface0 rounded transition-colors'
              title='Settings (⌘,)'
            >
              <Settings className='w-4 h-4 text-subtext1 hover:text-text' />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

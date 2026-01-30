import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useConfig } from '@/hooks/useConfig';
import { palettes } from '@/lib/palette';
import type { PaletteName } from '@/types/config';

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsDialog: React.FC<SettingsDialogProps> = ({ isOpen, onClose }) => {
  const { config, updateNested, switchPalette } = useConfig();
  const [tempLocation, setTempLocation] = useState(config.temperature.location);
  const [tempScale, setTempScale] = useState(config.temperature.scale);
  const [clockFormat, setClockFormat] = useState(config.clock.format);
  const [clockEnabled, setClockEnabled] = useState(config.clock.enabled);
  const [weatherEnabled, setWeatherEnabled] = useState(config.temperature.enabled);

  const handleSave = () => {
    updateNested('temperature', {
      location: tempLocation,
      scale: tempScale,
      enabled: weatherEnabled,
    });
    updateNested('clock', {
      format: clockFormat,
      enabled: clockEnabled,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-mantle rounded-lg shadow-2xl w-96 max-h-96 overflow-y-auto border border-surface0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-surface0 sticky top-0 bg-mantle">
          <h2 className="text-lg font-bold text-text">Settings</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-surface0 rounded transition-colors"
          >
            <X className="w-5 h-5 text-text" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Display Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-subtext0">Display</h3>

            {/* Theme Selection */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-subtext1">Theme</label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(palettes) as PaletteName[]).map((paletteName) => (
                  <button
                    key={paletteName}
                    onClick={() => switchPalette(paletteName)}
                    className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
                      config.currentPalette === paletteName
                        ? 'bg-green text-base'
                        : 'bg-surface1 text-text hover:bg-surface2'
                    }`}
                  >
                    {paletteName}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Clock Section */}
          <div className="space-y-3 pb-3 border-b border-surface0">
            <h3 className="text-sm font-bold uppercase tracking-wider text-subtext0">Clock</h3>

            {/* Clock Enable Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-subtext1">Enable</label>
              <button
                onClick={() => setClockEnabled(!clockEnabled)}
                className={`w-10 h-6 rounded-full transition-colors ${
                  clockEnabled ? 'bg-green' : 'bg-surface1'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-crust transition-transform ${
                    clockEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Clock Format */}
            {clockEnabled && (
              <div className="space-y-1">
                <label className="text-xs font-medium text-subtext1">Format</label>
                <input
                  type="text"
                  value={clockFormat}
                  onChange={(e) => setClockFormat(e.target.value)}
                  placeholder="h:i p"
                  className="w-full px-3 py-2 bg-surface0 border border-surface1 rounded text-xs text-text placeholder-subtext1 focus:outline-none focus:border-green"
                />
                <p className="text-xs text-subtext1">h=12h, H=24h, i=min, s=sec, p=AM/PM</p>
              </div>
            )}
          </div>

          {/* Weather Section */}
          <div className="space-y-3 pb-3 border-b border-surface0">
            <h3 className="text-sm font-bold uppercase tracking-wider text-subtext0">Weather</h3>

            {/* Weather Enable Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-subtext1">Enable</label>
              <button
                onClick={() => setWeatherEnabled(!weatherEnabled)}
                className={`w-10 h-6 rounded-full transition-colors ${
                  weatherEnabled ? 'bg-green' : 'bg-surface1'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-crust transition-transform ${
                    weatherEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Weather Location */}
            {weatherEnabled && (
              <div className="space-y-1">
                <label className="text-xs font-medium text-subtext1">Location</label>
                <input
                  type="text"
                  value={tempLocation}
                  onChange={(e) => setTempLocation(e.target.value)}
                  placeholder="City name"
                  className="w-full px-3 py-2 bg-surface0 border border-surface1 rounded text-xs text-text placeholder-subtext1 focus:outline-none focus:border-green"
                />
              </div>
            )}

            {/* Temperature Scale */}
            {weatherEnabled && (
              <div className="space-y-2">
                <label className="text-xs font-medium text-subtext1">Scale</label>
                <div className="flex gap-2">
                  {(['C', 'F'] as const).map((scale) => (
                    <button
                      key={scale}
                      onClick={() => setTempScale(scale)}
                      className={`flex-1 px-3 py-2 rounded text-xs font-medium transition-colors ${
                        tempScale === scale
                          ? 'bg-green text-base'
                          : 'bg-surface1 text-text hover:bg-surface2'
                      }`}
                    >
                      °{scale}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 p-4 border-t border-surface0 bg-crust sticky bottom-0">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-surface0 hover:bg-surface1 text-text rounded text-xs font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-green hover:bg-green/90 text-base rounded text-xs font-medium transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

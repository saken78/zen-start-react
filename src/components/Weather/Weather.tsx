import React, { useState } from 'react';
import {
  Cloud,
  CloudRain,
  Sun,
  CloudSnow,
  CloudLightning,
  AlertCircle,
} from 'lucide-react';
import { useConfig } from '@/hooks/useConfig';
import { useWeather } from '@/hooks/useWeather';

export const Weather: React.FC = () => {
  const { config, updateNested } = useConfig();
  const [scale, setScale] = useState<'C' | 'F'>(config.temperature.scale);
  const { weather, loading, error } = useWeather(config.temperature.location);

  const handleToggleScale = () => {
    const newScale = scale === 'C' ? 'F' : 'C';
    setScale(newScale);
    updateNested('temperature', { scale: newScale });
  };

  const convertTemp = (temp: number): number => {
    if (scale === 'F') {
      return Math.round((temp * 9) / 5 + 32);
    }
    return temp;
  };

  const getWeatherIcon = (condition: string): React.ReactNode => {
    const conditionLower = condition.toLowerCase();

    const iconProps = {
      className: 'w-4 h-4',
      color: '#8aadf4', // default blue
    };

    if (
      conditionLower.includes('cloud') ||
      conditionLower.includes('mist') ||
      conditionLower.includes('haze') ||
      conditionLower.includes('smoke')
    ) {
      return <Cloud {...iconProps} color="#8aadf4" />;
    }

    if (
      conditionLower.includes('drizzle') ||
      conditionLower.includes('rain')
    ) {
      return <CloudRain {...iconProps} color="#8aadf4" />;
    }

    if (conditionLower.includes('snow')) {
      return <CloudSnow {...iconProps} color="#8aadf4" />;
    }

    if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
      return <Sun {...iconProps} color="#eed49f" />;
    }

    if (conditionLower.includes('thunderstorm')) {
      return <CloudLightning {...iconProps} color="#8aadf4" />;
    }

    return <Cloud {...iconProps} />;
  };

  if (error) {
    return (
      <div className="flex items-center gap-2 px-3 py-1 rounded-lg">
        <AlertCircle className="w-4 h-4 text-red" />
        <span className="text-xs font-medium text-subtext0">Error</span>
      </div>
    );
  }

  if (loading || !weather) {
    return (
      <div className="flex items-center gap-2 px-3 py-1">
        <div className="w-4 h-4 bg-surface1 rounded-full animate-pulse" />
        <span className="text-xs font-medium text-subtext0">Loading...</span>
      </div>
    );
  }

  return (
    <div
      onClick={handleToggleScale}
      className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-surface0/50 transition-colors cursor-pointer group"
    >
      {getWeatherIcon(weather.condition)}

      <span className="text-xs text-subtext1 hidden group-hover:inline-block font-medium">
        {config.temperature.location}
      </span>

      <span className="text-text text-xs font-bold">
        {convertTemp(weather.temperature)}
      </span>

      <span className="text-text text-xs">°{scale}</span>
    </div>
  );
};

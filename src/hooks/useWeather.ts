import { useEffect, useState } from 'react';
import { fetchWeather } from '@/lib/weatherAPI';
import type { WeatherData } from '@/types/weather';

export const useWeather = (location: string) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchWeather(location);
        if (mounted) {
          setWeather(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch weather');
          console.error('Failed to fetch weather:', err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadWeather();

    return () => {
      mounted = false;
    };
  }, [location]);

  return { weather, loading, error };
};

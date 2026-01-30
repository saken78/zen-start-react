import type { OpenWeatherResponse, WeatherData } from '@/types/weather';

const APP_ID = '50a34e070dd5c09a99554b57ab7ea7e2';
const WEATHER_CACHE_TTL = 3600000; // 1 hour in milliseconds
const WEATHER_CACHE_KEY = 'zen-weather-cache';

interface CachedWeather {
  timestamp: number;
  data: WeatherData;
}

export const fetchWeather = async (location: string): Promise<WeatherData> => {
  try {
    // Check cache first
    const cached = getWeatherFromCache(location);
    if (cached) {
      console.log('Using cached weather data for', location);
      return cached;
    }

    // Fetch from API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      location,
    )}&units=metric&appid=${APP_ID}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data: OpenWeatherResponse = await response.json();

    const weatherData: WeatherData = {
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main.toLowerCase(),
    };

    // Cache the result
    cacheWeatherData(location, weatherData);

    return weatherData;
  } catch (error) {
    console.error('Weather API error:', error);
    throw error;
  }
};

const getWeatherFromCache = (location: string): WeatherData | null => {
  try {
    const cache = localStorage.getItem(WEATHER_CACHE_KEY);
    if (!cache) return null;

    const weatherCache: Record<string, CachedWeather> = JSON.parse(cache);
    const cached = weatherCache[location];

    if (!cached) return null;

    // Check if cache is still valid
    const now = Date.now();
    if (now - cached.timestamp > WEATHER_CACHE_TTL) {
      // Cache expired, remove it
      delete weatherCache[location];
      localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(weatherCache));
      return null;
    }

    return cached.data;
  } catch (error) {
    console.error('Error reading weather cache:', error);
    return null;
  }
};

const cacheWeatherData = (location: string, data: WeatherData): void => {
  try {
    let cache: Record<string, CachedWeather> = {};

    const existing = localStorage.getItem(WEATHER_CACHE_KEY);
    if (existing) {
      cache = JSON.parse(existing);
    }

    cache[location] = {
      timestamp: Date.now(),
      data,
    };

    localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('Error caching weather data:', error);
  }
};

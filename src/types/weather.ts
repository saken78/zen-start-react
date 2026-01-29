export interface WeatherData {
  temperature: number;
  condition: string;
}

export interface WeatherForecast {
  conditions: string[];
  icon: string;
  color: string;
}

export interface OpenWeatherResponse {
  main: {
    temp: number;
  };
  weather: Array<{
    main: string;
  }>;
}

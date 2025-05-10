import { useState, useEffect } from "react";

interface WeatherData {
  currentWeather: {
    temperature: number;
    temperatureApparent: number;
    humidity: number;
    conditionCode: string;
    uvIndex: number;
    visibility: number;
  };
  forecastDaily: {
    days: Array<{
      conditionCode: string;
      temperatureMax: number;
      temperatureMin: number;
      precipitationChance: number;
    }>;
  };
}

export function useWeather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/weather");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch weather data: ${response.status}`);
        }
        
        const weatherData = await response.json();
        setData(weatherData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error occurred"));
        console.error("Error fetching weather data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
    
    // Refresh weather data every 15 minutes
    const intervalId = setInterval(fetchWeather, 15 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  return { data, isLoading, error };
}
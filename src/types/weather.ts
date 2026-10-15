export type WeatherKind =
  | "clear"
  | "clear-night"
  | "partly-cloudy"
  | "cloudy"
  | "fog"
  | "drizzle"
  | "rain"
  | "showers"
  | "sleet"
  | "snow"
  | "thunder";

export interface CurrentWeather {
  temperature: number;
  windKph: number;
  kind: WeatherKind;
  label: string;
}

export interface DailyForecast {
  date: string;
  min: number;
  max: number;
  kind: WeatherKind;
  label: string;
}

export interface Weather {
  current: CurrentWeather;
  daily: DailyForecast[];
  updatedAt: string;
}

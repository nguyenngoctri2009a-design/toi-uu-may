export type Language = 'vi' | 'en';

export interface HardwarePreset {
  id: string;
  name: string;
  fpsGain: string;
  vramSaved: string;
  recommendedFor: string;
  description: string;
  color: string;
}

export interface TelemetryData {
  scenario: string;
  stockFps: number;
  optimizedFps: number;
  low1PercentStock: number;
  low1PercentOptimized: number;
}

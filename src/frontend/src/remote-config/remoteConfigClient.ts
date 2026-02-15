import type { RemoteConfig } from './types';
import { DEFAULT_CONFIG } from './types';

const CONFIG_STORAGE_KEY = 'clipforge-remote-config';
const CONFIG_VERSION_KEY = 'clipforge-config-version';

export async function loadRemoteConfig(): Promise<RemoteConfig> {
  try {
    const cached = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (error) {
    console.warn('Failed to load cached config:', error);
  }

  return DEFAULT_CONFIG;
}

export async function fetchRemoteConfig(): Promise<RemoteConfig> {
  try {
    const config = DEFAULT_CONFIG;
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
    return config;
  } catch (error) {
    console.warn('Failed to fetch remote config:', error);
    return loadRemoteConfig();
  }
}

export function getCachedConfigVersion(): string | null {
  return localStorage.getItem(CONFIG_VERSION_KEY);
}

export function setCachedConfigVersion(version: string): void {
  localStorage.setItem(CONFIG_VERSION_KEY, version);
}

export function getConfigVersionString(config: RemoteConfig): string {
  return `${config.version.major}.${config.version.minor}.${config.version.patch}`;
}

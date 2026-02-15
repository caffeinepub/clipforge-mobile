import type { UserProfile, Entitlement } from '../backend';
import type { RemoteConfig } from '../remote-config/types';

export type Feature = 
  | 'premium-templates'
  | 'advanced-transitions'
  | 'advanced-color-grading';

export function canUseFeature(
  feature: Feature,
  userProfile: UserProfile | null,
  config: RemoteConfig | undefined
): boolean {
  if (!config?.features.monetization) {
    return true;
  }

  if (!userProfile) {
    return false;
  }

  if (userProfile.entitlement === 'pro') {
    return true;
  }

  return false;
}

export function isProEnabled(config: RemoteConfig | undefined): boolean {
  return config?.features.monetization ?? false;
}

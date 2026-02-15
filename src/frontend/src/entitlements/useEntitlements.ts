import { useRemoteConfig } from '../remote-config/useRemoteConfig';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { canUseFeature, isProEnabled, type Feature } from './entitlements';

export function useEntitlements() {
  const { config } = useRemoteConfig();
  const { data: userProfile } = useGetCallerUserProfile();

  return {
    canUse: (feature: Feature) => canUseFeature(feature, userProfile || null, config),
    isProEnabled: isProEnabled(config),
    isPro: userProfile?.entitlement === 'pro',
  };
}

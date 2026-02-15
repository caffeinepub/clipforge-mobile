import { useQuery } from '@tanstack/react-query';
import { loadRemoteConfig, fetchRemoteConfig, getCachedConfigVersion, setCachedConfigVersion, getConfigVersionString } from './remoteConfigClient';
import type { RemoteConfig } from './types';
import { useEffect, useState } from 'react';

export function useRemoteConfig() {
  const [hasMajorUpdate, setHasMajorUpdate] = useState(false);

  const query = useQuery<RemoteConfig>({
    queryKey: ['remoteConfig'],
    queryFn: async () => {
      const cached = await loadRemoteConfig();
      
      try {
        const fresh = await fetchRemoteConfig();
        const cachedVersion = getCachedConfigVersion();
        const freshVersion = getConfigVersionString(fresh);

        if (cachedVersion && cachedVersion !== freshVersion) {
          const [cachedMajor] = cachedVersion.split('.').map(Number);
          const [freshMajor] = freshVersion.split('.').map(Number);

          if (freshMajor > cachedMajor) {
            setHasMajorUpdate(true);
          }
        }

        setCachedConfigVersion(freshVersion);
        return fresh;
      } catch (error) {
        return cached;
      }
    },
    staleTime: 5 * 60 * 1000,
    refetchInterval: 30 * 60 * 1000,
  });

  return {
    config: query.data,
    isLoading: query.isLoading,
    hasMajorUpdate,
    dismissUpdate: () => setHasMajorUpdate(false),
  };
}

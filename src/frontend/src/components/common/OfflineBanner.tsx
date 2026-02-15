import { WifiOff } from 'lucide-react';
import { useOfflineStatus } from '../../hooks/useOfflineStatus';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function OfflineBanner() {
  const { isOffline } = useOfflineStatus();

  if (!isOffline) return null;

  return (
    <Alert className="rounded-none border-x-0 border-t-0 bg-amber-500/10 border-amber-500/20">
      <WifiOff className="h-4 w-4 text-amber-600 dark:text-amber-400" />
      <AlertDescription className="text-amber-900 dark:text-amber-100">
        You're offline. Some features may be limited.
      </AlertDescription>
    </Alert>
  );
}

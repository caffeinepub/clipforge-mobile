import { AlertCircle } from 'lucide-react';
import { useRemoteConfig } from '../../remote-config/useRemoteConfig';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function MajorUpdatePrompt() {
  const { hasMajorUpdate, dismissUpdate } = useRemoteConfig();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <AlertDialog open={hasMajorUpdate} onOpenChange={dismissUpdate}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            New Update Available
          </AlertDialogTitle>
          <AlertDialogDescription>
            A major update is available for ClipForge. Refresh to get the latest features and improvements.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleRefresh}>
            Refresh Now
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

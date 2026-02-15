import { Crown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ProBadge() {
  return (
    <Badge variant="secondary" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
      <Crown className="h-3 w-3 mr-1" />
      Pro
    </Badge>
  );
}

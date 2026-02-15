import { useState } from 'react';
import { ArrowLeft, Play, Pause, Type, Sticker, Scissors, Gauge, Palette, Sparkles, Music, Download } from 'lucide-react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEntitlements } from '../entitlements/useEntitlements';
import UpsellPrompt from '../components/common/UpsellPrompt';

export default function VideoEditorScreen() {
  const navigate = useNavigate();
  const { projectId } = useParams({ from: '/video-editor/$projectId' });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [exportOpen, setExportOpen] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [resolution, setResolution] = useState('1080p');
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState('');
  const { canUse, isProEnabled } = useEntitlements();

  const handleToolClick = (tool: string, requiresPro: boolean = false) => {
    if (requiresPro && isProEnabled && !canUse(tool as any)) {
      setSelectedFeature(tool);
      setUpsellOpen(true);
      return;
    }
  };

  const handleExport = () => {
    setExportProgress(0);
    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <>
      <div className="h-full flex flex-col bg-background">
        <header className="border-b border-border bg-card/95 backdrop-blur">
          <div className="flex items-center justify-between p-3">
            <Button variant="ghost" size="icon" onClick={() => navigate({ to: '/projects' })}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-sm font-semibold truncate flex-1 mx-4">Video Project</h1>
            <Button size="sm" onClick={() => setExportOpen(true)}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </header>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 bg-black/90 flex items-center justify-center p-4">
            <div className="aspect-video w-full max-w-4xl bg-black/50 rounded-lg border border-white/10 flex items-center justify-center">
              <Play className="h-16 w-16 text-white/30" />
            </div>
          </div>

          <div className="border-t border-border bg-card p-3 space-y-3">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <div className="flex-1">
                <Slider 
                  value={[currentTime]} 
                  max={100} 
                  step={1}
                  onValueChange={(v) => setCurrentTime(v[0])}
                  className="cursor-pointer"
                />
              </div>
              <span className="text-xs text-muted-foreground tabular-nums">
                {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}
              </span>
            </div>

            <div className="bg-muted/30 rounded-lg p-3 min-h-[80px] border border-border">
              <div className="text-xs text-muted-foreground text-center">Timeline</div>
            </div>
          </div>

          <div className="border-t border-border bg-card">
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="w-full grid grid-cols-7 rounded-none h-auto">
                <TabsTrigger value="text" className="flex-col gap-1 py-2">
                  <Type className="h-4 w-4" />
                  <span className="text-xs">Text</span>
                </TabsTrigger>
                <TabsTrigger value="sticker" className="flex-col gap-1 py-2">
                  <Sticker className="h-4 w-4" />
                  <span className="text-xs">Sticker</span>
                </TabsTrigger>
                <TabsTrigger value="trim" className="flex-col gap-1 py-2">
                  <Scissors className="h-4 w-4" />
                  <span className="text-xs">Trim</span>
                </TabsTrigger>
                <TabsTrigger value="speed" className="flex-col gap-1 py-2">
                  <Gauge className="h-4 w-4" />
                  <span className="text-xs">Speed</span>
                </TabsTrigger>
                <TabsTrigger value="filter" className="flex-col gap-1 py-2">
                  <Palette className="h-4 w-4" />
                  <span className="text-xs">Filter</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="transition" 
                  className="flex-col gap-1 py-2"
                  onClick={() => handleToolClick('Advanced transitions', true)}
                >
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs">Trans</span>
                </TabsTrigger>
                <TabsTrigger value="music" className="flex-col gap-1 py-2">
                  <Music className="h-4 w-4" />
                  <span className="text-xs">Music</span>
                </TabsTrigger>
              </TabsList>

              <div className="p-4 max-h-48 overflow-y-auto">
                <TabsContent value="text" className="mt-0">
                  <Button className="w-full">Add Text Layer</Button>
                </TabsContent>
                <TabsContent value="sticker" className="mt-0">
                  <Button className="w-full">Add Sticker</Button>
                </TabsContent>
                <TabsContent value="trim" className="mt-0">
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">Split Clip</Button>
                    <Button variant="outline" className="w-full">Trim Clip</Button>
                  </div>
                </TabsContent>
                <TabsContent value="speed" className="mt-0">
                  <div className="space-y-2">
                    <label className="text-sm">Playback Speed</label>
                    <Slider defaultValue={[100]} min={25} max={400} step={25} />
                  </div>
                </TabsContent>
                <TabsContent value="filter" className="mt-0">
                  <div className="grid grid-cols-3 gap-2">
                    {['None', 'Warm', 'Cool', 'B&W', 'Vintage', 'Vivid'].map((filter) => (
                      <Button key={filter} variant="outline" size="sm">{filter}</Button>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="transition" className="mt-0">
                  <div className="grid grid-cols-3 gap-2">
                    {['Fade', 'Slide', 'Zoom'].map((trans) => (
                      <Button key={trans} variant="outline" size="sm">{trans}</Button>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="music" className="mt-0">
                  <Button className="w-full">Add Music Track</Button>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>

      <Dialog open={exportOpen} onOpenChange={setExportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Video</DialogTitle>
            <DialogDescription>
              Choose your export settings
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Resolution</label>
              <Select value={resolution} onValueChange={setResolution}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="720p">720p (HD)</SelectItem>
                  <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {exportProgress > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Exporting...</span>
                  <span>{exportProgress}%</span>
                </div>
                <Progress value={exportProgress} />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setExportOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleExport} disabled={exportProgress > 0 && exportProgress < 100}>
              {exportProgress === 100 ? 'Done' : 'Export'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <UpsellPrompt 
        open={upsellOpen} 
        onOpenChange={setUpsellOpen}
        feature={selectedFeature}
      />
    </>
  );
}

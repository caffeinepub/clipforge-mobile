import { useState } from 'react';
import { ArrowLeft, Crop, Palette, Type, Sticker, CircleDot, Eraser, Download } from 'lucide-react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function PhotoEditorScreen() {
  const navigate = useNavigate();
  const { projectId } = useParams({ from: '/photo-editor/$projectId' });
  const [exportOpen, setExportOpen] = useState(false);
  const [format, setFormat] = useState('jpg');
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);

  return (
    <>
      <div className="h-full flex flex-col bg-background">
        <header className="border-b border-border bg-card/95 backdrop-blur">
          <div className="flex items-center justify-between p-3">
            <Button variant="ghost" size="icon" onClick={() => navigate({ to: '/projects' })}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-sm font-semibold truncate flex-1 mx-4">Photo Project</h1>
            <Button size="sm" onClick={() => setExportOpen(true)}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </header>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 bg-black/90 flex items-center justify-center p-4">
            <div className="aspect-square w-full max-w-2xl bg-black/50 rounded-lg border border-white/10 flex items-center justify-center">
              <Palette className="h-16 w-16 text-white/30" />
            </div>
          </div>

          <div className="border-t border-border bg-card">
            <Tabs defaultValue="crop" className="w-full">
              <TabsList className="w-full grid grid-cols-6 rounded-none h-auto">
                <TabsTrigger value="crop" className="flex-col gap-1 py-2">
                  <Crop className="h-4 w-4" />
                  <span className="text-xs">Crop</span>
                </TabsTrigger>
                <TabsTrigger value="adjust" className="flex-col gap-1 py-2">
                  <Palette className="h-4 w-4" />
                  <span className="text-xs">Adjust</span>
                </TabsTrigger>
                <TabsTrigger value="filter" className="flex-col gap-1 py-2">
                  <Palette className="h-4 w-4" />
                  <span className="text-xs">Filter</span>
                </TabsTrigger>
                <TabsTrigger value="text" className="flex-col gap-1 py-2">
                  <Type className="h-4 w-4" />
                  <span className="text-xs">Text</span>
                </TabsTrigger>
                <TabsTrigger value="blur" className="flex-col gap-1 py-2">
                  <CircleDot className="h-4 w-4" />
                  <span className="text-xs">Blur</span>
                </TabsTrigger>
                <TabsTrigger value="remove" className="flex-col gap-1 py-2">
                  <Eraser className="h-4 w-4" />
                  <span className="text-xs">Remove</span>
                </TabsTrigger>
              </TabsList>

              <div className="p-4 max-h-64 overflow-y-auto">
                <TabsContent value="crop" className="mt-0 space-y-2">
                  <Button variant="outline" className="w-full">Free Crop</Button>
                  <div className="grid grid-cols-3 gap-2">
                    {['1:1', '4:3', '16:9'].map((ratio) => (
                      <Button key={ratio} variant="outline" size="sm">{ratio}</Button>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="adjust" className="mt-0 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Brightness</span>
                      <span>{brightness}</span>
                    </div>
                    <Slider 
                      value={[brightness]} 
                      min={-100} 
                      max={100} 
                      step={1}
                      onValueChange={(v) => setBrightness(v[0])}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Contrast</span>
                      <span>{contrast}</span>
                    </div>
                    <Slider 
                      value={[contrast]} 
                      min={-100} 
                      max={100} 
                      step={1}
                      onValueChange={(v) => setContrast(v[0])}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Saturation</span>
                      <span>{saturation}</span>
                    </div>
                    <Slider 
                      value={[saturation]} 
                      min={-100} 
                      max={100} 
                      step={1}
                      onValueChange={(v) => setSaturation(v[0])}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="filter" className="mt-0">
                  <div className="grid grid-cols-3 gap-2">
                    {['None', 'Warm', 'Cool', 'B&W', 'Vintage', 'Vivid', 'Soft', 'Sharp'].map((filter) => (
                      <Button key={filter} variant="outline" size="sm">{filter}</Button>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="text" className="mt-0">
                  <Button className="w-full">Add Text</Button>
                </TabsContent>

                <TabsContent value="blur" className="mt-0 space-y-2">
                  <Button variant="outline" className="w-full">Background Blur</Button>
                  <div className="space-y-2">
                    <label className="text-sm">Blur Intensity</label>
                    <Slider defaultValue={[50]} min={0} max={100} step={1} />
                  </div>
                </TabsContent>

                <TabsContent value="remove" className="mt-0">
                  <Button className="w-full">Remove Background</Button>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    AI-powered background removal
                  </p>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>

      <Dialog open={exportOpen} onOpenChange={setExportOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Photo</DialogTitle>
            <DialogDescription>
              Choose your export format
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Format</label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jpg">JPG</SelectItem>
                  <SelectItem value="png">PNG</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setExportOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setExportOpen(false)}>
              Export
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

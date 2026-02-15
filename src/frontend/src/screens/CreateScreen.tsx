import { Video, Image, Sparkles } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { createBlankVideoProject, createBlankPhotoProject } from '../features/projects/projectInstantiation';

export default function CreateScreen() {
  const navigate = useNavigate();

  const handleNewVideo = async () => {
    const projectId = await createBlankVideoProject();
    navigate({ to: `/video-editor/${projectId}` });
  };

  const handleNewPhoto = async () => {
    const projectId = await createBlankPhotoProject();
    navigate({ to: `/photo-editor/${projectId}` });
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-screen-xl mx-auto p-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Create New</h1>
          <p className="text-muted-foreground">
            Choose what you want to create
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer" onClick={handleNewVideo}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10">
                  <Video className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle>Video Project</CardTitle>
                  <CardDescription>Create from scratch</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Full-featured timeline editor with multi-layer support, transitions, effects, and more.
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Multi-track timeline</li>
                <li>• Text & sticker overlays</li>
                <li>• Transitions & filters</li>
                <li>• Export up to 1080p</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer" onClick={handleNewPhoto}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10">
                  <Image className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle>Photo Project</CardTitle>
                  <CardDescription>Edit an image</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Professional photo editing with filters, adjustments, text, and background effects.
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Crop & resize</li>
                <li>• Filters & adjustments</li>
                <li>• Text & stickers</li>
                <li>• Background effects</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Start with a Template
            </CardTitle>
            <CardDescription>
              Save time with professionally designed templates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              onClick={() => navigate({ to: '/templates' })}
              className="w-full"
            >
              Browse Templates
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

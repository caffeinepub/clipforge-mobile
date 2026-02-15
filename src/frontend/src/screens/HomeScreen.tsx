import { Video, Image, Sparkles, Zap } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createBlankVideoProject, createBlankPhotoProject } from '../features/projects/projectInstantiation';

export default function HomeScreen() {
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
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20">
          <div className="absolute inset-0 bg-[url('/assets/generated/clipforge-splash.dim_1242x2688.png')] bg-cover bg-center opacity-10" />
          <div className="relative p-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Welcome to ClipForge
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Create Amazing Content
            </h1>
            <p className="text-muted-foreground max-w-lg">
              Professional video and photo editing tools, right in your browser. No watermarks, fully offline-capable.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="border-2 hover:border-primary/50 transition-colors cursor-pointer" onClick={handleNewVideo}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>New Video</CardTitle>
                  <CardDescription>Start editing a video</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Timeline editor with multi-layer support, transitions, and effects
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors cursor-pointer" onClick={handleNewPhoto}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Image className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>New Photo</CardTitle>
                  <CardDescription>Edit a photo</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Filters, adjustments, text overlays, and background effects
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate({ to: '/templates' })}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Browse Templates
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate({ to: '/projects' })}
            >
              <Video className="h-4 w-4 mr-2" />
              My Projects
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

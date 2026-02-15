import { useState } from 'react';
import { Search, MoreVertical, Trash2, Copy, Video, Image } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useProjects, useDeleteProject, useDuplicateProject } from '../features/projects/useProjects';
import { format } from 'date-fns';

export default function ProjectsScreen() {
  const navigate = useNavigate();
  const { data: projects = [], isLoading } = useProjects();
  const deleteProject = useDeleteProject();
  const duplicateProject = useDuplicateProject();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpen = (project: any) => {
    if (project.type === 'video') {
      navigate({ to: `/video-editor/${project.id}` });
    } else {
      navigate({ to: `/photo-editor/${project.id}` });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject.mutateAsync(id);
    }
  };

  const handleDuplicate = async (id: string) => {
    await duplicateProject.mutateAsync(id);
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
          <p className="text-sm text-muted-foreground">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <img 
            src="/assets/generated/clipforge-empty-projects.dim_1200x800.png" 
            alt="No projects" 
            className="w-full max-w-xs mx-auto opacity-50"
          />
          <h3 className="text-lg font-semibold">No Projects Yet</h3>
          <p className="text-sm text-muted-foreground">
            Create your first video or photo project to get started.
          </p>
          <Button onClick={() => navigate({ to: '/create' })}>
            Create Project
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-screen-xl mx-auto p-4 space-y-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">My Projects</h1>
          <p className="text-muted-foreground">
            {projects.length} {projects.length === 1 ? 'project' : 'projects'}
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:border-primary/50 transition-colors">
              <div 
                className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center cursor-pointer"
                onClick={() => handleOpen(project)}
              >
                {project.type === 'video' ? (
                  <Video className="h-12 w-12 text-primary/40" />
                ) : (
                  <Image className="h-12 w-12 text-primary/40" />
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{project.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {format(project.modifiedAt, 'MMM d, yyyy')}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleDuplicate(project.id)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDelete(project.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

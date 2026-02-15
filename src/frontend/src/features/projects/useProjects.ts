import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllProjects, deleteProject, duplicateProject, searchProjects } from '../../storage/projectsStore';
import type { ProjectMetadata } from '../../storage/models';

export function useProjects() {
  return useQuery<ProjectMetadata[]>({
    queryKey: ['projects'],
    queryFn: getAllProjects,
  });
}

export function useSearchProjects(query: string) {
  return useQuery<ProjectMetadata[]>({
    queryKey: ['projects', 'search', query],
    queryFn: () => searchProjects(query),
    enabled: query.length > 0,
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

export function useDuplicateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: duplicateProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

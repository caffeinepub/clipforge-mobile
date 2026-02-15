import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { TemplateMetadata, UserProfile, Entitlement, TemplateType } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetAllTemplates() {
  const { actor, isFetching } = useActor();

  return useQuery<TemplateMetadata[]>({
    queryKey: ['templates'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTemplates();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTemplatesByType(templateType: TemplateType) {
  const { actor, isFetching } = useActor();

  return useQuery<TemplateMetadata[]>({
    queryKey: ['templates', templateType],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTemplatesByType(templateType);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTemplate(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<TemplateMetadata | null>({
    queryKey: ['template', id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getTemplate(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

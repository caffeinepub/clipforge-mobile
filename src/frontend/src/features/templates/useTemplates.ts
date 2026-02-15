import { useQuery } from '@tanstack/react-query';
import { useGetAllTemplates } from '../../hooks/useQueries';
import { mergeTemplates } from './templatesApi';
import { isTemplateCached } from '../../storage/templatesCache';
import type { TemplateMetadata } from '../../backend';

export function useTemplatesList() {
  const { data: backendTemplates = [], isLoading } = useGetAllTemplates();

  const query = useQuery<TemplateMetadata[]>({
    queryKey: ['mergedTemplates', backendTemplates],
    queryFn: () => mergeTemplates(backendTemplates),
    enabled: !isLoading,
  });

  return {
    templates: query.data || [],
    isLoading: isLoading || query.isLoading,
  };
}

export function useTemplateCacheStatus(templateId: string) {
  return useQuery<boolean>({
    queryKey: ['templateCached', templateId],
    queryFn: () => isTemplateCached(templateId),
  });
}

import { PRELOADED_TEMPLATES } from '../../templates/preloadedCatalog';
import type { TemplateMetadata } from '../../backend';
import { getCachedTemplate } from '../../storage/templatesCache';

export async function mergeTemplates(backendTemplates: TemplateMetadata[]): Promise<TemplateMetadata[]> {
  const merged = new Map<string, TemplateMetadata>();

  for (const preloaded of PRELOADED_TEMPLATES) {
    merged.set(preloaded.id, {
      id: preloaded.id,
      name: preloaded.name,
      description: preloaded.description,
      templateType: preloaded.templateType,
      entitlement: preloaded.entitlement,
      createdAt: BigInt(0),
      modifiedAt: BigInt(0),
    });
  }

  for (const backend of backendTemplates) {
    merged.set(backend.id, backend);
  }

  return Array.from(merged.values());
}

export async function getTemplateWithCache(id: string): Promise<any> {
  const cached = await getCachedTemplate(id);
  return cached?.payload || null;
}

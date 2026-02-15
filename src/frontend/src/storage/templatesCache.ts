import { getItem, setItem, getAllItems } from './indexedDb';
import type { CachedTemplate } from './models';

export async function getCachedTemplate(id: string): Promise<CachedTemplate | null> {
  return getItem<CachedTemplate>('templates', id);
}

export async function cacheTemplate(template: CachedTemplate): Promise<void> {
  template.cachedAt = Date.now();
  await setItem('templates', template);
}

export async function getAllCachedTemplates(): Promise<CachedTemplate[]> {
  return getAllItems<CachedTemplate>('templates');
}

export async function isTemplateCached(id: string): Promise<boolean> {
  const cached = await getCachedTemplate(id);
  return cached !== null;
}

import { getAllItems, getItem, setItem, deleteItem } from './indexedDb';
import type { ProjectMetadata, VideoProjectState, PhotoProjectState } from './models';

export async function getAllProjects(): Promise<ProjectMetadata[]> {
  const projects = await getAllItems<ProjectMetadata>('projects');
  return projects.sort((a, b) => b.modifiedAt - a.modifiedAt);
}

export async function getProject(id: string): Promise<ProjectMetadata | null> {
  return getItem<ProjectMetadata>('projects', id);
}

export async function saveProject(project: ProjectMetadata): Promise<void> {
  project.modifiedAt = Date.now();
  await setItem('projects', project);
}

export async function deleteProject(id: string): Promise<void> {
  await deleteItem('projects', id);
}

export async function duplicateProject(id: string): Promise<ProjectMetadata> {
  const original = await getProject(id);
  if (!original) throw new Error('Project not found');

  const duplicate: ProjectMetadata = {
    ...original,
    id: `${id}-copy-${Date.now()}`,
    name: `${original.name} (Copy)`,
    createdAt: Date.now(),
    modifiedAt: Date.now(),
  };

  await saveProject(duplicate);
  return duplicate;
}

export async function searchProjects(query: string): Promise<ProjectMetadata[]> {
  const projects = await getAllProjects();
  const lowerQuery = query.toLowerCase();
  return projects.filter((p) => p.name.toLowerCase().includes(lowerQuery));
}

import type { ProjectMetadata, VideoProjectState, PhotoProjectState } from '../../storage/models';
import { saveProject } from '../../storage/projectsStore';
import { cacheTemplate } from '../../storage/templatesCache';

export async function instantiateVideoTemplate(templateId: string, templateName: string): Promise<string> {
  const projectId = `video-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const project: ProjectMetadata = {
    id: projectId,
    name: `${templateName} Project`,
    type: 'video',
    createdAt: Date.now(),
    modifiedAt: Date.now(),
    templateId,
  };

  await saveProject(project);
  return projectId;
}

export async function instantiatePhotoTemplate(templateId: string, templateName: string): Promise<string> {
  const projectId = `photo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const project: ProjectMetadata = {
    id: projectId,
    name: `${templateName} Project`,
    type: 'photo',
    createdAt: Date.now(),
    modifiedAt: Date.now(),
    templateId,
  };

  await saveProject(project);
  return projectId;
}

export async function createBlankVideoProject(): Promise<string> {
  const projectId = `video-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const project: ProjectMetadata = {
    id: projectId,
    name: 'New Video Project',
    type: 'video',
    createdAt: Date.now(),
    modifiedAt: Date.now(),
  };

  await saveProject(project);
  return projectId;
}

export async function createBlankPhotoProject(): Promise<string> {
  const projectId = `photo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const project: ProjectMetadata = {
    id: projectId,
    name: 'New Photo Project',
    type: 'photo',
    createdAt: Date.now(),
    modifiedAt: Date.now(),
  };

  await saveProject(project);
  return projectId;
}

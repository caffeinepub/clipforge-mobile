export type ProjectType = 'video' | 'photo';

export interface ProjectMetadata {
  id: string;
  name: string;
  type: ProjectType;
  thumbnailUrl?: string;
  createdAt: number;
  modifiedAt: number;
  templateId?: string;
}

export interface VideoProjectState {
  id: string;
  tracks: VideoTrack[];
  duration: number;
  resolution: { width: number; height: number };
}

export interface VideoTrack {
  id: string;
  type: 'video' | 'audio' | 'text' | 'sticker';
  clips: VideoClip[];
}

export interface VideoClip {
  id: string;
  startTime: number;
  endTime: number;
  sourceUrl?: string;
  content?: string;
  speed?: number;
  filters?: string[];
  transition?: string;
}

export interface PhotoProjectState {
  id: string;
  sourceImageUrl: string;
  crop?: { x: number; y: number; width: number; height: number };
  adjustments: {
    brightness: number;
    contrast: number;
    saturation: number;
  };
  filters: string[];
  overlays: PhotoOverlay[];
}

export interface PhotoOverlay {
  id: string;
  type: 'text' | 'sticker';
  content: string;
  position: { x: number; y: number };
  scale: number;
  rotation: number;
}

export interface CachedTemplate {
  id: string;
  metadata: any;
  payload: any;
  cachedAt: number;
}

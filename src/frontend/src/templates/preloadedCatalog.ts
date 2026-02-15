import { TemplateType, Entitlement } from '../backend';

export interface PreloadedTemplate {
  id: string;
  name: string;
  description: string;
  templateType: TemplateType;
  entitlement: Entitlement;
  thumbnailUrl?: string;
}

export const PRELOADED_TEMPLATES: PreloadedTemplate[] = [
  {
    id: 'tiktok-intro',
    name: 'TikTok Intro',
    description: 'Eye-catching intro for TikTok videos',
    templateType: TemplateType.video,
    entitlement: Entitlement.free,
  },
  {
    id: 'youtube-intro',
    name: 'YouTube Intro',
    description: 'Professional intro for YouTube content',
    templateType: TemplateType.video,
    entitlement: Entitlement.free,
  },
  {
    id: 'slideshow',
    name: 'Slideshow',
    description: 'Beautiful photo slideshow with transitions',
    templateType: TemplateType.video,
    entitlement: Entitlement.free,
  },
  {
    id: 'birthday-video',
    name: 'Birthday Video',
    description: 'Celebrate with a festive birthday video',
    templateType: TemplateType.video,
    entitlement: Entitlement.free,
  },
  {
    id: 'business-promo',
    name: 'Business Promo',
    description: 'Professional business promotional video',
    templateType: TemplateType.video,
    entitlement: Entitlement.pro,
  },
  {
    id: 'instagram-post',
    name: 'Instagram Post',
    description: 'Perfect square format for Instagram',
    templateType: TemplateType.photo,
    entitlement: Entitlement.free,
  },
  {
    id: 'youtube-thumbnail',
    name: 'YouTube Thumbnail',
    description: 'Attention-grabbing YouTube thumbnail',
    templateType: TemplateType.photo,
    entitlement: Entitlement.free,
  },
  {
    id: 'poster',
    name: 'Poster',
    description: 'Event or promotional poster design',
    templateType: TemplateType.photo,
    entitlement: Entitlement.free,
  },
  {
    id: 'resume-cover',
    name: 'Resume Cover',
    description: 'Professional resume cover page',
    templateType: TemplateType.photo,
    entitlement: Entitlement.free,
  },
  {
    id: 'flyer',
    name: 'Flyer',
    description: 'Marketing flyer template',
    templateType: TemplateType.photo,
    entitlement: Entitlement.pro,
  },
];

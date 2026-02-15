export interface RemoteConfig {
  version: {
    major: number;
    minor: number;
    patch: number;
  };
  features: {
    videoEditor: boolean;
    photoEditor: boolean;
    templates: boolean;
    cloudSync: boolean;
    monetization: boolean;
  };
  tools: {
    video: {
      transitions: boolean;
      advancedColorGrading: boolean;
      textAnimations: boolean;
      speedControl: boolean;
      filters: boolean;
    };
    photo: {
      filters: boolean;
      backgroundRemoval: boolean;
      backgroundBlur: boolean;
      adjustments: boolean;
    };
  };
  templates: {
    enabled: string[];
    disabled: string[];
  };
}

export const DEFAULT_CONFIG: RemoteConfig = {
  version: { major: 1, minor: 0, patch: 0 },
  features: {
    videoEditor: true,
    photoEditor: true,
    templates: true,
    cloudSync: false,
    monetization: false,
  },
  tools: {
    video: {
      transitions: true,
      advancedColorGrading: false,
      textAnimations: true,
      speedControl: true,
      filters: true,
    },
    photo: {
      filters: true,
      backgroundRemoval: true,
      backgroundBlur: true,
      adjustments: true,
    },
  },
  templates: {
    enabled: [],
    disabled: [],
  },
};

import type { ThemeConfig, ThemeId } from '../types';

export const themes: Record<ThemeId, ThemeConfig> = {
  wiskunde: {
    id: 'wiskunde',
    label: 'Wiskunde',
    color: 'bg-blue-600',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-200',
  },
  nederlands: {
    id: 'nederlands',
    label: 'Nederlands',
    color: 'bg-emerald-600',
    lightColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    borderColor: 'border-emerald-200',
  },
  geschiedenis: {
    id: 'geschiedenis',
    label: 'Geschiedenis',
    color: 'bg-orange-500',
    lightColor: 'bg-orange-50',
    textColor: 'text-orange-500',
    borderColor: 'border-orange-200',
  },
};

export const themeList = Object.values(themes);

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from './translations';

// Strip function values — i18next only handles strings/objects
function sanitize(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(item => sanitize(item));
  if (typeof obj !== 'object' || obj === null) return obj;
  const result: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    if (typeof v === 'function') continue;
    result[k] = sanitize(v);
  }
  return result;
}

const savedLang = (localStorage.getItem('language') as 'ko' | 'en' | 'ja') || 'ko';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(i18n.use(initReactI18next) as any).init({
  resources: {
    ko: { translation: sanitize(translations.ko) },
    en: { translation: sanitize(translations.en) },
    ja: { translation: sanitize(translations.ja) },
  },
  lng: savedLang,
  fallbackLng: 'ko',
  interpolation: { escapeValue: false },
});

export default i18n;

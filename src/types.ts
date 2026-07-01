export type ULanguage = 'en' | 'he';
// Должен соответствовать languages[].id в app/config.yml
export type UViewport = 'desktop' | 'mobile' | 'tablet';
export type URole = 'guest' | 'registered';

export type UElementLocatorDef = {
  by: 'role' | 'text' | 'label' | 'placeholder' | 'css';
  role?: string;
  selector?: string;
};

export type TBlockLocatorDefs = Record<string, UElementLocatorDef>;
export type TRegionLocatorDefs = Record<string, TBlockLocatorDefs>;
export type TPageLocatorDefs = Record<string, TRegionLocatorDefs>;

export type TTranslationPair = { he: string; en: string };
export type TTranslationsBlock = Record<string, TTranslationPair>;
export type TTranslationsRegion = Record<string, TTranslationsBlock>;
export type TTranslationsPage = Record<string, TTranslationsRegion>;

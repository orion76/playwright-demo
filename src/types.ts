export type ULanguage = string;
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

export type TTranslationPair = Record<string, string>;
export type TTranslationsBlock = Record<string, TTranslationPair>;
export type TTranslationsRegion = Record<string, TTranslationsBlock>;
export type TTranslationsPage = Record<string, TTranslationsRegion>;

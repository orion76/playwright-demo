import { ULanguage } from '../types';

export interface IFormControl<TLocatorDefs extends Record<string, any>> {
  getLocators(): TLocatorDefs;
  setValue(value: any): Promise<void>;
  getValue(): Promise<any>;
  setLang(lang: ULanguage): void;
}

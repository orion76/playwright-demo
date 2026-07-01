import { DEFAULT_LANGUAGE } from '../config';
import { ULanguage } from './translation/types';

export interface ILangService {
  readonly current: ULanguage;
  setLang(lang: ULanguage): void;
}

export class LangService implements ILangService {
  private _lang: ULanguage = DEFAULT_LANGUAGE;

  constructor() {}

  get current(): ULanguage {
    return this._lang;
  }

  setLang(lang: ULanguage) {
    this._lang = lang;
  }
}

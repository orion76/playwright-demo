import { IFormField } from './form';
import { ILocator } from './locator';

export type UPageBlockTypes = 'card' | 'form' | 'menu';

export interface IPageBlock {
  type: UPageBlockTypes;
  name: string;
}

export interface IPageBlockCard extends IPageBlock {
  type: 'card';
  title: ILocator;
  content: ILocator;
}

export interface IPageBlockForm extends IPageBlock {
  type: 'form';
  title: ILocator;
  fields: IFormField[];
}

export interface IPageBlockMenu extends IPageBlock {
  type: 'menu';
  title: ILocator;
  fields: IFormField[];
}

export type UPageBlock = IPageBlockCard | IPageBlockForm | IPageBlockMenu;

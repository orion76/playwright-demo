import { UPageBlock } from './page-blocks';

export interface IPageRegion {
  name: string;
  blocks: UPageBlock[];
}

export interface IPageStructure {
  name: string;
  regions: IPageRegion[];
}

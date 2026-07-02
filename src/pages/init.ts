import { Page } from '@playwright/test';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import { createPage } from './page.factory';
import type { UViewport } from '../types';
import { getProjectRoot } from '../utils';

function resolveRouteFolder(route: string): string {
  const configPath = path.join(getProjectRoot(), 'app', 'config.yml');
  const config = yaml.load(fs.readFileSync(configPath, 'utf8')) as Record<string, unknown>;
  const folders = (config?.route_folders || {}) as Record<string, string>;
  return folders[route] || route;
}

export function initPage(page: Page, route: string, viewport: UViewport) {
  const appDir = path.join(getProjectRoot(), 'app', resolveRouteFolder(route));
  const locators = yaml.load(fs.readFileSync(path.join(appDir, 'locators.yml'), 'utf8')) as any;
  const locales = yaml.load(fs.readFileSync(path.join(appDir, 'locales.yaml'), 'utf8')) as any;
  return createPage(page, locators, locales, route, viewport);
}

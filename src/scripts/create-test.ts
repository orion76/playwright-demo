import fs from "fs";
import path from "path";
import { createPageClassTemplate, createTestTemplate, getUrlPath, pathToCamelCase, pathToKebabCase } from "./utils";

const BASE_PAGE_CLASS_PATH = "";


// Получаем роут из аргументов командной строки (например, /billing/invoice-settings)
const route = process.argv[2];

if (!route) {
  console.error("Ошибка: Укажите роут страницы! Пример: node scaffold.js /billing/invoice-settings");
  process.exit(1);
}

// Очищаем роут от лишних слэшей и делим на части
const lastPart = getUrlPath(route);

// 1. Вычисляем Имя Класса (kebab-case или snake-case -> CamelCase)
const camelCaseName = pathToCamelCase(lastPart);
const className = `${camelCaseName}Page`;

// 2. Вычисляем Имя Файла (kebab-case)
const kebabCaseName = pathToKebabCase(lastPart);

const pagePath = path.join("pages", `${kebabCaseName}.page.ts`);
const testPath = path.join("tests", `${kebabCaseName}.spec.ts`);

// Шаблон для класса страницы (Page Object)
const pageTemplate = createPageClassTemplate(route, BASE_PAGE_CLASS_PATH);

// Шаблон для файла теста
const testTemplate = createTestTemplate(camelCaseName, pagePath);

// Физически создаем папки и файлы на диске
fs.mkdirSync("pages", { recursive: true });
fs.mkdirSync("tests", { recursive: true });

fs.writeFileSync(pagePath, pageTemplate);
fs.writeFileSync(testPath, testTemplate);

console.log(`✅ Успешно сгенерированы заготовки для: ${route}`);
console.log(`📂 Page Object: ${pagePath} (Класс: ${className})`);
console.log(`📂 Тест:        ${testPath}`);

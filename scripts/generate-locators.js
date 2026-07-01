const fs = require("fs");
const yaml = require("js-yaml");
const path = require("path");

const route = process.argv[2];
if (!route) {
  console.error("Usage: node scripts/generate-locators.js <route>");
  process.exit(1);
}

const appDir = path.join(__dirname, "..", "app", route);
const structure = yaml.load(fs.readFileSync(path.join(appDir, "structure.yaml"), "utf8"));
const locales = yaml.load(fs.readFileSync(path.join(appDir, "locales.yaml"), "utf8"));

function locatorTypeToBy(type) {
  switch (type) {
    case "getByRole": return "role";
    case "getByText": return "text";
    case "getByLabel": return "label";
    case "getByPlaceholder": return "placeholder";
    default: return "role";
  }
}

function parseLocator(candidate) {
  const loc = candidate.locator;
  const by = locatorTypeToBy(loc.type);
  let role;
  if (by === "role") role = loc.value.split(",")[0].trim();
  return { by, role, heText: by === "role" ? (loc.value.match(/name:\s*"([^"]*)"/) || [])[1] : loc.value };
}

// Build result matching UElementLocatorDef: { by, role? }
const result = {};
for (const [regionName, blocks] of Object.entries(locales)) {
  const regionDef = structure.regions?.find((r) => r.name === regionName);
  const allCandidates = regionDef?.blocks?.flatMap((b) => {
    const items = (b.fields || []).map((f) => ({ ...f, _block: b }));
    if (b.title) items.push({ locator: b.title, _block: b });
    if (b.content) items.push({ locator: b.content, _block: b });
    return items;
  }) || [];

  for (const [blockName, elements] of Object.entries(blocks)) {
    for (const elementKey of Object.keys(elements)) {
      const trans = elements[elementKey];
      // Skip elements that are actual raw translation pairs {en, he}
      if (!trans || typeof trans !== "object" || !trans.he) continue;

      const candidate = allCandidates.find((c) => {
        const p = parseLocator(c);
        return p.heText === trans.he;
      });
      const parsed = candidate ? parseLocator(candidate) : { by: "role", role: elementKey === "logOut" ? "button" : "link" };

      if (!result[regionName]) result[regionName] = {};
      if (!result[regionName][blockName]) result[regionName][blockName] = {};
      const entry = { by: parsed.by };
      if (parsed.role) entry.role = parsed.role;
      result[regionName][blockName][elementKey] = entry;
    }
  }
}

fs.writeFileSync(path.join(appDir, "locators.yml"), yaml.dump(result, { lineWidth: 120 }));
console.log(`Generated app/${route}/locators.yml`);

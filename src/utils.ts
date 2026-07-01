import { existsSync } from "fs";
import { homedir } from "os";
import { resolve, dirname } from "path";

export function getProjectRoot(): string {
  const home = homedir();
  let dir = resolve(__dirname);
  while (dir !== dirname(dir)) {
    if (existsSync(resolve(dir, "package.json"))) return dir;
    const parent = dirname(dir);
    if (parent === dir || dir === home) break;
    dir = parent;
  }
  throw new Error("Could not find package.json — is this a Node.js project?");
}

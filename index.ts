import { readdir, stat } from "fs/promises";
import { join, relative } from "path";

const baseDirs = ["app", "src/app"];
let basePath = "";
let allPaths: string[] = []; // Array to hold all paths

async function findAppDir(baseDirs: string[]) {
  for (const dir of baseDirs) {
    try {
      await stat(dir);
      return dir;
    } catch (error) {
      continue;
    }
  }
  return "";
}

async function traverseDir(dir: string, baseUrl = "") {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith("_")) {
      continue; // Skip files starting with underscore
    }

    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await traverseDir(fullPath, join(baseUrl, entry.name));
    } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
      const urlPath = convertPathToUrl(fullPath);
      allPaths.push(urlPath);
    }
  }
}

function convertPathToUrl(filePath: string): string {
  let url = "/" + relative(basePath, filePath);

  // Remove segments within parentheses
  url = url.replace(/\/\([^)]*\)/g, "");

  // Replace index.tsx with /, and remove file extensions
  url = url.replace(/\/index\.tsx$/, "/");
  url = url.replace(/\.(tsx)$/, "");

  return url;
}

async function main() {
  basePath = await findAppDir(baseDirs);
  if (!basePath) {
    console.error("Base directory not found");
    return;
  }
  await traverseDir(basePath);
  allPaths.sort();
  allPaths.forEach((path) => console.log(path));
}

main();

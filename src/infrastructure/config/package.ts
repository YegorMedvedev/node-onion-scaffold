import {readFileSync} from "fs";
import {resolve} from "path";

export function getPackageJson() {
  const packageJsonPath = resolve(__dirname, `../../../package.json`);
  const rawData = readFileSync(packageJsonPath, "utf8");
  return JSON.parse(rawData);
}

import * as path from "node:path";
import * as fs from "node:fs/promises";
import { fileURLToPath } from "url";

export async function gatherEditorFiles(metaUrl: string) {
  const dirname = path.dirname(fileURLToPath(metaUrl));
  const files = (await fs.readdir(dirname)).filter(
    (file) => path.extname(file) !== ".astro",
  );

  const fileMap: Record<string, string> = (
    await Promise.all(
      files.map(async (file) => [
        file,
        await fs.readFile(path.resolve(dirname, file), "utf-8"),
      ]),
    )
  ).reduce((acc, [filename, contents]) => {
    acc[filename] = contents;
    return acc;
  }, {});

  return fileMap;
}

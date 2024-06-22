import * as path from "node:path";
import * as fs from "node:fs/promises";
import { fileURLToPath } from "url";

export async function gatherEditorFiles(metaUrl: string) {
  const dirname = path.dirname(fileURLToPath(metaUrl));
  const fileDir = path.resolve(dirname, "./files");
  const files = await fs.readdir(fileDir);

  const fileMap: Record<string, string> = (
    await Promise.all(
      files.map(async (file) => [
        file,
        await fs.readFile(path.resolve(fileDir, file), "utf-8"),
      ]),
    )
  ).reduce((acc, [filename, contents]) => {
    acc[filename] = contents;
    return acc;
  }, {});

  return fileMap;
}

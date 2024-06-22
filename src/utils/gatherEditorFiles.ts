import * as path from "node:path";
import * as fs from "node:fs/promises";
import * as url from "node:url";

export async function gatherEditorFiles(metaUrl: string) {
  const dirname = path.dirname(url.fileURLToPath(metaUrl));
  const files = (await fs.readdir(dirname)).filter(
    (file) => path.extname(file) !== ".astro",
  );

  return (
    await Promise.all(
      files.map(async (file) => [
        file,
        await fs.readFile(path.resolve(dirname, file), "utf-8"),
      ]),
    )
  ).reduce<Record<string, string>>((acc, [filename, contents]) => {
    acc[filename] = contents;
    return acc;
  }, {});
}

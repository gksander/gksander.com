import * as path from "node:path";
import * as fs from "node:fs/promises";

export async function gatherEditorFiles(postPathname: string) {
  const folder = path.resolve(
    process.cwd(),
    "src/content",
    postPathname.replace("/posts", "post"),
    "_fiddle",
  );
  const files = (await fs.readdir(folder)).filter(
    (file) => path.extname(file) !== ".astro",
  );

  return (
    await Promise.all(
      files.map(async (file) => [
        file,
        await fs.readFile(path.resolve(folder, file), "utf-8"),
      ]),
    )
  ).reduce<Record<string, string>>((acc, [filename, contents]) => {
    acc[filename] = contents;
    return acc;
  }, {});
}

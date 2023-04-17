import { copy, readdirSync } from "fs-extra";
import inquirer from "inquirer";
import { parseToml } from "../utils/parseToml";

export const rollbackCommand = async (args: string[]) => {
  const tomlPath = args?.[2] ?? "rollback.toml";
  const rollbackConfig = parseToml(tomlPath);
  const { saveDirPath } = rollbackConfig;

  /* saveDirPathにあるディレクトリ名とパスを取得する */
  const dirs = readdirSync(saveDirPath);
  const q = await inquirer.prompt([
    {
      message: "Select the folder name you want to revert",
      type: "list",
      name: "revert",
      choices: dirs,
    },
  ]);

  /* 選択されたディレクトリにあるものを……復活させるが……。 */
  /* 選択されたディレクトリにあるディレクトリのファイル名を読み取る。ディレクトリのみ */
  const revDirs = readdirSync(`${saveDirPath}/${q.revert}`);

  /* revDirsにあるのはsource1, source2など。それからrollbackConfigから探してきて、destを取得する */
  await revDirs
    .flatMap((revDir) => {
      const source = rollbackConfig.sources.find((s) => s.name === revDir);
      return source ?? [];
    })
    /* srcとdestを絶対パスに変換する */
    .map(({ dest, name }) => ({
      src: `${saveDirPath}/${q.revert}/${name}`,
      dest,
    }))
    /* srcからdestにコピーする */
    .forEach(({ src, dest }) => {
      copy(src, dest);
    });
};

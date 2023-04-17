import { copy } from "fs-extra";
import { parseToml } from "../utils/parseToml";
import { toYYYYMMDDHHmmssWrapper } from "../utils/toYYYYMMDDHHmmssWrapper";

export const saveCommand = (args: string[]) => {
  const tomlPath = args?.[2] ?? "rollback.toml";
  const rollbackConfig = parseToml(tomlPath);
  const now = toYYYYMMDDHHmmssWrapper(new Date());
  const { sources } = rollbackConfig;
  sources.forEach((source) => {
    copy(source.src, `${rollbackConfig.saveDirPath}/${now}/${source.name}`);
  });
};

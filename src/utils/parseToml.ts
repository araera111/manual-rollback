import { readFileSync } from "fs-extra";
import toml from "toml";
import { RollbackConfig, rollbackConfigSchema } from "../types/type";

export const parseToml = (tomlPath: string): RollbackConfig => {
  const tomlFile = readFileSync(tomlPath, "utf-8");
  return rollbackConfigSchema.parse(
    JSON.parse(JSON.stringify(toml.parse(tomlFile)))
  );
};

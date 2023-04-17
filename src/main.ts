import { program } from "commander";
import { rollbackCommand } from "./commands/rollbackCommand";
import { saveCommand } from "./commands/saveCommand";

program.version("1.0.0", "-v, --version", "output the current version");
program.name("manual-rollback");

program
  .command("save")
  .option("-t, --toml <path>", "path to rollback.toml")
  .description("save files")
  .action((args) => saveCommand(args));

program
  .command("rollback")
  .option("-t, --toml <path>", "path to rollback.toml")
  .description("rollback files")
  .action(async (args) => {
    rollbackCommand(args);
  });

program.parse(process.argv);

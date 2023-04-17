import { z } from "zod";

const sourceSchema = z.object({
  name: z.string(),
  src: z.string(),
  dest: z.string(),
});
export const rollbackConfigSchema = z.object({
  sources: sourceSchema.array(),
  saveDirPath: z.string(),
});
// type
export type RollbackConfig = z.infer<typeof rollbackConfigSchema>;

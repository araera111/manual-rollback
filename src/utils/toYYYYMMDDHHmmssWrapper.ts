import { format } from "date-fns";

/* YYYY-MM-DD_HH_mm_ss形式に変換するdate-fnsのwrapper */

export const toYYYYMMDDHHmmssWrapper = (date: Date) =>
  format(date, "yyyy-MM-dd_HH_mm_ss");

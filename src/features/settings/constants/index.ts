import { SettingType } from "../types/setting.types";

export const SETTING_TYPES: SettingType[] = [
  "STRING",
  "NUMBER",
  "BOOLEAN",
  "JSON",
];

export const SETTING_TYPE_LABELS: Record<SettingType, string> = {
  STRING: "Text",
  NUMBER: "Number",
  BOOLEAN: "Yes/No",
  JSON: "JSON Object",
};

export const SETTING_TYPE_ICONS: Record<SettingType, string> = {
  STRING: "Type",
  NUMBER: "Hash",
  BOOLEAN: "ToggleLeft",
  JSON: "Braces",
};

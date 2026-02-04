// sanity/schemaTypes/index.ts
import { siteSettingsType } from "./siteSettingsType";

export const schemaTypes = [siteSettingsType];

// Mantengo anche l'export `schema` così il tuo sanity.config.ts resta pulito
export const schema = {
  types: schemaTypes,
};

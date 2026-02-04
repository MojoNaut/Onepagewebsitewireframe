// sanity/schemaTypes/index.ts
import { siteSettingsType } from "./siteSettingsType";
import { 
  localizedString, 
  localizedText, 
  localizedStringArray 
} from "./objects/localizedString";

export const schemaTypes = [
  // Objects (devono essere prima dei document che li usano)
  localizedString,
  localizedText,
  localizedStringArray,
  // Documents
  siteSettingsType,
];

export const schema = {
  types: schemaTypes,
};
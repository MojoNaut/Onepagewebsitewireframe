// sanity/schemaTypes/index.ts
import { siteSettingsType } from "./siteSettingsType";
import { serviceType } from "./serviceType";
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
    serviceType,
];

export const schema = {
  types: schemaTypes,
};
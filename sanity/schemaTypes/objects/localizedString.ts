// sanity/schemaTypes/objects/localizedString.ts
import { defineType, defineField } from "sanity";

export const localizedString = defineType({
  name: "localizedString",
  title: "Localized String",
  type: "object",
  fields: [
    defineField({
      name: "it",
      title: "🇮🇹 Italiano",
      type: "string",
    }),
    defineField({
      name: "en",
      title: "🇬🇧 English",
      type: "string",
    }),
  ],
  options: {
    collapsible: false,
  },
});

export const localizedText = defineType({
  name: "localizedText",
  title: "Localized Text",
  type: "object",
  fields: [
    defineField({
      name: "it",
      title: "🇮🇹 Italiano",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "en",
      title: "🇬🇧 English",
      type: "text",
      rows: 3,
    }),
  ],
});

export const localizedStringArray = defineType({
  name: "localizedStringArray",
  title: "Localized String Array",
  type: "object",
  fields: [
    defineField({
      name: "it",
      title: "🇮🇹 Italiano",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "en",
      title: "🇬🇧 English",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
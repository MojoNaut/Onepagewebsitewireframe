// sanity/structure.ts
import { StructureBuilder } from "sanity/structure";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // Site Settings (singleton)
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),

      S.divider(),

      // Services (list)
      S.documentTypeListItem("service")
        .title("Services"),
           // FQA (list)
          S.documentTypeListItem("faq")
     .title("FAQ"),
    ]);
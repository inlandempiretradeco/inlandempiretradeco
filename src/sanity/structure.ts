import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Inland Empire Inventory")
    .items([
      S.listItem()
        .title("Watches")
        .child(
          S.documentList()
            .title("Watches")
            .filter('_type == "watch"')
            .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
        ),
      S.listItem()
        .title("Fragrance")
        .child(
          S.documentList()
            .title("Fragrance")
            .filter('_type == "fragrance"')
            .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
        ),
      S.listItem()
        .title("Gift Sets")
        .child(
          S.documentList()
            .title("Gift Sets")
            .filter('_type == "giftSet"')
            .defaultOrdering([{ field: "_createdAt", direction: "desc" }])
        ),
    ]);

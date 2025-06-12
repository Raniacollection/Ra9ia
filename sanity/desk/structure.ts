import { StructureBuilder } from "sanity/desk"
import React from "react"

export const myStructure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Products")
        .child(
          S.list()
            .title("Products")
            .items([
              S.listItem()
                .title("All Products")
                .child(
                  S.documentList()
                    .title("All Products")
                    .filter('_type == "product"')
                    .defaultOrdering([{ field: "name", direction: "asc" }])
                ),
              S.listItem()
                .title("Low Stock Products")
                .child(
                  S.documentList()
                    .title("Low Stock Products")
                    .filter('_type == "product" && inventoryManagement.totalStock <= inventoryManagement.lowStockThreshold && inventoryManagement.totalStock > 0')
                    .defaultOrdering([{ field: "inventoryManagement.totalStock", direction: "asc" }])
                ),
              S.listItem()
                .title("Out of Stock Products")
                .child(
                  S.documentList()
                    .title("Out of Stock Products")
                    .filter('_type == "product" && inventoryManagement.totalStock == 0')
                    .defaultOrdering([{ field: "name", direction: "asc" }])
                ),
            ])
        ),
      S.listItem()
        .title("Collections")
        .child(
          S.documentList()
            .title("Collections")
            .filter('_type == "collection"')
            .defaultOrdering([{ field: "name", direction: "asc" }])
        ),
      S.listItem()
        .title("Categories")
        .child(
          S.documentList()
            .title("Categories")
            .filter('_type == "category"')
            .defaultOrdering([{ field: "name", direction: "asc" }])
        ),
      S.listItem()
        .title("Pages")
        .child(
          S.documentList()
            .title("Pages")
            .filter('_type == "page"')
            .defaultOrdering([{ field: "title", direction: "asc" }])
        ),
      S.listItem()
        .title("Inventory Reports")
        .child(
          S.list()
            .title("Inventory Reports")
            .items([
              S.listItem()
                .title("Stock Overview")
                .child(
                  S.component()
                    .title("Stock Overview")
                    .component(() => {
                      return React.createElement("div", 
                        { style: { padding: "20px" } },
                        React.createElement("h2", null, "Inventory Management"),
                        React.createElement("p", null, "This is a placeholder for a future inventory dashboard component."),
                        React.createElement("p", null, "Here you'll be able to see sales trends, stock levels, and other inventory insights.")
                      )
                    })
                ),
            ])
        ),
      S.listItem()
        .title("Site Settings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),
    ]) 
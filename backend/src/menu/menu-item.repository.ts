import { Injectable } from "@nestjs/common";
import { DbService } from "src/db/db.service";

@Injectable()
export class MenuItemRepository {
    constructor(private readonly db: DbService) {}

    async getAllActiveSections() {
      const sections = await this.db.connection
      .selectFrom("sections")
      .selectAll()
      .orderBy("display_order asc")
      .where("sections.is_active", "=", 1)
      .execute()

      const menu_items = await this.db.connection
        .selectFrom("menu_items as MI")
        .innerJoin("section_items as SI", "MI.item_id", "SI.item_id")
        .select([
            "SI.section_id",
            "MI.item_id",
            "MI.name",
            "MI.display_text",
            "MI.description",
            "MI.image_link",
            "MI.base_price",
            "MI.display_order",
            "MI.is_active",
            "MI.is_available",
            "MI.is_featured"
        ])
        // Use SI or MI Here?
        // One of them will be redundant, or used in other ways I guess
        .orderBy("SI.display_order asc")
        .where("MI.is_active", "=", 1)
        .where("SI.is_active", "=", 1)
        .execute();

      sections.forEach((section) => {
        section["items"] = []
        menu_items.forEach((item) => {
          if (item.section_id == section.section_id) {
            delete item.section_id
            section["items"].push(item)
          } 
        })
      })
  
      return sections
    }

    // ... more methods for other operations
}
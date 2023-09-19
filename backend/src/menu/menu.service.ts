import { Injectable } from '@nestjs/common';
import { sql } from 'kysely';
import { DbService } from 'src/db/db.service';

@Injectable()
export class MenuService {
  constructor(private db: DbService) { }

  async getSections() {
    {/* 
    SELECT *
    FROM sections AS S, section_items as SI, menu_items as MI 
    WHERE S.is_active 
      AND S.section_id > 0 
      AND SI.item_id = MI.item_id 
      AND S.section_id = SI.section_id;
    */}

    {/* 
      Something like this would be ideal, but kysely is a bit hard to figure out at the moment, so I'll just sort the info on the backend 
      SELECT
        S.section_id,
        S.name AS section_name,
        S.display_name AS section_display_name,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'item_id', MI.item_id,
            'item_name', MI.name,
            'item_display_name', MI.display_name
          )
        ) AS items
      FROM
        sections AS S
      JOIN
        section_items AS SI ON S.section_id = SI.section_id
      JOIN
        menu_items AS MI ON SI.item_id = MI.item_id
      WHERE
        S.is_active AND
        SI.is_active AND 
        MI.is_active
      GROUP BY
        S.section_id;
    */}

    const sections = await this.db.connection
      .selectFrom("sections")
      .selectAll()
      .where("sections.is_active", "=", 1)
      .execute()

    // const section_items = await this.db.connection
    //   .selectFrom("section_items")
    //   .selectAll()
    //   .where("section_items.is_active", "=", 1)
    //   .execute()

    // const menu_items = await this.db.connection
    //   .selectFrom("menu_items")
    //   .selectAll()
    //   .where("menu_items.is_active", "=", 1)
    //   .execute()

    {/* 
      SELECT * 
      FROM 
      INNER JOIN 
    */}

    const menu_items = await this.db.connection
      .selectFrom([
        "menu_items as MI",
        "section_items as SI"
      ])
      .select([
        "SI.section_id",
        "MI.item_id",
        "MI.name",
        "MI.display_name",
        "MI.description",
        "MI.image_link",
        "MI.base_price",
        "MI.display_order",
        "MI.is_active",
        "MI.is_available",
        "MI.is_featured"
      ])
      .where("MI.is_active", "=", 1)
      .where("SI.is_active", "=", 1)
      .execute()

    console.log("Sections: ", sections)
    // console.log("Section Items: ", section_items)
    console.log("Menu Items: ", menu_items)

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
}

import { BadRequestException, Injectable } from '@nestjs/common';
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

    // FIX THIS 
    // Items not in section_items are going to the first section in the list, which is not whats supposed to happen
    const menu_items = await this.db.connection
      .selectFrom([
        "menu_items as MI",
        "section_items as SI"
      ])
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

  async getItem(id: number) {
    /* 
      This should return:
      - MenuItem basic information
      - Modifiers linked to this MenuItem
      - All Modifier information needed, such as modifier options and pricing related things
    */
    const menuItem = await this.db.connection
      .selectFrom("menu_items")
      .selectAll()
      .where("item_id", "=", id)
      .executeTakeFirst()

    if (!menuItem) {
      return new BadRequestException({
        error: "No item with given id found"
      })
    }

    /*
    insert into modifiers 
    (name, display_name, description, is_required, is_active, is_available, modifier_type) 
    values ("pizza_toppings", "Add Toppings", "Add toppings to your pizza. Toppings may be added on the left half, the right half, or the whole pizza. Prices may vary based on selection", false, true, true, "CHECKBOX");
    
    insert into modifiers 
    (name, display_name, description, is_required, is_active, is_available, modifier_type) 
    values ("pizza_size", "Choose a size", "Choose a size for your pizza. Prices may vary based on selection", true, true, true, "RADIO");

    insert into menu_items 
    (name, display_name, description, is_active, is_featured) 
    values ("pizza_cheese", "Cheese Pizza","Our take on the classic cheese pizza", true, true);

    insert into menu_items 
    (name, display_text, description, is_active, is_featured) 
    values ("pizza_specialty_shkodra", "Shkodra Special Pizza","Our own specialty pizza inspired by a distant country with a rich culture", true, true);

    insert into modifier_options
    (modifier_id, name, display_text, is_active, is_available)
    values (2, "pizza_topping_bacon", "Bacon", true, true),
    (2, "pizza_topping_broccoli", "Broccoli", true, true),
    (2, "pizza_topping_anchovies", "Anchovies", true, true),
    (1, "pizza_size_medium", "Medium 14\" \(16 Slices\)", true, true),
    (1, "pizza_size_small", "Small 10\" \(8 Slices\)", true, true),
    (1, "pizza_size_large", "Large 18\" \(20 Slices\)", true, true);

    insert into item_modifiers 
    (modifier_id, item_id, display_order, is_active, is_available) values
    (1, 2, 0, true, true),
    (2, 2, 1, true, true);
    */

    const modifiers = await this.db.connection
      .selectFrom([
        "item_modifiers as IM"
      ])
      .innerJoin("modifiers as M", "M.modifier_id", "IM.modifier_id")
      .innerJoin("menu_items as MI", "MI.item_id", "IM.item_id")
      .selectAll("M")
      // .select(({ fn }) => [
      //   fn.count<number>('MI.item_id').as('item_count'),
      // ])
      .where("MI.item_id", "=", id)
      .execute()

    const modifierOptions = await this.db.connection
    .selectFrom([
      "item_modifiers as IM"
    ])
    .innerJoin("modifiers as M", "M.modifier_id", "IM.modifier_id")
    .innerJoin("menu_items as MI", "MI.item_id", "IM.item_id")
    .innerJoin("modifier_options as MO", "MO.modifier_id", "M.modifier_id")
    .selectAll("MO")
    // .select(({ fn }) => [
    //   fn.count<number>('MI.item_id').as('item_count'),
    // ])
    .where("MI.item_id", "=", id)
    .execute()

    modifiers.forEach((modifier) => {
      modifier["modifier_options"] = []
      modifierOptions.forEach((option) => {
        if (option.modifier_id === modifier.modifier_id) {
          modifier["modifier_options"].push(option)
          console.log(`Modifier: ${modifier.display_text}, Option: ${option.display_text}`)
        }
      })
    })


    // const modifiers = await this.db.connection
    //   .selectFrom('item_modifiers as IM')
    //   .innerJoin('modifiers as M', 'M.modifier_id', 'IM.modifier_id')
    //   .innerJoin('modifier_options as MO', 'MO.modifier_id', 'M.modifier_id')
    //   .where('IM.item_id', '=', id)
    //   .selectAll()
    //   .execute();

    // const modifiers = await this.db.connection
    //   .selectFrom([
    //     "item_modifiers as IM",
    //     "modifiers as M",
    //     "modifier_options as MO"
    //   ])
    //   .where("IM.item_id", "=", id)
    //   .where("IM.modifier_id", "=", "M.modifier_id") 
    //   .selectAll()
    //   .execute()

  menuItem["modifiers"] = modifiers
  return JSON.stringify(menuItem)
  }
}

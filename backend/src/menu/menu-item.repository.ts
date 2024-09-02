import { BadRequestException, Injectable } from "@nestjs/common";
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
            "MI.display_price",
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

    async getMenuItemById(id: number) {
      const menuItem = await this.db.connection
        .selectFrom("menu_items")
        .selectAll()
        .where("item_id", "=", id)
        .where("is_active", "=", 1)
        .executeTakeFirst()
  
      if (!menuItem) {
        return new BadRequestException({
          error: "No item with given id found"
        })
      }

      const modifiers = await this.db.connection
        .selectFrom([
          "item_modifiers as IM"
        ])
        .innerJoin("modifiers as M", "M.modifier_id", "IM.modifier_id")
        .innerJoin("menu_items as MI", "MI.item_id", "IM.item_id")
        .selectAll("M")
        .where("MI.item_id", "=", id)
        .where("IM.is_active", "=", 1)
        .where("M.is_active", "=", 1)
        .orderBy("M.display_order asc")
        .execute()
      
      if (!modifiers) {
        return new BadRequestException({
          error: "No modifiers found for given item id"
        })
      }

      const modifierOptions = await this.db.connection
        .selectFrom([
          "item_modifiers as IM"
        ])
        .innerJoin("modifiers as M", "M.modifier_id", "IM.modifier_id")
        .innerJoin("menu_items as MI", "MI.item_id", "IM.item_id")
        .innerJoin("modifier_options as MO", "MO.modifier_id", "M.modifier_id")
        .selectAll("MO")
        .where("MI.item_id", "=", id)
        .execute()
      
      if (!modifierOptions) {
        return new BadRequestException({
          error: "No modifiers items found for given item id"
        })
      }

      // 
      // REVIEW THE CODE BELOW
      //

      const itemOptionPrice = await this.db.connection
      .selectFrom([
        "item_modifiers as IM"
      ])
      .innerJoin("modifiers as M", "M.modifier_id", "IM.modifier_id")
      .innerJoin("menu_items as MI", "MI.item_id", "IM.item_id")
      .innerJoin("modifier_options as MO", "MO.modifier_id", "M.modifier_id")
      .innerJoin(
        "item_option_prices as IOP",
        (join) => join
        .onRef('IOP.option_id', '=', 'MO.option_id')
        .on('IOP.item_id', '=', id)  
      )
      // "MO"
      .selectAll("IOP")
      // .select(({ fn }) => [
      //   fn.count<number>('MI.item_id').as('item_count'),
      // ])
      .where("MI.item_id", "=", id)
      .execute()
  
      // console.log(itemOptionPrice)
  
      const optionOptionPrices = await this.db.connection
      .selectFrom([
        "item_modifiers as IM"
      ])
      .innerJoin("modifiers as M", "M.modifier_id", "IM.modifier_id")
      .innerJoin("menu_items as MI", "MI.item_id", "IM.item_id")
      .innerJoin("modifier_options as MO", "MO.modifier_id", "M.modifier_id")
      .innerJoin("option_option_prices as OOP", "OOP.parent_option_id", "MO.option_id")
      .innerJoin("modifier_options as MO2", "MO2.option_id", "OOP.dependent_option_id")
      .innerJoin("modifiers as M2", "M2.modifier_id", "MO2.modifier_id")
      .select([
        "OOP.parent_option_id",
        "OOP.dependent_option_id",
        "M2.modifier_id",
        "OOP.price"
      ])
      // .select(({ fn }) => [
      //   fn.count<number>('MI.item_id').as('item_count'),
      // ])
      .where("MI.item_id", "=", id)
      .where("OOP.is_active", "=", 1)
      // .where("OOP.is_available", "=", 1)
      .execute()
  
      // console.log(await this.db.connection.selectFrom("option_option_prices").selectAll().execute())
  
      // console.log(optionOptionPrices)
  
      const newOOP = optionOptionPrices.reduce((newObj, currObj): any => {
        // console.log(newObj, " || " ,currObj)
  
        const {
          parent_option_id,
          modifier_id,
          dependent_option_id,
          price,
          ...rest
        } = currObj
  
        if (!newObj[parent_option_id]) {
          newObj[parent_option_id] = {};
        }
      
        if (!newObj[parent_option_id][modifier_id]) {
          newObj[parent_option_id][modifier_id] = {};
        }
  
        newObj[currObj.parent_option_id] = {
          ...newObj[currObj.parent_option_id],
          modifier_id: modifier_id,
          [dependent_option_id]: price
        }
        // console.log(newObj)
  
        return newObj
      }, {})
  
      // console.log(newOOP)
  
      modifiers.forEach((modifier) => {
        modifier["modifier_options"] = []
        modifierOptions.forEach((option) => {
          itemOptionPrice.map((price) => {
            if (price.option_id === option.option_id) {
              // const {
              //   combo_id,
              //   ...rest
              // } = price
              option.base_price = price.price
              // option["price"] = {
              //   ...option["price"],
              //   [combo_id]: rest
              // }
  
              // console.log(option)
            }
          })
  
          if (option.base_price === null && newOOP[option.option_id]) {
            option["price"] = newOOP[option.option_id]
          }
  
          if (option.modifier_id === modifier.modifier_id) {
            modifier["modifier_options"].push(option)
            // console.log(`Modifier: ${modifier.display_text}, Option: ${option.display_text}`)
          }
        })
      })
  
    menuItem["modifiers"] = modifiers
    return JSON.stringify(menuItem)
        
    }
}
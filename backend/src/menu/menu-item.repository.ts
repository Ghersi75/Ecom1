import { BadRequestException, Injectable } from "@nestjs/common";
import { DbService } from "src/db/db.service";

@Injectable()
export class MenuItemRepository {
    constructor(private readonly db: DbService) {}

    async getAllActiveSections() {
      const sections = await this.db.connection
      .selectFrom("Sections")
      .selectAll()
      .orderBy("DisplayOrder asc")
      .where("Sections.IsActive", "=", 1)
      .execute()

      const menu_items = await this.db.connection
        .selectFrom("MenuItems as MI")
        .innerJoin("SectionItems as SI", "MI.ItemID", "SI.ItemID")
        .select([
          "SI.SectionID",
          "MI.ItemID",
          "MI.Name",
          "MI.DisplayText",
          "MI.Description",
          "MI.ImageLink",
          "MI.BasePrice",
          "MI.DisplayPrice",
          "MI.DisplayOrder",
          "MI.IsActive",
          "MI.IsAvailable",
          "MI.IsFeatured"
        ])
        // Use SI or MI Here?
        // One of them will be redundant, or used in other ways I guess
        .orderBy("SI.DisplayOrder asc")
        .where("MI.IsActive", "=", 1)
        .where("SI.IsActive", "=", 1)
        .execute();

      sections.forEach((section) => {
        section["items"] = []
        menu_items.forEach((item) => {
          if (item.SectionID == section.SectionID) {
            delete item.SectionID
            section["items"].push(item)
          } 
        })
      })
  
      return sections
    }

    async getMenuItemById(id: number) {
      const menuItem = await this.db.connection
        .selectFrom("MenuItems")
        .selectAll()
        .where("ItemID", "=", id)
        .where("IsActive", "=", 1)
        .executeTakeFirst()
  
      if (!menuItem) {
        return new BadRequestException({
          error: "No item with given id found"
        })
      }

      const modifiers = await this.db.connection
        .selectFrom([
          "ItemModifiers as IM"
        ])
        .innerJoin("Modifiers as M", "M.ModifierID", "IM.ModifierID")
        .innerJoin("MenuItems as MI", "MI.ItemID", "IM.ItemID")
        .selectAll("M")
        .where("MI.ItemID", "=", id)
        .where("IM.IsActive", "=", 1)
        .where("M.IsActive", "=", 1)
        .orderBy("M.DisplayOrder asc")
        .execute()
      
      if (!modifiers) {
        return new BadRequestException({
          error: "No modifiers found for given item id"
        })
      }

      const modifierOptions = await this.db.connection
        .selectFrom([
          "ItemModifiers as IM"
        ])
        .innerJoin("Modifiers as M", "M.ModifierID", "IM.ModifierID")
        .innerJoin("MenuItems as MI", "MI.ItemID", "IM.ItemID")
        .innerJoin("ModifierOptions as MO", "MO.ModifierID", "M.ModifierID")
        .selectAll("MO")
        .where("MI.ItemID", "=", id)
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
        "ItemModifiers as IM"
      ])
      .innerJoin("Modifiers as M", "M.ModifierID", "IM.ModifierID")
      .innerJoin("MenuItems as MI", "MI.ItemID", "IM.ItemID")
      .innerJoin("ModifierOptions as MO", "MO.ModifierID", "M.ModifierID")
      .innerJoin(
        "ItemOptionPrices as IOP",
        (join) => join
        .onRef('IOP.OptionID', '=', 'MO.OptionID')
        .on('IOP.ItemID', '=', id)  
      )
      // "MO"
      .selectAll("IOP")
      // .select(({ fn }) => [
      //   fn.count<number>('MI.item_id').as('item_count'),
      // ])
      .where("MI.ItemID", "=", id)
      .execute()
  
      // console.log(itemOptionPrice)
  
      const optionOptionPrices = await this.db.connection
      .selectFrom([
        "ItemModifiers as IM"
      ])
      .innerJoin("Modifiers as M", "M.ModifierID", "IM.ModifierID")
      .innerJoin("MenuItems as MI", "MI.ItemID", "IM.ItemID")
      .innerJoin("ModifierOptions as MO", "MO.ModifierID", "M.ModifierID")
      .innerJoin("OptionOptionPrices as OOP", "OOP.ParentOptionID", "MO.OptionID")
      .innerJoin("ModifierOptions as MO2", "MO2.OptionID", "OOP.DependentOptionID")
      .innerJoin("Modifiers as M2", "M2.ModifierID", "MO2.ModifierID")
      .select([
        "OOP.ParentOptionID",
        "OOP.DependentOptionID",
        "M2.ModifierID",
        "OOP.Price"
      ])
      // .select(({ fn }) => [
      //   fn.count<number>('MI.item_id').as('item_count'),
      // ])
      .where("MI.ItemID", "=", id)
      .where("OOP.IsActive", "=", 1)
      // .where("OOP.is_available", "=", 1)
      .execute()
  
      // console.log(await this.db.connection.selectFrom("option_option_prices").selectAll().execute())
  
      // console.log(optionOptionPrices)
  
      const newOOP = optionOptionPrices.reduce((newObj, currObj): any => {
        // console.log(newObj, " || " ,currObj)
  
        const {
          ParentOptionID,
          ModifierID,
          DependentOptionID,
          Price,
          ...rest
        } = currObj
  
        if (!newObj[ParentOptionID]) {
          newObj[ParentOptionID] = {};
        }
      
        if (!newObj[ParentOptionID][ModifierID]) {
          newObj[ParentOptionID][ModifierID] = {};
        }
  
        newObj[currObj.ParentOptionID] = {
          ...newObj[currObj.ParentOptionID],
          modifier_id: ModifierID,
          [DependentOptionID]: Price
        }
        // console.log(newObj)
  
        return newObj
      }, {})
  
      // console.log(newOOP)
  
      modifiers.forEach((modifier) => {
        modifier["modifier_options"] = []
        modifierOptions.forEach((option) => {
          itemOptionPrice.map((price) => {
            if (price.OptionID === option.OptionID) {
              // const {
              //   combo_id,
              //   ...rest
              // } = price
              option.BasePrice = price.Price
              // option["price"] = {
              //   ...option["price"],
              //   [combo_id]: rest
              // }
  
              // console.log(option)
            }
          })
  
          if (option.BasePrice === null && newOOP[option.OptionID]) {
            option["price"] = newOOP[option.OptionID]
          }
  
          if (option.ModifierID === modifier.ModifierID) {
            modifier["modifier_options"].push(option)
            // console.log(`Modifier: ${modifier.display_text}, Option: ${option.display_text}`)
          }
        })
      })
  
    menuItem["modifiers"] = modifiers
    return JSON.stringify(menuItem)
        
    }
}
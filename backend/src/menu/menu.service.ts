import { BadRequestException, Injectable } from '@nestjs/common';
import { sql } from 'kysely';
import { DbService } from 'src/db/db.service';
import { MenuItemRepository } from './menu-item.repository';

@Injectable()
export class MenuService {
  constructor(private db: DbService, private menuItemRepo: MenuItemRepository) {}

  async getSections() {
    return this.menuItemRepo.getAllActiveSections();
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

    insert into item_option_prices 
    (item_id, option_id, price, is_active, is_available) values 
    (2, 2, 13.99, true, true),
    (2, 3, 15.99, true, true);
    
    
    // Sm Cheese Pizza 11.99
    // option_id 2 and 3 are Md and Xl pizzas respectively, so Md Cheese Pizza 13.99, Xl Cheese Pizza 15.99
    (2, 1, 11.99, true, true);
    
    insert into item_modifiers 
    (item_id, modifier_id, display_order, is_active, is_available) values
    (3, 1, 0, true, true),
    (3, 2, 1, true, true);

    parent_option_id    | int           | NO   | MUL | NULL    |       |
    | dependent_option_id | int           | NO   | MUL | NULL    |       |
    | price               | decimal(10,2) | NO   |     | NULL    |       |
    | is_active           | tinyint(1)    | NO   |     | 0       |       |
    | is_available        | tinyint(1)    | NO   |     | 0       |

    insert into option_option_prices 
    (parent_option_id, dependent_option_id, price, is_active, is_available) values
    (4, 1, 2.50, true, true), // Anchovies Sm Pizza $2.50
    (5, 1, 3.00, true, true),
    (6, 1, 2.50, true, true),
    (4, 2, 3.50, true, true), // Anchovies Md Pizza $3.50
    (5, 2, 4.00, true, true),
    (6, 2, 3.50, true, true),
    (4, 3, 4.50, true, true), // Anchovies Xl Pizza $4.50
    (5, 3, 5.00, true, true),
    (6, 3, 4.50, true, true);
    



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


    console.log(newOOP)

    // const lowestPrice = itemOptionPrice.reduce((min, item) => {
    //   return Math.min(min, parseFloat(item.price));
    // }, Infinity);


    // This doesnt have to happen every time, but should be throw into some sort of validator for when item option pricing is ever changed
    // Will stay here for now since it doesnt really matter
    // Basically, if an item has an item option price, the lowest possible price is set as base price to display on landing page
    // if (lowestPrice !== Infinity) { 
    //   await this.db.connection
    //   .updateTable("menu_items")
    //   .set({
    //     base_price: `${lowestPrice}`
    //   })
    //   .where("item_id", "=", id)
    //   .execute()

    //   menuItem["base_price"] = `${lowestPrice}`
    // }
    // console.log(lowestPrice)

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

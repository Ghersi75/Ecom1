import { ViewItemModifierInterface, BaseModifierOptionsInterface, ViewItemMenuItemInterface } from '@/lib/types/databaseReturnTypes'
import { ViewItemPriceType, ViewItemsSelectedStateInterface } from '@/lib/types/stateTypes'
import { RadioGroup } from "@/components/ui/radio-group"
import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'
import { CardContent } from '../ui/card'
import ViewItemCheckbox from './ViewItemCheckbox'
import ViewItemRadio from './ViewItemRadio'

export default function ViewItemScrollArea({
  itemData,
  handleSelectedChange,
  selected
} : {
  itemData: ViewItemMenuItemInterface;
  handleSelectedChange: (modifier_id: number, option_id: number, price: ViewItemPriceType) => void;
  selected: ViewItemsSelectedStateInterface
}) {
  return (
    <>
    <ScrollArea className="flex flex-grow">
      <CardContent>
        {
          itemData.modifiers && itemData.modifiers.length > 0 && 
          itemData.modifiers.map((modifier: ViewItemModifierInterface, index: number) => {
            return (
              <div key={index}>
              {
                modifier.modifier_options && modifier.modifier_options.length > 0 &&
                <>
                  <h1 className="p-2 text-lg">{modifier.display_text}</h1>
                  {
                    modifier.modifier_type === "RADIO" ? 
                    <div className="flex flex-col gap-2">
                      <RadioGroup>
                        {modifier.modifier_options.map((modifier_option: BaseModifierOptionsInterface, i: number) => {
                          // console.log("Radio: ", modifier_option)
                          return (
                            <ViewItemRadio 
                              modifier_id={modifier.modifier_id}
                              option_name={modifier_option.name}
                              option_id={modifier_option.option_id}
                              option_text={modifier_option.display_text}
                              handleChange={handleSelectedChange}
                              selected={selected}
                              price={modifier_option.base_price}
                              />
                          )
                        })}
                      </RadioGroup>
                    </div>
                    : 
                    modifier.modifier_type === "CHECKBOX" &&
                    <div className="flex flex-col gap-2">
                      {modifier.modifier_options.map((modifier_option: BaseModifierOptionsInterface, i: number) => {
                        return (
                          <ViewItemCheckbox 
                            modifier_id={modifier.modifier_id}
                            option_name={modifier_option.name}
                            option_id={modifier_option.option_id}
                            option_text={modifier_option.display_text}
                            handleChange={handleSelectedChange}
                            selected={selected}
                            price={modifier_option.price}
                            max_selection={modifier.max_selection}
                            />
                        )
                      })}
                    </div>
                  }
                </>
              }
              </div>
            )
          })
        }
      </CardContent>
    </ScrollArea>
    </>
  )
}

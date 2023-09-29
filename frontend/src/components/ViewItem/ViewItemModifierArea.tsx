import { ViewItemModifierInterface, BaseModifierOptionsInterface, ViewItemMenuItemInterface } from '@/lib/types/databaseReturnTypes'
import { ViewItemPriceType, ViewItemsCheckboxSelectedStateInterface, ViewItemsRadioSelectedStateInterface, ViewItemsSelectedStateInterface } from '@/lib/types/stateTypes'
import { RadioGroup } from "@/components/ui/radio-group"
import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'
import { CardContent } from '../ui/card'
import ViewItemCheckbox from './ViewItemCheckbox'
import ViewItemRadio from './ViewItemRadio'

export default function ViewItemModifierArea({
  itemData,
  handleSelectedChange,
  selected
} : {
  itemData: ViewItemMenuItemInterface;
  handleSelectedChange: (modifier_id: number, option_id: number, price: ViewItemPriceType) => void;
  selected: ViewItemsSelectedStateInterface
}) {

  return (
    <ScrollArea className="flex flex-grow">
      <CardContent>
        {
          itemData?.modifiers?.map((modifier: ViewItemModifierInterface, index: number) => {
            const modifierOptionsExist = modifier.modifier_options && modifier.modifier_options.length > 0
            return (
              <div>
                {
                  modifierOptionsExist &&
                  <>
                    <h1 className="p-2 text-lg">{modifier.display_text}</h1>
                    {
                      modifier.modifier_type === "RADIO" ? 
                      <div className="flex flex-col gap-2">
                        <RadioGroup>
                          {modifier?.modifier_options?.map((modifier_option: BaseModifierOptionsInterface, i: number) => {
                            // console.log("Radio: ", modifier_option)
                            return (
                              <ViewItemRadio 
                                modifier={modifier}
                                modifier_option={modifier_option}
                                handleChange={handleSelectedChange}
                                selected={selected[modifier.modifier_id] as ViewItemsRadioSelectedStateInterface}
                                />
                            )
                          })}
                        </RadioGroup>
                      </div>
                      : 
                      modifier.modifier_type === "CHECKBOX" &&
                      <div className="flex flex-col gap-2">
                        {modifier?.modifier_options?.map((modifier_option: BaseModifierOptionsInterface, i: number) => {
                          let dependentPriceSelected: ViewItemsRadioSelectedStateInterface | ViewItemsCheckboxSelectedStateInterface | null = null
                          if (modifier_option.price && typeof modifier_option !== "number") {
                            const dependentPriceModifierId: number = modifier_option.modifier_id
                            dependentPriceSelected = selected[dependentPriceModifierId]
                          }

                          return (
                            <ViewItemCheckbox 
                              modifier={modifier}
                              modifier_option={modifier_option}
                              handleChange={handleSelectedChange}
                              selected={selected[modifier.modifier_id] as ViewItemsCheckboxSelectedStateInterface}
                              dependentPriceSelected={dependentPriceSelected}
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
  )
}

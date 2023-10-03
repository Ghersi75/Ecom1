import { BaseModifierOptionsInterface, ViewItemModifierInterface } from '@/lib/types/databaseReturnTypes'
import { ViewItemPriceType, ViewItemsCheckboxSelectedStateInterface, ViewItemsRadioSelectedStateInterface, ViewItemsSelectedStateInterface } from '@/lib/types/stateTypes'
import { formatCurrency } from '@/lib/utils'
import React, { useState } from 'react'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'

export default function ViewItemCheckbox({ 
  modifier,
  modifier_option,
  handleChange,
  selected,
  dependentPriceSelected
 } : {
  modifier: ViewItemModifierInterface;
  modifier_option: BaseModifierOptionsInterface;
  handleChange: (modifier_id: number, option_id: number, display_text: string, price: ViewItemPriceType) => void;
  selected: ViewItemsCheckboxSelectedStateInterface;
  dependentPriceSelected: ViewItemsRadioSelectedStateInterface | ViewItemsCheckboxSelectedStateInterface | null;
 }) {
  // console.log("ViewItemCheckbox -> modifier, modifier_option", modifier, modifier_option);

  if (modifier && modifier_option) {

    const buttons = {
      buttons: [
        {
          text: "First Half"
        }, {
          text: "Second Half"
        }, {
          text: "Whole Pizza"
        }
      ],
      default: 2
    }
  
    const [selectedBtn, setSelectedBtn] = useState<number | null>(buttons.default)
    const {
      modifier_id,
      max_selection
    } = modifier
    const {
      option_id,
      name: option_name,
      display_text: option_text,
      price,
  
    } = modifier_option
    const checkboxSelected = option_id in selected?.selected_ids
    // console.log("Selected checkbox: ", checkboxSelected)
    // console.log("Selected items: ", selected)
    // const checkboxSelected = true
    // console.log(selected)
    let totalSelected = 0
  
    if (selected.selected_ids) {
      for (let [option_id, option] of Object.entries(selected?.selected_ids) ) {
        // console.log(option_id)
        // if (option.selected === true) {
          totalSelected += 1;
        // }
      }
    }

    // console.log(dependentPriceSelected)
  
    const disabled = totalSelected === max_selection && !checkboxSelected
  
    return (
      <div className="flex flex-col items-start justify-start gap-2">
        <div className={`flex items-center justify-start gap-2 ${disabled ? `hover:cursor-not-allowed` : `hover:cursor-pointer`}`} onClick={() => {
          if (!disabled) {
            handleChange(modifier_id, option_id, option_text, price)
          }
        }}>
          <Checkbox 
            id={option_name} 
            checked={checkboxSelected}
            disabled={disabled}
          />
          <Label htmlFor={option_name} className="hover:cursor-pointer">{option_text}</Label>
          {
            price &&
            <div className={`${disabled && `cursor-not-allowed disabled`}`}>
              {
                dependentPriceSelected?.type === "RADIO" && typeof price !== "number" ? 
                `${formatCurrency(price[dependentPriceSelected.selected_id || -1])}` : 
                dependentPriceSelected?.type === "CHECKBOX" &&
                `Haven't gotten here yet`
              }
              {/* {`${formatCurrency(price[(selected[price.modifier_id] as ViewItemsRadioSelectedStateInterface).selected_id || -1])}`} */}
            </div>
          }
        </div>
        {checkboxSelected && 
        <div className="flex gap-4 bg-slate-600 p-2.5 rounded-full">
          {buttons.buttons.map((val, index) => {
            return(
              <button id={`${index}`} onClick={() => setSelectedBtn(index)}>
                <p className={`p-2.5 ${selectedBtn === index && `bg-slate-400 rounded-full`}`}>
                  {val.text}
                </p>
              </button>
            )
          })}
          </div>}
      </div>
    )
  }
  return null
}

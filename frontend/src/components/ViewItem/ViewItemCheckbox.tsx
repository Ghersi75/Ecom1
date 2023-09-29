import { ViewItemPriceType, ViewItemsCheckboxSelectedStateInterface, ViewItemsRadioSelectedStateInterface, ViewItemsSelectedStateInterface } from '@/lib/types/stateTypes'
import { formatCurrency } from '@/lib/utils'
import React, { useState } from 'react'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'

export default function ViewItemCheckbox({ 
  modifier_id,
  option_name,
  option_id,
  option_text,
  handleChange,
  selected,
  price,
  max_selection
 } : {
  modifier_id: number;
  option_name: string;
  option_id: number;
  option_text: string;
  handleChange: (modifier_id: number, option_id: number, price: ViewItemPriceType) => void;
  // Just pass relevant data in
  selected: ViewItemsSelectedStateInterface;
  price: {
    modifier_id: number,
    [option_id: number]: number
  } | null;
  max_selection: number | null;
 }) {
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
  const checkboxSelected = (selected[modifier_id] as ViewItemsCheckboxSelectedStateInterface).selected_ids[option_id]?.selected
  let totalSelected = 0

  for (let [option_id, option] of Object.entries((selected[modifier_id] as ViewItemsCheckboxSelectedStateInterface).selected_ids) ) {
    if (option.selected === true) {
      totalSelected += 1;
    }
  }

  const disabled = totalSelected === max_selection && !checkboxSelected

  return (
    <div className="flex flex-col items-start justify-start gap-2">
      <div className={`flex items-center justify-start gap-2 ${disabled ? `hover:cursor-not-allowed` : `hover:cursor-pointer`}`} onClick={() => {
        if (!disabled) {
          handleChange(modifier_id, option_id, price)
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
            {`${formatCurrency(price[(selected[price.modifier_id] as ViewItemsRadioSelectedStateInterface).selected_id || -1])}`}
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

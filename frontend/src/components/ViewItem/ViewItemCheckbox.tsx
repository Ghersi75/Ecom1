import { ViewItemPriceType, ViewItemsCheckboxSelectedStateInterface, ViewItemsRadioSelectedStateInterface, ViewItemsSelectedStateInterface } from '@/lib/types/stateTypes'
import React from 'react'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'

export default function ViewItemCheckbox({ 
  modifier_id,
  option_name,
  option_id,
  option_text,
  handleChange,
  selected,
  price
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
    [option_id: number]: string
  } | null
 }) {
  // console.log("Price: ", price)
  // console.log("Selected: ", selected)

  return (
    <div className="flex items-center justify-start gap-2" 
        onClick={() => handleChange(modifier_id, option_id, price)}>
      <Checkbox 
        id={option_name} 
        checked={(selected[modifier_id] as ViewItemsCheckboxSelectedStateInterface).selected_ids[option_id]?.selected}
      />
      <Label htmlFor={option_name} className="hover:cursor-pointer">{option_text}</Label>
      {
        price ? 
        <div>
          {`$${price[(selected[price.modifier_id] as ViewItemsRadioSelectedStateInterface).selected_id || -1]}`}
        </div>
        :
        null
      }
    </div>
  )
}

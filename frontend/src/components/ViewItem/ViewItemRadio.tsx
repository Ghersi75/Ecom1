
import { BaseModifierOptionsInterface, ViewItemModifierInterface } from '@/lib/types/databaseReturnTypes'
import { ViewItemPriceType, ViewItemsRadioSelectedStateInterface, ViewItemsSelectedStateInterface } from '@/lib/types/stateTypes'
import { formatCurrency } from '@/lib/utils'
import React from 'react'
import { Label } from '../ui/label'
import { RadioGroupItem } from '../ui/radio-group'

export default function ViewItemRadio({ 
  modifier,
  modifier_option,
  handleChange,
  selected,
 } : {
  modifier: ViewItemModifierInterface;
  modifier_option: BaseModifierOptionsInterface;
  handleChange: (modifier_id: number, option_id: number, price: ViewItemPriceType) => void;
  selected: ViewItemsRadioSelectedStateInterface;
 }) {
  const {
    modifier_id
  } = modifier
  const {
    option_id,
    name: option_name,
    display_text: option_text,
    price
  } = modifier_option

  return (
    <div className="flex items-center space-x-2" onClick={(e) => {
      e.currentTarget !== e.target &&
      handleChange(modifier_id, option_id, price)
    }}>
      <RadioGroupItem
            id={option_name} 
            value={option_text}
            // name={modifier.name}
            checked={selected?.selected_id === option_id}
      />
      <Label htmlFor={option_name} className="hover:cursor-pointer">{option_text}</Label>
      {price && 
      <div>
        {typeof price === "number" && formatCurrency(price)}
      </div>}
    </div>
  )
}

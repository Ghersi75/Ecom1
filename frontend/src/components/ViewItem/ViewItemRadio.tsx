
import { ViewItemsRadioSelectedStateInterface, ViewItemsSelectedStateInterface } from '@/lib/types/stateTypes'
import React from 'react'
import { Label } from '../ui/label'
import { RadioGroupItem } from '../ui/radio-group'

export default function ViewItemRadio({ 
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
  option_text: string;
  option_id: number;
  handleChange: (modifier_id: number, option_id: number) => void;
  selected: ViewItemsSelectedStateInterface;
  price: string | null
 }) {
  return (
    <div className="flex items-center space-x-2" onClick={(e) => {
      e.currentTarget !== e.target &&
      handleChange(modifier_id, option_id)
    }}>
      <RadioGroupItem
            id={option_name} 
            value={option_text}
            // name={modifier.name}
            checked={(selected[modifier_id] as ViewItemsRadioSelectedStateInterface)?.selected_id === option_id}
      />
      <Label htmlFor={option_name} className="hover:cursor-pointer">{option_text}</Label>
      <div>
        {price}
      </div>
    </div>
  )
}

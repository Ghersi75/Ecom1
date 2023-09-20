
import { ViewItemsSelectedStateInterface } from '@/lib/types/stateTypes'
import React from 'react'
import { Label } from '../ui/label'
import { RadioGroupItem } from '../ui/radio-group'

export default function ViewItemRadio({ 
  modifier,
  option_name,
  option_text,
  handleRadioChange,
  selected
 } : {
  modifier: string;
  option_name: string;
  option_text: string;
  handleRadioChange: (modifier: string, option_name: string) => void;
  selected: ViewItemsSelectedStateInterface
 }) {
  return (
    <div className="flex items-center space-x-2" onClick={(e) => {
      e.currentTarget !== e.target &&
      handleRadioChange(modifier, option_name)
    }}>
      <RadioGroupItem
            id={option_name} 
            value={option_text}
            // name={modifier.name}
            checked={selected.radios[modifier] === option_name}
      />
      <Label htmlFor={option_name} className="hover:cursor-pointer">{option_text}</Label>
    </div>
  )
}

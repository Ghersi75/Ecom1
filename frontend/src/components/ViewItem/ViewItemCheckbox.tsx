import { ViewItemsSelectedStateInterface } from '@/lib/types/stateTypes'
import React from 'react'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'

export default function ViewItemCheckbox({ 
  modifier,
  option_name,
  option_text,
  handleCheckboxChange,
  selected
 } : {
  modifier: string;
  option_name: string;
  option_text: string;
  handleCheckboxChange: (modifier: string, option_name: string) => void;
  selected: ViewItemsSelectedStateInterface
 }) {
  return (
    <div className="flex items-center justify-start gap-2" 
        onClick={() => handleCheckboxChange(modifier, option_name)}>
      <Checkbox 
        id={option_name} 
        checked={selected.checkboxes[modifier]?.[option_name]}
      />
      <Label htmlFor={option_name} className="hover:cursor-pointer">{option_text}</Label>
    </div>
  )
}

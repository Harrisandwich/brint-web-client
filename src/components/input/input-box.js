import React from 'react'
import { Input } from '@material-ui/core'
import Style from './input.module.css'


const InputBox = ({
  text,
  onChange,
  onKeyPress,
  onKeyDown
}) => (
  <Input
    value={text}
    className={Style.inputBox}
    autoFocus
    disableUnderline
    onChange={onChange}
    onKeyPress={onKeyPress}
    onKeyDown={onKeyDown}
  />
)

export default InputBox

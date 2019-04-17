import React from 'react'
import Style from './input.module.css'

const Prompt = ({
  text,
}) => (
  <div className={Style.prompt}>
    <code>{text}</code>
  </div>
)

export default Prompt

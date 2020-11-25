import React from 'react'

const Button = props => (
<button className={props.styles} title={props.title}>{props.text}</button>
)

export default Button
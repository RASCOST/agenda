import React from 'react'

const Button = React.forwardRef(({ styles, title, text, onClick}, ref) => (
<button ref={ref} className={styles} title={title} onClick={onClick}>{text}</button>
))

export default Button
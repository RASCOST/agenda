import React from 'react'

const Input = React.forwardRef(({ label, type, inline, onChange }, ref) => {
  return (
    <>
      <label>
        {label}
      </label>{!inline ? <br /> : null}
      <input ref={ref} type={type} onChange={onChange} />{!inline ? <br /> : null}
    </>
  )
})

export default Input
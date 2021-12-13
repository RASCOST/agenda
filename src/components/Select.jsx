import React from 'react'

const Select = React.forwardRef(({ label, day, lastDay, selectDay,  onchange }, ref) => {

  const setSelectDays = day => {
    const options = []

    for (let index = Number(day); index <= Number(lastDay); index++) {
        options.push(<option key={`option${index}`} value={index}>{index}</option>)
    }

    return options
  }

  return (
    <>
      <label>{label}</label>
      <select ref={ref} className='day-select' value={selectDay} onChange={evt => onchange(evt)}>
        {setSelectDays(day)}
      </select>
    </>
  )
})

export default Select
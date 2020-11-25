import React from 'react'

const TableHead = props => {
  return (
    <th className={props.styles} style={{...props.style}}>
      {props.dayName}
    </th>
  )
}

export default TableHead
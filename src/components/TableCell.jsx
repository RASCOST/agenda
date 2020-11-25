import React from 'react'
import Number from './Number'
import ListEvents from './ListEvents'

const TableCell = props => (
  <td className={props.styles} onClick={props.onClick}>
    <Number styles={'number'} number={props.day} />
    <ListEvents events={props.events}/>
  </td>
)

export default TableCell
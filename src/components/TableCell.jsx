import React from 'react'
import Number from './Number'
import ListEvents from './ListEvents'

const TableCell = ({ day, events, styles, numStyles, onClick}) => (
  <td className={styles}>
    <div className='cell-container' onClickCapture={onClick}>
      { day ? <>
                <Number styles={numStyles} number={day} /> 
                <ListEvents events={events}/>
              </>
        : null }
      
    </div>
  </td>
)

export default TableCell
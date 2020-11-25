import React from 'react'

const AgendaHeader = props => {
  return (
    <div className="agenda-header">
      <div className='agenda-header-month'>
        <span className='less-than'>&lt;</span> {props.month} <span className='great-than'>&gt;</span>
      </div>
      <div className='agenda-header-year'>
        {props.year}
      </div>
    </div>
  )
}

export default AgendaHeader
import React from 'react'

const AgendaHeader = ({ month, year, previous, next }) => {
  return (
    <div className="agenda-header">
      <div className='agenda-header-month'>
        <span className='less-than' onClick={previous}>&lt;</span><span className='agenda-month'>{month}</span><span className='great-than' onClick={next}>&gt;</span>
      </div>
      <div className='agenda-header-year'>
        {year}
      </div>
    </div>
  )
}

export default AgendaHeader
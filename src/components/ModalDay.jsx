import React, { useEffect, useRef } from 'react'

import CloseIcon from '@material-ui/icons/Close'

import DayListEvents from './DayListEvents'

const ModalDay = ({ show, day, month, year, events, close }) => {
  const refModalDay = useRef(null)

  useEffect(() => {
    if (show) {
      refModalDay.current.style.display = 'flex'
    } else {
      refModalDay.current.style.display = 'none'
    }
  }, [show])

  /**
   * 
   */
  const filterEvents = events => {
    return events.filter( event => event.day === day ? event : null)
  }

  return (
    <section ref={refModalDay} className='modal-day-container'>
      <div className='modal-day-close' onClick={close}>
        <CloseIcon style={{ color: 'white'}}/>
      </div>
      <div className='modal-day-header'>
        <h2 className='modal-day-title'>{`${day} ${month} ${year}`}</h2>
        <h3 className='modal-day-subtitle'>événements</h3>
      </div>
      <div className='modal-day-list'>
        <DayListEvents events={filterEvents(events)}/>
      </div>
    </section>
  )
}

export default ModalDay
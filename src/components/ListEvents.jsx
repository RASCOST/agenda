import React from 'react'

const ListEvents = props => {
  let list = null

  /**
   * check if events exists
   */
  const checkEvents = events => {
    if (events) {
      list = <ul className={'list-event'}>
          {events.map(event => <li> {event.schedule} - {event.title}</li>)}
        </ul>
    }
    
    return list
  }

  return checkEvents(props.events)
}

export default ListEvents
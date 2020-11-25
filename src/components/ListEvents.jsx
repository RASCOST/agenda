import React from 'react'

const ListEvents = props => {
  let list = null

  /**
   * check if events exists
   */
  const checkEvents = events => {
    console.log(props);
    if (events) {
      list = <ul className={'list-event'}>
          {events.map(event => <li> {event.time} - {event.event}</li>)}
        </ul>
    }
    console.log(list);
    return list
  }

  return checkEvents(props.events)
}

export default ListEvents
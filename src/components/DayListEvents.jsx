import React from 'react'

import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'

import sortEvents from '../utilities/utilities';

const DayListEvents = ({ events }) => {

  const renderLi = (events) => {
    let sortedArray = null

    if (events) {
      sortedArray = events.sort(sortEvents)
    }

    return sortedArray.map((event, index) => <li key={index}><input type='time' value={`${event.schedule}`} />{`${event.schedule} - ${event.title} ${event.description}`}    <SaveOutlinedIcon style={{ color: '#03D2FF'}} />
    <EditOutlinedIcon style={{ color: '#FFB800'}} />
    <DeleteOutlineOutlinedIcon style={{ color: '#E10000'}} />
    </li>)
  }

  return (
    <ul>
      {renderLi(events)}
    </ul>
  )
}

export default DayListEvents
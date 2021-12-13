import React, { useRef, useState } from 'react'

import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'

import axios from 'axios'

import { sortEvents } from '../utilities/utilities';

const DayListEvents = ({ events }) => {

  const [schedule, setSchedule] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [id, setId] = useState('')

  const liRefs = useRef([])

  /************************************
   *         Events handlers          *
   ***********************************/
  /**
   * Handle the click on the save button
   */
  const handleSaveClick = () => {
    console.log('save');
    let update = {}
    if(id) {
      update = { ...update, id }
    }

    if(title) {
      update = { ...update, title }
    }

    if(description) {
      update = { ...update, description }
    }

    if(schedule) {
      update = { ...update, schedule }
    }

    axios.put('http://localhost:8000/updateEvent', update )
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  /**
   * Handle the click on the edit button
   */
  const handleEditClick = (e) => {
    const parent = e.target.parentElement
    const grandParent = parent.parentElement
    const childs = Array.from(grandParent.children)

    setId(grandParent.getAttribute("attr-id"))

    for (let i=0; i < childs.length - 1; i++) {
      childs[i].readOnly = false
    }
  }

  /**
   * handle the click on the delete button
   */
  const handleDeleteClick = (e) => {
    console.log('delete');

    const parent = e.target.parentElement
    const grandParent = parent.parentElement
    const id = grandParent.getAttribute("attr-id")

    axios.delete(`http://localhost:8000/deleteEvent/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  /**
   * handle schedule edit
   */
  const handleScheduleChange = e => {
    setSchedule(e.target.value)
  }

  /**
   * handle title edit
   */
  const handleTitleChange = e => {
    setTitle(e.target.value)
  }

  /**
   * handle description edit
   */
  const handleDescriptionChange = e => {
    setDescription(e.target.value)
  }
  /**
   * 
   * @param {} events 
   */
  const renderLi = events => {
    let sortedArray = null

    if (events) {
      sortedArray = events.sort(sortEvents)

      const elements =  sortedArray.map((event, index) => {
      return (
        <li attr-id={event._id} ref={ref => liRefs.current.push(ref)} className='list-item' key={index}> 
          <input className='event-schedule' type='time' defaultValue={`${event.schedule}`} readOnly onChange={e => handleScheduleChange(e)}/>
          <input className='event-title' type='text' defaultValue={`${event.title}`} readOnly onChange={e => handleTitleChange(e)} />
          <input className='event-description' type='text' defaultValue={`${event.description}`} readOnly onChange={e => handleDescriptionChange(e)} />
          <div className='modal-day-buttons' >
            <SaveOutlinedIcon style={{ color: '#2E33A0'}} onClick={handleSaveClick} />
            <EditOutlinedIcon style={{ color: '#FFB800'}} onClick={evt => handleEditClick(evt)} />
            <DeleteOutlineOutlinedIcon style={{ color: '#E10000'}} onClick={evt => handleDeleteClick(evt)} />
          </div>
        </li>)
      })

      return elements
    }
  }

  return (
    <ul className='list'>
      {renderLi(events)}
    </ul>
  )
}

export default DayListEvents
import React, { useEffect } from 'react'

import Input from './Input'
import Select from './Select'
import Button from './Button'

const Dialog = ({ show, day, lastDay, selectDay,  save, cancel, title, description, dayChange, schedule }) => {
  const refDialog = React.createRef()
  const refTitle = React.createRef()
  const refDescription = React.createRef()
  const refDay = React.createRef()
  const refTime = React.createRef()

  useEffect(() => {

    if (show) {
      refDialog.current.style.display = 'flex' // dialog visible
      refTitle.current.focus()
    } else {
      refDialog.current.style.display = 'none' // dialog hidden
      refTitle.current.value = ''
      refDescription.current.value = ''
      refDay.current.value = ''
      refTime.current.value = ''
    }
  }, [show]) // only render if props.show change

  return (
    <section ref={refDialog} className='dialog-container'>
      <fieldset>
        <legend>Ajouter un événement</legend>
        <Input ref={refTitle} label='Titre' type='text' inline={false} onChange={title} />
        <Input ref={refDescription} label='Desciption' type='text' inline={false} onChange={description} />
        {/* <div className='day-schedule'> */}
          <Select ref={refDay} label='Jour' day={day} lastDay={lastDay} selectDay={selectDay} onchange={dayChange} />
          <Input ref={refTime} label='Heure' type='time' inline={true} onChange={schedule} />
        {/* </div> */}
        <div className='buttons-container'>
          <Button styles='button-save' title="Sauver l'événement" text='Sauver' onClick={save} />
          <Button styles='button-cancel' title="Ne pas sauver l'événement" text='Annuler' onClick={cancel} />
        </div>
      </fieldset>
    </section>
  )
}

export default Dialog
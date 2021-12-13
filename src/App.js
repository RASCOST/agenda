import React, { Component } from 'react'

import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/fr-ch'

import './App.css'

import { modul } from './utilities/utilities';

import AgendaHeader from './components/AgendaHeader'
import TableHead from './components/TableHead'
import TableCell from './components/TableCell'
import TableAgenda from './components/TableAgenda'
import Button from './components/Button'
import Dialog from './components/Dialog'
import ModalDay from './components/ModalDay'

class App extends Component {
  
  constructor (props) {
    super(props)

    moment.locale()

    this.moment = moment()

    this.ref = React.createRef()
    
    this.margin = 5
    this.nameDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

    this.state = {
      month: {
        year: moment().format('YYYY'), // ex:2020
        month: moment().format('MMMM'), // ex: Julliet
        monthStartIndex: moment().startOf('month').format('e'), // index from 0-6
        monthEndIndex: moment().endOf('month').format('e'), // index from 0-6
        monthEndDay: moment().endOf('month').format('D'), // 30 or 31
        currentDay: moment().format('D'), // current day ex:5
      },
      numMonths: 0,
      showDialog: false,
      showModalDay: false,
      modalDay: '',
      selectDay: '',
      title: '',
      description: '',
      day: '',
      schedule: '',
      events: []
    }

    this.handleAddEvent = this.handleAddEvent.bind(this)
  }

  notify = () => toast.error('Vous ne pouvez pas creér des evénements dans le passé!')

  /**
   * Calculate the width of each cell
   * @param number width of the parent
   * @returns the width of each cell
   */
  calcCellWidth = width => {
    let parentWidth = width
    let cellWidth = 0

    cellWidth = (parentWidth - (this.margin * 8)) / 6

    return cellWidth
  }

  /**
   * Calculate the height of each cell
   * @param number height of the parent
   * @returns the height of each cell 
   */
  calcCellHeight = height => {
    let parentHeight = height
    let cellHeight = 0

    cellHeight = (parentHeight - (this.margin * 9) - 95 - 21) / 6

    return cellHeight
  }

  /**
   * 
   * @param {*} day 
   */
  setNumberStyles = day => {
    let styles = 'number'

    if (day === Number(this.state.month.currentDay) && this.state.month.month === moment().format('MMMM')) { // if the current month set the styles
      styles += ' number-current-day'
    } else {
      styles += ' number-days'
    }

    return styles
  }

  /**
   * Filter the events to find if the day has events
   */
  filterEvents = day => {
    const events = this.state.events

    /* return events.filter( event => {
      if (Number(event.day) === day) {
        return event
      } */
    return (events.filter(event => Number(event.day) === day ? event : null))
    
  }

  /**
   * Render table header
   * @param nameDays - [] array of string.
   * @returns table row - array of components <TableHead />.
   */
  renderHead  = () =>{
    let width = this.state.cellWidth

    const namedays = this.nameDays.map(name => <TableHead key={name} styles='table-head' dayName={name} />)

    return <tr>{namedays}</tr>
  }

  /**
   * Method to create an array of empty cells
   * @param int indexDay is the day (0-6) where the month starts
   * @returns array of empty <td />
   */
  emptyCells = (indexDay) => {
    const emptyCells = []
    const width = this.state.width
    const height = this.state.height

    // fill the array with empty cells until the month starts
    for (let index = 0; index < indexDay; index++) {
      emptyCells.push(
        <TableCell key={`emptycell${index}`} styles={'table-cell-empty'} />
      )
    }

    return emptyCells
  }

  /**
   * Method to create an array with the component TableCell
   * @params
   * @returns
   */
  daysCells = () => {
    const width = this.state.width
    const height = this.state.height
    const events = this.state.events
    const lastDayMonth = this.state.month.monthEndDay

    const days = []

    for (let day = 1; day <= lastDayMonth; day++) {
      days.push(
        <TableCell
          key={`${day}${this.state.month.month}${this.state.month.year}`}
          styles={'table-cell'}
          numStyles={this.setNumberStyles(day)}
          day={day}
          events={this.filterEvents(day)}
          onClick={this.handleClickCells}
        />
      )
    }

    return days
  }

  /**
   * Method to fill an array with all the month's days and the empty cells
   * @param Array agendaCells
   * @returns
   */
  rowsOfCells =  agendaCells => {
    const agendaRows = []
    const maxRows = agendaCells.length / 7
    let init = 0
    let end = 7

    for (let row = 1; row <= maxRows; row++) {
      let cells = agendaCells.slice(init, end)
      agendaRows.push(<tr key={row}>{cells}</tr>)
      init = end
      end = end + 7
    }

    return agendaRows
  }

  /**
   * Method to render the month's days
   */
  renderCells =  () => {
    const startDay = Number(this.state.month.monthStartIndex)
    const endDay = 7 - (Number(this.state.month.monthEndIndex) + 1)

    const initialBlankCells = this.emptyCells(startDay)
    const endEmptyCells = this.emptyCells(endDay)
    const days = this.daysCells()

    const agendaCells = [...initialBlankCells, ...days, ...endEmptyCells]

    return this.rowsOfCells(agendaCells)
  }

   componentDidMount() {
    /*let width = this.ref.current.clientWidth
    let height = this.ref.current.clientHeight

    
    this.setState({
      cellWidth: this.calcCellWidth(width),
      cellHeight: this.calcCellHeight(height)
    })*/

    axios.get(`http://localhost:8000/events/${this.state.month.year}/${this.state.month.month}`).then(res => this.setState({events: res.data }))
  }
  /**
   * Reset the state temporary properties
   */
  resetState = () => {
    this.setState({
      showDialog: false,
      showModalDay: false,
      title: '',
      description: '',
      schedule: '',
      day: ''
    })
  }

  /**
   * Buttons Event Handlers
   */
  /**
   * Handle the click event from the component Button add event to the agenda.
   * Set the showDialog property to true.
   */
  handleAddEvent = () => {
    this.state.numMonths >= 0 ? 
      this.setState({ showDialog: true }) :
      this.notify()
  }

  /**
   * Handle the click event from the dialog save button.
   */
  handleSaveAddEvent = () => {
    const year = this.state.month.year
    const month = this.state.month.month

    let newevent = {
      title: this.state.title,
      description: this.state.description,
      day: this.state.day,
      schedule: this.state.schedule
    }

    axios.post('http://localhost:8000/newEvent', { year, month, ...newevent })
      .then(res => console.log(res))
      .catch(err => console.log(err))

    this.setState(state => ({
      events: [...state.events, newevent]
    }))

    this.resetState()
  }

  /**
   * Handle the click event from the dialog cancel button.
   */
  handleCancelAddEvent = () => {
    this.resetState()
  }

  /**
   * Handle click event on table cells
   * @param {*} event
   */
  handleClickCells = event => {
    event.preventDefault()

    let day = event.currentTarget.children.length > 0 ? event.currentTarget.children[0].innerHTML : event.currentTarget.innerHTML

    this.setState({
      modalDay: day,
      showModalDay: true
    })
  }

  /**
   * Inputs Event Handler
   */
  /**
   * Save the temporary title of the event in the state
   */
  handleTitleEvent = event => {
    this.setState({ title: event.target.value })
  }

  /**
   * Save the temporary description of the event in the state
   */
  handleDescriptionEvent = event => {
    this.setState({ description: event.target.value })
  }

  /**
   * Save the temporary day of event in the state
   */
  handleDayEvent = event => {
    this.setState({
      selectDay: event.target.value,
      day:  event.target.value
    })
  }

  /**
   * Save the temporary schedule event in the state
   */
  handleScheduleEvent = event => {
    this.setState({ schedule: event.target.value })
  }

  /**
   * Modal day Handler
   */
  handleCloseModal = () => {
    this.setState({ showModalDay: false })
  }

  /**
   * Events previous an next month handlers
   */
  handlePreviousMonth = () => {
    let numMonths = this.state.numMonths
    const previous = numMonths <= 0 ? moment().subtract(modul(--numMonths), 'month') : moment().add(--numMonths, 'month')

    const month = {
      year: previous.format('YYYY'), // ex:2020
      month: previous.format('MMMM'), // ex: Julliet
      monthStartIndex: previous.startOf('month').format('e'), // index from 0-6
      monthEndIndex: previous.endOf('month').format('e'), // index from 0-6
      monthEndDay: previous.endOf('month').format('D'), // 30 or 31
      currentDay: previous.format('MMMM') === moment().format('MMMM') ? moment().format('D') : '', // current day ex:5
    }

    // Get the events for his month
    axios.get(`http://localhost:8000/events/${month.year}/${month.month}`)
      .then(res => this.setState({ month, numMonths, events: res.data }))
      .catch(err => console.log(err))
  }

  handleNextMonth = () => {
    let numMonths = this.state.numMonths
    const next = numMonths >= 0 ? moment().add(++numMonths, 'month') : moment().subtract(modul(++numMonths), 'month')

    const month = {
      year: next.format('YYYY'), // ex:2020
      month: next.format('MMMM'), // ex: Julliet
      monthStartIndex: next.startOf('month').format('e'), // index from 0-6
      monthEndIndex: next.endOf('month').format('e'), // index from 0-6
      monthEndDay: next.endOf('month').format('D'), // 30 or 31
      currentDay: next.format('MMMM') === moment().format('MMMM') ? moment().format('D') : '', // current day ex:5
    }

    // this.setState({ month, numMonths })
    // Get the events for his month
    axios.get(`http://localhost:8000/events/${month.year}/${month.month}`)
      .then(res => this.setState({ month, numMonths, events: res.data }))
      .catch(err => console.log(err))
  }

  render () {
    return (
      <div className="App" ref={this.ref}>
          <Toaster />
          <header>
            <AgendaHeader
              month={this.state.month.month}
              year={this.state.month.year}
              previous={this.handlePreviousMonth}
              next={this.handleNextMonth}
            />
          </header>
          <section className='table-container'>
            <TableAgenda
              styles={'table-agenda'}
              renderHead={this.renderHead}
              renderCells={this.renderCells}
            />
            <Button styles='add-button' text='+' title='Ajouter évenement' onClick={this.handleAddEvent}/>
          </section>
          <Dialog
            show={ this.state.showDialog }
            day={this.state.numMonths !== 0 ? '1' : this.state.month.currentDay}
            lastDay={this.state.month.monthEndDay}
            save={this.handleSaveAddEvent}
            cancel={ this.handleCancelAddEvent}
            title={this.handleTitleEvent}
            description={this.handleDescriptionEvent}
            dayChange={this.handleDayEvent}
            schedule={this.handleScheduleEvent}
          />
          <ModalDay
            show={this.state.showModalDay}
            day={this.state.modalDay}
            month={this.state.month.month}
            year={this.state.month.year}
            events={this.state.events}
            close={this.handleCloseModal}
          />
      </div>
    )
  }
}

export default App

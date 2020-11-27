import React, { Component } from 'react'

import moment from 'moment'
import 'moment/locale/fr-ch'

import './App.css'

import AgendaHeader from './components/AgendaHeader'
import TableHead from './components/TableHead'
import TableCell from './components/TableCell'
import TableAgenda from './components/TableAgenda'
import Button from './components/Button'

class App extends Component {
  
  constructor (props) {
    super(props)

    moment.locale()

    this.moment = {
      year: moment().format('YYYY'), // ex:2020
      month: moment().format('MMMM'), // ex: Julliet
      monthStartIndex: moment().startOf('month').format('e'), // index from 0-6
      monthEndIndex: moment().endOf('month').format('e'), // index from 0-6
      monthEndDay: moment().endOf('month').format('D'), // 30 or 31
      currentDay: moment().format('D'), // current day ex:5
    }

    this.ref = React.createRef()
    
    this.margin = 5
    this.nameDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

    this.state = {
      cellWidth: 0,
      cellHeigth: 0,
      events: [
        {
          schedule: '8:30',
          title: 'Eggs',
          description: 'Seance',
          day: 14
        },
        {
          schedule: '9:30',
          title: 'Mulliez',
          description: 'Seance',
          day: 14
        }
      ]
    }
  }

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
   * Render table header
   * @param nameDays - [] array of string.
   * @returns table row - array of components <TableHead />.
   */
  renderHead  = () =>{
    let width = this.state.cellWidth

    const namedays = this.nameDays.map(name => <TableHead key={name} style={{width: `${width}px`}} styles='table-head' dayName={name} />)

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
        <TableCell key={`emptycell${index}`} styles={'table-cell-empty'} style={{width: `${width}px`, height: `${height}px`}} />
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
    const lastDayMonth = this.moment.monthEndDay

    const days = []

    for (let day = 1; day <= lastDayMonth; day++) {
      days.push(
        <TableCell key={`${day}${this.moment.month}${this.moment.year}`} styles={'table-cell'} style={{width: `${width}px`, height: `${height}px`}} day={day} events={events} />
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
    console.log(agendaRows);
    return agendaRows
  }

  /**
   * Method to render the month's days
   */
  renderCells =  () => {
    const startDay = Number(this.moment.monthStartIndex)
    const endDay = 7 - (Number(this.moment.monthEndIndex) + 1)

    const initialBlankCells = this.emptyCells(startDay)
    const endEmptyCells = this.emptyCells(endDay)
    const days = this.daysCells()

    const agendaCells = [...initialBlankCells, ...days, ...endEmptyCells]

    return this.rowsOfCells(agendaCells)
  }

  /**
   * 
   */
  /* renderCells = () => {
    let width = this.state.width
    let height = this.state.height

    return <tr><TableCell styles={'table-cell'} style={{width: `${width}px`, height: `${height}px`}} day={1} events={[{event: 'Seance', time: '8:30'}]}/></tr>
  } */
  
  componentDidMount() {
    let width = this.ref.current.clientWidth
    let height = this.ref.current.clientHeight

    
    this.setState({
      cellWidth: this.calcCellWidth(width),
      cellHeight: this.calcCellHeight(height)
    })
  }

  render () {
    return (
      <div className="App" ref={this.ref}>
        <header>
          <AgendaHeader month={this.moment.month} year={this.moment.year} />
        </header>
        <section>
          <TableAgenda
            styles={'table-agenda'}
            renderHead={this.renderHead}
            renderCells={this.renderCells}
          />
          <Button styles='add-button' text='+' title='Ajouter événement' />
        </section>
      </div>
    )
  }
}

export default App

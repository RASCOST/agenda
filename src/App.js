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
    
    this.ref = React.createRef()
    
    this.margin = 5
    this.nameDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

    this.state = {
      cellWidth: 0,
      cellHeigth: 0
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
   * 
   */
  calcCellHeight = height => {
    let parentHeight = height
    let cellHeight = 0

    cellHeight = (parentHeight - (this.margin * 9) - 95 - 21) / 6

    return cellHeight
  }

  /**
   * Render table head
   * @param nameDays - [] array of string.
   * @returns table row - array of components <TableHead />.
   */
  renderHead  = () =>{
    let width = this.state.cellWidth

    const namedays = this.nameDays.map(name =>  <TableHead key={name} style={{width: `${width}px`}} styles='table-head' dayName={name} />)

    return <tr>{namedays}</tr>
  }

  /**
   * 
   */
  renderCells = () => {
    let width = this.state.width
    let height = this.state.height

    return <tr><TableCell styles={'table-cell'} style={{width: `${width}px`, height: `${height}`}} day={1} events={[{event: 'Seance', time: '8:30'}]}/></tr>
  }
  
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
          <AgendaHeader month='Novembre' year='2020' />
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

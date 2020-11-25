import React from 'react'

const TableAgenda = props => {
  return (
    <table className={props.styles}>
      <thead>
        {props.renderHead()}
      </thead>
      <tbody>
        {props.renderCells()}
      </tbody>
    </table>
  )
}

export default TableAgenda
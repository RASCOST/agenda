import React from 'react'

const TableAgenda = ({ styles, renderHead, renderCells }) => {
  return (
    <table className={styles}>
      <thead>
        {renderHead()}
      </thead>
      <tbody>
        {renderCells()}
      </tbody>
    </table>
  )
}

export default TableAgenda
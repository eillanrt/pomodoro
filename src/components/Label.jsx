import React from 'react'
import { flexSpaceAround } from '../utils/flexSpaceAround'

function Label({ type, increment, decrement, length }) {
  return (
    <div id={type + '-label'}>
      <h1>{type} length</h1>
      <div style={flexSpaceAround}>
        <button id={type + '-increment'} onClick={increment}>
          <i className="fa-solid fa-arrow-up" />
        </button>
        <p id={type + '-length'}>{length}</p>
        <button id={type + '-decrement'} onClick={decrement}>
          <i className="fa-solid fa-arrow-down" />
        </button>
      </div>
    </div>
  )
}

export default Label

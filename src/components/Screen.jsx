import React from 'react'
import { flexSpaceAround } from '../utils/flexSpaceAround'

function Screen({ status, time, isRunning, reset, playPause }) {
  return (
    <>
      <h1 id="timer-label">{status}</h1>
      <div id="time-left">{time}</div>
      <div style={flexSpaceAround}>
        <button
          title={isRunning ? 'Pause' : 'Play'}
          id="start_stop"
          onClick={playPause}
        >
          <i className={isRunning ? 'fa-solid fa-pause' : 'fa-solid fa-play'} />
        </button>
        <button title="Reset" id="reset" onClick={reset}>
          <i className="fa-solid fa-rotate" />
        </button>
      </div>
    </>
  )
}

export default Screen

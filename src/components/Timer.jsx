import { useState, useEffect, useRef } from 'react'
import Label from './Label'
import Screen from './Screen'
import accurateInterval from '../utils/accurateInterval.js'
import clockify from '../utils/clockify.js'

function Timer() {
  const [time, setTime] = useState(1500),
    [sessionLength, setSessionLength] = useState(25),
    [breakLength, setBreakLength] = useState(5),
    [isRunning, setIsRunning] = useState(false),
    [interval, updateInterval] = useState(undefined),
    [status, setStatus] = useState('focus')

  const audioRef = useRef(null)

  useEffect(() => {
    const body = document.body
    const timerWrapper = document.getElementById('timer-wrapper')

    if (status === 'focus') {
      body.style.backgroundColor = '#cd5c5c'
      timerWrapper.style.backgroundColor = '#b22222'
    } else {
      body.style.backgroundColor = '#4f666a'
      timerWrapper.style.backgroundColor = '#2f4f4f'
    }
  }, [status])

  useEffect(() => {
    const preventUserOnLeave = (event) => {
      event.returnValue = 'Changes that you made may not be saved.'
    }

    window.addEventListener('beforeunload', preventUserOnLeave)

    return () => {
      window.removeEventListener('beforeunload', preventUserOnLeave)
    }
  }, [isRunning])

  const play_pause = () => {
    let sec = time
    let stats = status

    const countDown = () => {
      sec--
      setTime(sec)
      if (sec === -1) {
        audioRef.current.play()
        if (stats === 'focus') {
          setStatus('break')
          stats = 'break'
          sec = breakLength * 60
        } else {
          setStatus('focus')
          stats = 'focus'
          sec = sessionLength * 60
        }
        setTime(sec)
      }
    }

    if (!isRunning) {
      setIsRunning(true)
      updateInterval(accurateInterval(countDown, 1000))
    } else {
      setIsRunning(false)
      interval.cancel()
    }
  }

  const reset = () => {
    if (!audioRef.current.paused) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    if (interval) {
      interval.cancel()
      updateInterval(undefined)
    }

    setSessionLength(25)
    setBreakLength(5)
    setTime(1500)
    setStatus('focus')
    setIsRunning(false)
  }

  const handleIncrement = (type) => {
    if (isRunning) return

    if (type === 'session') {
      if (sessionLength === 60) return
      setSessionLength(sessionLength + 1)
      if (status === 'focus') setTime(sessionLength * 60 + 60)
      return
    }

    if (breakLength === 60) return
    setBreakLength(breakLength + 1)
    if (status === 'break') setTime(breakLength * 60 + 60)
  }

  const handleDecrement = (type) => {
    if (isRunning) return

    if (type === 'session') {
      if (sessionLength === 1) return
      setSessionLength(sessionLength - 1)
      if (status === 'focus') setTime(sessionLength * 60 - 60)

      return
    }

    if (breakLength === 1) return
    setBreakLength(breakLength - 1)
    if (status === 'break') setTime(breakLength * 60 - 60)
  }

  return (
    <div id="timer">
      <div id="labels">
        <Label
          type="session"
          increment={() => handleIncrement('session')}
          decrement={() => handleDecrement('session')}
          length={sessionLength}
        />
        <Label
          type="break"
          increment={() => handleIncrement('break')}
          decrement={() => handleDecrement('break')}
          length={breakLength}
        />
      </div>
      <div id="timer-wrapper">
        <Screen
          status={status}
          time={clockify(time)}
          isRunning={isRunning}
          reset={reset}
          playPause={play_pause}
        />
      </div>
      <audio
        ref={audioRef}
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      ></audio>
    </div>
  )
}

export default Timer

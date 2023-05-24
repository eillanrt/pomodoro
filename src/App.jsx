import Timer from './components/Timer.jsx'
import './App.css'

function App() {
  return (
    <>
      <header>
        <h1>Pomodoro Clock</h1>
      </header>
      <Timer />
      <footer>
        <p>
          <a href="https://github.com/eillanrt/pomodoro-timer" target="_blank">
            <i className="fab fa-github"></i>
            @eillanrt
          </a>
        </p>
      </footer>
    </>
  )
}

export default App

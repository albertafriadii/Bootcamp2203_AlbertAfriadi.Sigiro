import { useState } from 'react'
import logo from './logo.svg'
import {Button, Toast} from 'react-bootstrap'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <Toast>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Buttons</strong>
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>
                    <Button variant="primary" type="button" onClick={() => setCount((count) => count + 1)}>
                      add
                    </Button>('')
                    <Button variant="danger" type="button" onClick={() => setCount((count) => count - 1)}>
                      reduce
                    </Button>
                  <h3>
                    Quantity = {count}
                  </h3>
                </Toast.Body>
        </Toast>
      </header>
    </div>
  )
}

export default App

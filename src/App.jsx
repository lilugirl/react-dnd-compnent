import { useState } from 'react'
import Layout from './components/layout'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Layout />
    </div>
  )
}

export default App

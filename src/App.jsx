import { useState } from 'react'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Layout from './components/layout'
import Preview from './components/preview';
import './App.css'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />} />
        <Route path='/preview' element={<Preview />} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App

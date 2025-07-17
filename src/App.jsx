import React from 'react'
import './App.css'
import Landingpage from './vendorDashboard/pages/Landingpage'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Landingpage />} />
      </Routes>
    </div>
  )
}

export default App

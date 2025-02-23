import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './css/App.css'
import {Routes, Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './components/HomePage'
import Favorite from './components/Favorite'

function App() {
  return (
    <div>
      <NavBar />
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path="/favorite" element={<Favorite />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

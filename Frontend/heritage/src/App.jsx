import React from 'react'
import './App.css'
import Navbar from './components/navBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Explore from './pages/Explore';
import About from './pages/About';
import Home from './pages/Home';

function App() {

  return (
    
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/explore" element={<Explore/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
        
      </BrowserRouter>
    
  );
}

export default App

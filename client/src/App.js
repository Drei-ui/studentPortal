import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Home from './Elements/Home'
import Create from './Elements/Create'
import Edit from './Elements/Edit'
import Read from './Elements/Read'
import Login from './Elements/Login'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Login />}/>
        <Route path='/home' element = {<Home />}/>
        <Route path='/create' element = {<Create />}/>
        <Route path='/edit/:id' element = {<Edit />}/>
        <Route path='/read/:id' element = {<Read />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
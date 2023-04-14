import React from 'react'
import BasicForm from './components/BasicForm'
import { Route, Routes } from 'react-router-dom'
import Hello from './components/Hello'

const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path='/' element={<BasicForm />}/>
        <Route path='/hello' element={<Hello />}/> 
      </Routes>
    </React.Fragment>
  )
}

export default App

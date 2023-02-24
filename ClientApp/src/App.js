import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeeContainer from './Container/EmployeeContainer'

export default function App() {
  return (
    <div className="App">
      
      <BrowserRouter forceRefresh={true}>
        <Routes>
          <Route path='/' element={<EmployeeContainer></EmployeeContainer>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

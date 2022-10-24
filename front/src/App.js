import React from 'react';
import { Routes, Route } from 'react-router-dom';
import  Register  from './components/Register';
import  Headfoot  from './components/Headfoot';
import Login from './components/Login';
import Participants from './components/Participants';
import ParticipantReg from './components/ParticipantReg';

function App() {
  return (
    <Routes>      

      <Route path='/' element={<Headfoot><Register /></Headfoot>}/>

      <Route path='/login' element={<Headfoot><Login/></Headfoot>}/>

      <Route path='/participants' element={<Headfoot><Participants/></Headfoot>}/>   

      <Route path='/participant-add' element={<Headfoot><ParticipantReg/></Headfoot>}/>  
         
    </Routes>
  );
}

export default App;

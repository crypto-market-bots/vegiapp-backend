import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import React from 'react';
import Sign from './Components/Sign';
import ForgotPassword from './Components/ForgotPassword';
import Protected from './Components/Protected';
import MainHead from './Components/MainHead';
import Reset from './Components/Reset';
import Loading from './Components/Loading';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/Sign' element={<Sign/>}/>
      <Route path= '/forgot_password' element={<ForgotPassword/>}/>
      <Route path= '/reset' element={<Reset/>}/>
      <Route path = '/loading' element={<Loading/>}/>
      <Route path='*' element={<Protected Component={MainHead}/>}/> 
    </Routes>
    </BrowserRouter>
   
    
  )
}
export default App;
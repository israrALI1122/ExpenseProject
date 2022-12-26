import './App.css';

import Login from './components/login/login'
import Register from './components/register/register';
import {  BrowserRouter ,Routes,  Route } from "react-router-dom";
import { useState } from 'react';
import Homepage from './components/homepage/homepage';

function App() {
  const [ user, setLoginUser] = useState({})
  return (
    <>

  <BrowserRouter>
    <Routes>

    <Route exact path="/" element= {
              user && user._id ? <Homepage setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser}/>
            }>
           
          </Route>
      
          <Route path="/login" element={<Login setLoginUser={setLoginUser} ></Login>}>
           
          </Route>

          <Route path="/register" element={<Register/>}>
            
          </Route>
      
    </Routes>
    
     </BrowserRouter>

    </>
  );
}

export default App;

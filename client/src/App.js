import './App.css';
// import Graph from './components/Graph';
// import Form from './components/Form';

// new imports 
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
            {/* {
              user && user._id ? <Homepage setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser}/>
            } */}
          </Route>
      
          <Route path="/login" element={<Login setLoginUser={setLoginUser} ></Login>}>
            {/* // <Login setLoginUser={setLoginUser}/> */}
          </Route>

          <Route path="/register" element={<Register/>}>
            {/* <Register /> */}
          </Route>
      
    </Routes>
    
     </BrowserRouter>













  {/* <div className="App">
    <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
      <h1 className="text-4xl py-8 mb-10 bg-slate-600 text-white rounded">Expense Tracker</h1>   
      <div className="grid md:grid-cols-2 gap-4">
          <Graph></Graph>
          <Form></Form>
      </div>
    </div>
  </div> */}
    </>
  );
}

export default App;

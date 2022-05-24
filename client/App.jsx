import React from "react";
import ReactDOM  from "react-dom";
import LoginPage from './components/LoginPage.jsx';
import HomePage from './components/HomePage.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (  
    <Routes>
      <Route exact path = '/' element={<LoginPage/>}/> 
      <Route exact path = '/home' element={<HomePage/>}/>
    </Routes>
  ); 
}

ReactDOM.render(<Router><App/></Router>, document.getElementById('root'));
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



import Home from "../src/pages/Home";
import Events from "../src/pages/Events";
import EventDetails from './components/EventDetails';


const App = () => {
  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<Home />} exact></Route>
      <Route path="/events" element={<Events />}></Route>
      <Route path="/events/:id" element={<EventDetails />}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App;
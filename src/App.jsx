import React from 'react';
import {Route, BrowserRouter,Routes } from 'react-router-dom';
import Home from './Home';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Chat from './components/Chat';

function App() {
  return (
    <BrowserRouter>
    <Header />
    <div className="h-[100vh] flex">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Chat/>}>
         
        </Route>

      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
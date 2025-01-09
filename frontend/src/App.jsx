import * as Yup from "yup";
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageError, PageLogin  } from "./Components/Form";
import { PrivatePage } from "./Components/PrivatePage.jsx";
import PrivateRoute from './PrivateRoute.js';


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="" element={<PageError />} />
        <Route path="login" element={<PageLogin />} />
        <PrivateRoute path='admin' element={PrivatePage} />
      </Routes>
    </BrowserRouter>
    </div>  
  );
};

export default App;
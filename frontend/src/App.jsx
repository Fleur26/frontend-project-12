import * as Yup from "yup";
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageError, PageLogin  } from "./Components/Form";


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="" element={<PageError />} />
        <Route path="login" element={<PageLogin />} />
      </Routes>
    </BrowserRouter>
    </div>  
  );
};

export default App;
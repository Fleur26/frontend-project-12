import * as Yup from "yup";
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageError, PageLogin  } from "./Components/Form";
import PrivatePage from "./Components/PrivatePage";


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="" element={<PageError />} />
        <Route path="login" element={<PageLogin />} />
        <Route path="private" element={<PrivatePage />} />
      </Routes>
    </BrowserRouter>
    </div>  
  );
};

export default App;
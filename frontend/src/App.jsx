import * as Yup from "yup";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageError, PageLogin  } from "./Components/Form";
import PrivateRoute from './privateRoute.jsx';
import PrivatePage from "./Components/PrivatePage.jsx";


import { observer } from "mobx-react-lite";
import AuthStore from "./store.js";
 
// import UsersPage from "./pages/usersPage";

const App = observer(() => {
  
  useEffect(() => {
     AuthStore.checkAuth();
  }, []);
 
  return (
    <BrowserRouter>
        <Routes>
            <Route path="login" element={<PageLogin />} />

            <Route path="/" element={<PrivateRoute  />}>
                <Route path="" element={<PrivatePage />} />
                <Route path=":id" element={<PrivatePage />} />
            </Route>

            <Route path="" element={<PageError />} />
        </Routes>
    </BrowserRouter>
   );
});

export default App;


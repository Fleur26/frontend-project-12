import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

export const PrivateRoute = (props) => {
  const token = localStorage.getItem("myToken");
  const location = useLocation();

  if (token) {
    return <Route {...props} />
  }

  return (
    <Redirect to={{ pathname: '/login', state: { from: location } }} />
  );
};
export default PrivateRoute;
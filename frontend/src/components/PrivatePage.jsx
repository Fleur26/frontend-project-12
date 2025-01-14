import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Row } from 'react-bootstrap';

import getAuthHeader from '../getAuthHeader.js';



const PrivatePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const authHeader = await getAuthHeader();
      dispatch(fetchData(authHeader))
        .unwrap()
        .catch((e) => {
          console.log(e);
        });
    };

    fetchData();
})};

export default PrivatePage;

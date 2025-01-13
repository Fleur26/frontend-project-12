// @ts-check

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import routes from '../routes.js';
import { useNavigate } from 'react-router-dom';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const PrivatePage = () => {
// BEGIN (write your solution here)
const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
 
    const token = localStorage.getItem('authToken');

    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('/private', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Ошибка при получении данных');
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Данные с сервера</h1>
      <p>{data}</p>
    </div>
  );

// END
};

export default PrivatePage;

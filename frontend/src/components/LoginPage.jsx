import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Извлекаем из location информацию о предыдущем пути
  const redirectTo = location.state?.from || '/'; // если редирект не задан, по умолчанию на главную

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError('');

    try {
      // Подключаемся к API для аутентификации
      const response = await fetch('https://your-api-url.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('The username or password is incorrect');
      }

      const data = await response.json();

      // Сохраняем токен в localStorage
      localStorage.setItem('authToken', data.token);

      // Перенаправляем на нужную страницу
      navigate(redirectTo);
    } catch (error) {
      setError(error.message); // Отображаем сообщение об ошибке
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Если токен уже есть в localStorage, можно сделать редирект на главную страницу
    if (localStorage.getItem('authToken')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
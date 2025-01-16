
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Button, Navbar, Nav } from 'react-bootstrap';

import PublicPage from './PublicPage.jsx';
import LoginPage from './LoginPage.jsx';
import PrivatePage from './PrivatePage.jsx';
import AuthContext from '../contexts/index.jsx';
import useAuth from '../hooks/index.jsx';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';



const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const AuthButton = () => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Log out</Button>
      : <Button as={Link} to="/login" state={{ from: location }}>Log in</Button>
  );
};

const App = () => (
  const AuthProvider = ({ children }) => {
    const savedUserData = JSON.parse(localStorage.getItem('userId'));
    const [loggedIn, setLoggedIn] = useState(Boolean(savedUserData));
    const [user, setUser] = useState(
      savedUserData ? { username: savedUserData.username } : null,
    );
  
    const logIn = useCallback((userData) => {
      setLoggedIn(true);
      setUser({ username: userData.username });
    }, []);
  
    const logOut = useCallback(() => {
      localStorage.removeItem('userId');
      setUser(null);
      setLoggedIn(false);
    }, []);
  
    const memoizedValue = useMemo(
      () => ({
        loggedIn,
        logIn,
        logOut,
        user,
      }),
      [loggedIn, logIn, logOut, user],
    );
  
    return (
      <AuthContext.Provider value={memoizedValue}>
        {children}
      </AuthContext.Provider>
    );
  };
  const [socket, setSocket] = useState(null);

  // Инициализация сокета в состоянии
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Создание нового сокета
    const newSocket = io({
      withCredentials: true 
    });

    // Обработчики сокета
    newSocket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    });
    
    newSocket.on('newChannel', (payload) => {
      dispatch(addChannel(payload));
    });
    
    newSocket.on('removeChannel', (payload) => {
      dispatch(deleteChannel(payload.id));
    });
    
    newSocket.on('renameChannel', (payload) => {
      dispatch(channelRename(payload));
    });

    // Установка сокета
    setSocket(newSocket);

    // Очистка обработчиков и закрытие сокета при размонтировании компонента
    return () => {
      newSocket.off('newMessage');
      newSocket.off('newChannel');
      newSocket.off('removeChannel');
      newSocket.off('renameChannel');
      newSocket.close(); // Закрываем соединение
    };
    
  }, [dispatch]);

  // Дебаунс для отправки сообщений
  const sendMessage = useDebounce((...args) => {
    if (socket) { // Проверка на наличие сокета
      socket.emit('newMessage', ...args);
    }
  }, 300);

  <AuthProvider>
    <Router>
      <div className="container p-3">
        <Routes>
          <Route path="/" element={null} />
          <Route path="/public" element={<PublicPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/private"
            element={(
              <PrivateRoute>
                <PrivatePage />
              </PrivateRoute>
            )}
          />
        </Routes>
      </div>

    </Router>
  </AuthProvider>
);

export default App;

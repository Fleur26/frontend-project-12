// @ts-check

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import routes from '../routes.js';
import { useNavigate } from 'react-router-dom';

const PrivatePage = () => {
  async function getChatData() {
    try {
        // Проверяем, авторизован ли пользователь
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('Пользователь не авторизован');
        }

        // Отправляем запрос на сервер для получения данных чата
        const response = await fetch('https://api.example.com/private', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,  // Отправляем токен авторизации
                'Content-Type': 'application/json'
            }
        });

        // Проверка успешности запроса
        if (!response.ok) {
            throw new Error('Ошибка при получении данных с сервера');
        }

        // Парсим ответ
        const data = await response.json();
        
        // Обрабатываем и отображаем данные чата
        renderChatData(data);
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Не удалось загрузить данные чата');
    }
}

// Функция для отображения данных чата в интерфейсе
function renderChatData(data) {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.innerHTML = '';  // Очищаем контейнер

    // Проходим по всем сообщениям и отображаем их
    data.messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = `${message.sender}: ${message.text}`;
        chatContainer.appendChild(messageElement);
    });
}

// Вызываем функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', getChatData);
};

export default PrivatePage;

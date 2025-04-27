// src/services/auth.js
export function saveUserToLocalStorage(user, token) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
  
  export function getToken() {
    return localStorage.getItem('token');
  }
  
  export function getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
  
  export function logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  
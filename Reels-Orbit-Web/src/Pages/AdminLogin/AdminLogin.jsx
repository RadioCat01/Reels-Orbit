/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const adminUserName=import.meta.env.VITE_ADMIN_USERNAME;
  const adminPassword=import.meta.env.VITE_ADMIN_PASSWORD;

  const handleLogin = (e) => {
    e.preventDefault();
   
    if (username === `${adminUserName}` && password === `${adminPassword}`) {
      onLogin(true);
      navigate('/admin');  
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
    <form className="login-form" onSubmit={handleLogin}>
    <h2>Admin Login</h2>
      <div className="input-group">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="User Name"
        />
      </div>
      <div className="input-group">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <button type="submit" className="login-btn">Login</button>
    </form>
  </div>
  );
}

export default Login;

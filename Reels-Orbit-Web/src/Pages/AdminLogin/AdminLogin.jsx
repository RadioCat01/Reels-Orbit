/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
   
    if (username === 'admin' && password === 'admin123') {
      onLogin(true);
      navigate('/admin');  
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
    <h2>Login</h2>
    <form className="login-form" onSubmit={handleLogin}>
      <div className="input-group">
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Admin username"
        />
      </div>
      <div className="input-group">
        <label>Password:</label>
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

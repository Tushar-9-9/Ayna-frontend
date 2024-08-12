import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; 

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:1337/api/auth/local/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setSuccessMessage('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        console.error('Registration failed:', data.error);
        setErrorMessage(data.error.message || 'Registration failed. Please check your input.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('An error occurred during registration. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }} className="auth-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <button type="submit" className="auth-button">Register</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p>
        Already have an account? <button className="link-button" onClick={() => navigate('/login')}>Login</button>
      </p>
    </div>
  );
}

export default Register;

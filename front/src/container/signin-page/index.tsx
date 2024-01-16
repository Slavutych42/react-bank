import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext'; // Перевірте шлях до AuthContext
import './index.css'; // Перевірте шлях до вашого CSS файлу

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth(); // Використання функції login з AuthContext
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Додайте сюди логіку валідації пароля
    if (password.length < 6) {
      setError('Sorry, the password is too simple');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/signin-page', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed'); // Або використовуйте error message від сервера
      }

      const data = await response.json();

      if (data.token) {
        login(data.token); // Встановлення токена за допомогою функції login
        navigate('/balance-page'); // Перехід на сторінку балансу
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      if(err instanceof Error && err.message) {
        setError(err.message)
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSignIn} className="signin-form">
        <div>
          <h2>Sign in</h2>
          <p>Select login method</p>
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {error && <div className="signin-error">{error}</div>}
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="signin-footer">
          <span className="restore-link" onClick={() => navigate('/recovery-page')}>Forgot your password? Restore</span>
        </div>
        <button type="submit" className="signin-button">Continue</button>
      </form>
    </div>
  );
};

export default SignInPage;



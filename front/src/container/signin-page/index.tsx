import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './index.css';
import BackButton from '../../component/back-button';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userCredentials = localStorage.getItem('userCredentials');
    if (userCredentials) {
      const { token, user } = JSON.parse(userCredentials);
      login(token, user);
    }
  }, [login, navigate]);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Додайте тут валідацію пароля, якщо потрібно
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

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      login(data.token, data.user);
      navigate('/balance-page');
    } catch (err) {
      if (err instanceof Error && err.message) {
        setError(err.message);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSignIn} className="signin-form">
        <BackButton/>
        <div className='title-div'>
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




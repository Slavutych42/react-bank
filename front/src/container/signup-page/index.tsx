import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './index.css';
import BackButton from '../../component/back-button';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/signup-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Sign up failed');
      }

      const data = await response.json();
      console.log('Response data:', data);
      console.log(data.user.token)
      if (data.user.token) {
        // Передача токена та даних користувача у функцію login
        login(data.user.token, { id: data.user.id, email: data.user.email });
        console.log('Token stored:', data.user.token); // Логування збереженого токена
        localStorage.setItem('userCredentials', JSON.stringify({ email, token: data.user.token }));
        navigate('/signup-confirm-page');
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error('Error during sign up:', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignUp}>
        <BackButton />
        <div className='signup-title'>
          <h2>Sign up</h2>
          <p>Choose a registration method</p>
        </div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className='link-p'>
          Already have an account? <span className='link-a' onClick={() => navigate('/signin-page')}>Sign In</span>
        </p>
        <button className='cont-button' type="submit">Continue</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default SignUpPage;


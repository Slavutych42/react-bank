import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import  AuthContext  from '../../AuthContext'; 
import './index.css'

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/signup-page', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        // Збереження токена та інших даних користувача в контексті
        dispatch({ type: 'LOGIN', payload: data });
        // Перенаправлення на сторінку підтвердження
        navigate('/signup-confirm-page');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignUp}>
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
        /><p className='link-p'>
        Already have an account? <span className='link-a' onClick={() => navigate('/signin-page')}>Sign In</span>
      </p>
        <button type="submit">Continue</button>
      </form>
      {error && <p className="error">{error}</p>}
      
    </div>
  );
};

export default SignUpPage;

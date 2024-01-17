import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './index.css';
import BackButton from '../../component/back-button';

const SignupConfirmPage = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState(''); // Стан для зберігання електронної адреси
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/signup-confirm-page', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail, confirmationCode: code }),
      });
      const data = await response.json();
      if (data.success) {
        login(data.token);
        navigate('/balance-page');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="signup-confirm-container">
      <form onSubmit={handleConfirm}>
        <BackButton />
        <div className='signup-title'>
          <h2>Confirm account</h2>
          <p>Write the code you received</p>
        </div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <label htmlFor="code">Code</label>
        <input
          type="text"
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit" className='btn'>Confirm</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default SignupConfirmPage;




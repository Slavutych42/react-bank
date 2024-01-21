import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import BackButton from '../../component/back-button';

const RecoveryPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/recovery-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.success) {
        navigate('/recovery-confirm-page');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Recovery failed:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="recovery-page">
        
        <form onSubmit={handleSubmit}>
          <BackButton/>
          <div className='title-div'>
            <h1>Recover password</h1>
            <p>Choose a recovery method</p>
          </div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send code</button>
        </form>
    </div>
  );
};

export default RecoveryPage;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './index.css';
import BackButton from '../../component/back-button';

const RecoveryConfirmPage = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const fetchConfirmationCode = async () => {
            try {
                const response = await fetch(`http://localhost:4000/get-confirmation-code?email=${encodeURIComponent(userEmail)}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                const data = await response.json();
                console.log("Відповідь на отримання коду підтвердження:", data); // Логування отриманої відповіді

                if (response.ok) {
                    alert(`Your confirmation code: ${data.confirmationCode}`);
                    setCode(data.confirmationCode);
                } else {
                    setError(data.message || 'Failed to fetch confirmation code.');
                }
            } catch (err) {
                console.error("Помилка при отриманні коду підтвердження:", err); // Логування помилки
                setError('An error occurred while fetching the confirmation code.');
            }
        };

        if (userEmail) {
            fetchConfirmationCode();
        }
    }, [userEmail]);

    const handleConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/signup-confirm-page', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmail, confirmationCode: code })
            });

            const data = await response.json();
            console.log("Відповідь на підтвердження реєстрації:", data); // Логування отриманої відповіді

            if (data.success) {
                login(data.token, data.user);
                navigate('/balance-page');
            } else {
                setError(data.message);
            }
        } catch (err) {
            console.error("Помилка при підтвердженні реєстрації:", err); // Логування помилки
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

export default RecoveryConfirmPage;

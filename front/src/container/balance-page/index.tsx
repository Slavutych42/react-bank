import React from 'react';
import './index.css'; // Make sure you have the correct path to your CSS file
import { useNavigate } from 'react-router-dom';

interface Transaction {
  id: number;
  type: 'Receipt' | 'Sending';
  from: string;
  amount: string;
  time: string;
}

const BalancePage = () => {
  const transactions: Transaction[] = [
    // Додайте дані транзакцій тут, відповідно до інтерфейсу Transaction
  ];
  const navigate = useNavigate();

  const handleNotification = () => {
    navigate('/notifications-page'); 
  };

  const handleSettings = () => {
    navigate('/settings-page'); 
  };

  const handleRecive = () => {
    navigate('/recive-page'); 
  };

  const handleSend = () => {
    navigate('/send-page'); 
  };

  return (
    <div className="balance-page">
      <header className="balance-header">
      <div className="top-bar">
          <button onClick={() => {handleSettings()}} className="left-icon"></button>
          <div className="title">Main wallet</div>
          <button onClick={() => {handleNotification()}} className="right-icon"></button>
        </div>
        <div className="balance-info">
          <span className="balance-amount">$ 100.20</span>
        </div>
        <div className="balance-actions">
          <div className='but-div'>
            <button onClick={() => {handleRecive()}} className="action-button receive-btn"></button>
            <span>Receive</span>
          </div>
          <div className='but-div'>
            <button onClick={() => {handleSend()}} className="action-button send-btn"></button>
            <span>Send</span>
          </div>
        </div>
      </header>
      <div className="transactions-list">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="transaction-item">
            <div className="transaction-icon">SVG</div>
            <div className="transaction-info">
              <div className="transaction-from">{transaction.from}</div>
              <div className="transaction-amount">{transaction.amount}</div>
            </div>
            <div className="transaction-time">{transaction.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BalancePage;


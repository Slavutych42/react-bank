import React, { useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import './index.css';

const SettingsPage = () => {
  const [oldEmail, setOldEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { user, logout, token } = useContext(AuthContext);

  const handleEmailChange = async () => {
    console.log('Current user email:', oldEmail); // Додано
    console.log('Old email:', oldEmail, 'New email:', newEmail);
    if (oldEmail !== user?.email) {
      alert("Current email does not match!");
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/change-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email: oldEmail, newEmail: newEmail })
      });

      const data = await response.json();
      if (data.success) {
        alert('Email updated successfully!');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Failed to update email:', error);
      alert('An error occurred while updating email.');
    }
  };

  const handlePasswordChange = async () => {
    console.log('Updating password for email:', user?.email); // Додано
    console.log('Old password:', oldPassword, 'New password:', newPassword);
    try {
      const response = await fetch('http://localhost:4000/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ oldPassword, newPassword })
      });

      const data = await response.json();
      if (data.success) {
        alert('Password updated successfully!');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Failed to update password:', error);
      alert('An error occurred while updating password.');
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <div className="settings-form">
        <label htmlFor="old-email">Current Email</label>
        <input
          type="email"
          id="old-email"
          value={oldEmail}
          onChange={(e) => setOldEmail(e.target.value)}
        />

        <label htmlFor="new-email">New Email</label>
        <input
          type="email"
          id="new-email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <button onClick={handleEmailChange}>Update Email</button>

        <label htmlFor="old-password">Current Password</label>
        <input
          type="password"
          id="old-password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handlePasswordChange}>Update Password</button>
        
        <button className="logout-button" onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
};

export default SettingsPage;




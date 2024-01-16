import React from 'react';
import safeImage from '../../img1.png';
import { useNavigate } from 'react-router-dom';
import "./index.css";

const WelcomePage = () => {

  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup-page'); 
  };

  const handleSignIn = () => {
    navigate('/signin-page'); 
  };
  return (
    <div className="welcome-container">
      <div>
          <h1>Hello!</h1>
          <p>Welcome to bank app</p>
      </div>
      <img src={safeImage} alt="Bank Safe" className="bank-safe-image" />
      <div>
        <button className="sign-up-btn" onClick={() => {handleSignUp()}}>Sign Up</button>
      <button className="sign-in-btn" onClick={() => {handleSignIn()}}>Sign In</button>
      </div>
</div>
);
};

export default WelcomePage;


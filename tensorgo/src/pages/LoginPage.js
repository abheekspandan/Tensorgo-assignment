import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../styles-login.css'; // Ensure this points to your global or login-specific CSS

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Welcome to Customer Support</h1>
        <p>Your one-stop solution for managing and resolving your queries efficiently.</p>
        <button className="login-button" onClick={() => loginWithRedirect()}>
          Login to Get Started
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

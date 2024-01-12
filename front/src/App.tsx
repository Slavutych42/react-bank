import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContext, { authReducer, initialState } from './AuthContext'
import AuthRoute from './AuthRoute';
import PrivateRoute from './PrivateRoute';
import WellcomePage from './container/welcome-page/index';
import SignupPage from './container/signup-page/index';
import SignupConfirmPage from './container/signup-confirm-page/index';
import SigninPage from './container/signin-page/index';
import RecoveryPage from './container/recovery-page/index';
import RecoveryConfirmPage from './container/recovery-confirm-page/index';
import BalancePage from './container/balance-page/index';
import NotificationsPage from './container/notifications-page/index';
import SettingsPage from './container/settings-page/index';
import RecivePage from './container/recive-page/index';
import SendPage from './container/send-page/index';
import TransactionPage from './container/transaction-page/index';
import ErrorPage from './container/error/index';
import { useReducer } from "react";

function App() {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <AuthRoute>
                <WellcomePage />
              </AuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRoute>
                <SignupPage />
              </AuthRoute>
            }
          />
          <Route
            path="/signup-confirm"
            element={
              <PrivateRoute>
                <SignupConfirmPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <AuthRoute>
                <SigninPage />
              </AuthRoute>
            }
          />
          <Route
            path="/recovery"
            element={
              <AuthRoute>
                <RecoveryPage />
              </AuthRoute>
            }
          />
          <Route
            path="/recovery-confirm"
            element={
              <AuthRoute>
                <RecoveryConfirmPage />
              </AuthRoute>
            }
          />
          <Route
            path="/balance"
            element={
              <PrivateRoute>
                <BalancePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <PrivateRoute>
                <NotificationsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/recive"
            element={
              <PrivateRoute>
                <RecivePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/send"
            element={
              <PrivateRoute>
                <SendPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/transaction/:transactionId"
            element={
              <PrivateRoute>
                <TransactionPage />
              </PrivateRoute>
            }
          />
          <Route path="*" Component={Error} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
  
}

export default App;

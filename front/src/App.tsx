import PrivateRoute from './PrivateRoute';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContext, { useAuth } from './AuthContext'
import AuthRoute from './AuthRoute';
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


function App() {
  const auth = useAuth()
  return (
    <AuthContext.Provider value={auth}>
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
            path="/signup-page"
            element={
              <AuthRoute>
                <SignupPage />
              </AuthRoute>
            }
          />
          <Route
            path="/signup-confirm-page"
            element={
              <PrivateRoute>
                <SignupConfirmPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/signin-page"
            element={
              <AuthRoute>
                <SigninPage />
              </AuthRoute>
            }
          />
          <Route
            path="/recovery-page"
            element={
              <AuthRoute>
                <RecoveryPage />
              </AuthRoute>
            }
          />
          <Route
            path="/recovery-confirm-page"
            element={
              <AuthRoute>
                <RecoveryConfirmPage />
              </AuthRoute>
            }
          />
          <Route
            path="/balance-page"
            element={
              <PrivateRoute>
                <BalancePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/notifications-page"
            element={
              <PrivateRoute>
                <NotificationsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings-page"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/recive-page"
            element={
              <PrivateRoute>
                <RecivePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/send-page"
            element={
              <PrivateRoute>
                <SendPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/transaction-page/:transactionId"
            element={
              <PrivateRoute>
                <TransactionPage />
              </PrivateRoute>
            }
          />
          <Route path="*" Component={ErrorPage} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
  
}

export default App;

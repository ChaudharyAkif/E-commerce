import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Frontend from './Frontend/Frontend';
import AuthRoutes from './Auth/Routes';
import Dashboard from './Dashboard/Index';
import PageNotFound from './Misc/PageNotFound/PageNotFound';
import AdminDashboard from './Dashboard/Admin/admin';
import PaymentForm from './Dashboard/BankPayment/BankPayment';
import PaymentHistory from './Dashboard/BankPayment/PaymentHistory';
import PaymentConfirm from './Dashboard/BankPayment/BankConfirm';

const Index = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Frontend />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
             <Route path="/PaymentForm" element={<PaymentForm />} />
             <Route path="/PaymentConfirm" element={<PaymentConfirm />} />
          <Route path="/history" element={<PaymentHistory />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default Index;

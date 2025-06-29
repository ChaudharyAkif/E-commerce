import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import supabase from '../../config/supabase';

const AdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.email === 'chaudharyakifmnbrands@gmail.com') {
        setIsAdmin(true);
      }

      setLoading(false);
    };

    checkAdmin();
  }, []);

  if (loading) return <div className="text-center mt-10">Checking admin access...</div>;

  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;

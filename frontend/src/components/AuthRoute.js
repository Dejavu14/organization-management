//AuthRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true'; // Memeriksa status login dari sessionStorage

    if (!isLoggedIn) {
        // Jika pengguna belum login, arahkan ke halaman login
        return <Navigate to="/login" replace />;
    }

    // Jika sudah login, tampilkan konten anak (halaman yang dilindungi)
    return children;
};

export default AuthRoute;

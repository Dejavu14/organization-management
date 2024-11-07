//Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [csrfToken, setCsrfToken] = useState('');
    const navigate = useNavigate();

    // Cek apakah user sudah login sebelumnya
    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            navigate('/dashboard'); // Jika sudah login, arahkan ke dashboard
        } else {
            fetchCsrfToken();
        }
    }, [navigate]);

    const fetchCsrfToken = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users/csrf', {
                withCredentials: true,
            });
            setCsrfToken(response.data.token);
            console.log("Fetched CSRF Token from /csrf endpoint:", response.data.token); // Log token yang diterima dari /csrf
        } catch (error) {
            console.error("Error fetching CSRF token:", error);
        }
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8080/api/users/login',
                { username, password },
                {
                    headers: {
                        'X-XSRF-TOKEN': csrfToken,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                console.log("User successfully logged in");
                sessionStorage.setItem('isLoggedIn', 'true');

                // Tambahkan jeda sebelum navigasi untuk memastikan sessionStorage diperbarui
                setTimeout(() => {
                    navigate('/dashboard');
                }, 500); // Delay 500ms
            }
        } catch (error) {
            console.error("Login error:", error);
            alert('Login failed. Please check your credentials.');
        }
    };




    const navigateToRegister = () => {
        navigate('/register');
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <form className="bg-light p-4 rounded shadow" style={{ width: '400px' }} onSubmit={handleLogin}>
                <h2 className="text-center">Login</h2>

                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">Login</button>
                <button type="button" className="btn btn-secondary w-100 mt-2" onClick={navigateToRegister}>
                    Register
                </button>
            </form>
        </div>
    );
}

export default Login;

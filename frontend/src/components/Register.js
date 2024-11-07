//Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/register', {
                username,
                password
            });
            console.log("Register response:", response.data);
            // Setelah registrasi sukses, Anda bisa mengarahkan ke halaman login
            navigate('/login'); // Pindah ke halaman login setelah registrasi
        } catch (error) {
            console.error("Registration error:", error);
            // Anda dapat menampilkan pesan kesalahan di sini
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <form className="bg-light p-4 rounded shadow" style={{ width: '400px' }} onSubmit={handleRegister}>
                <h2 className="text-center">Register</h2>

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

                <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
        </div>
    );
}

export default Register;

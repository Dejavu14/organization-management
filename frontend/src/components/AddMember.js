// src/components/AddMember.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddMember() {
    const [username, setUsername] = useState('');
    const [nama, setNama] = useState('');
    const [jabatan, setJabatan] = useState('');
    const [laporan, setLaporan] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [foto, setFoto] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [csrfToken, setCsrfToken] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/api/users/csrf', { withCredentials: true })
            .then(response => setCsrfToken(response.data.token))
            .catch(() => setError('Gagal mendapatkan token CSRF'));
    }, []);

    const handleFileChange = (event) => setFoto(event.target.files[0]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('nama', nama);
        formData.append('jabatan', jabatan);
        formData.append('laporan', laporan);
        formData.append('email', email);
        formData.append('password', password);
        if (foto) formData.append('foto', foto);
        else {
            setError('Foto harus diupload!');
            return;
        }

        try {
            await axios.post('http://localhost:8080/api/users/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-XSRF-TOKEN': csrfToken,
                },
                withCredentials: true,
            });
            setSuccess('Anggota berhasil ditambahkan!');
            setError('');
            setUsername('');
            setNama('');
            setJabatan('');
            setLaporan('');
            setEmail('');
            setPassword('');
            setFoto(null);
        } catch (error) {
            setError('Gagal menambahkan anggota: ' + (error.response ? error.response.data : error.message));
            setSuccess('');
        }
    };

    const handleBack = () => navigate('/dashboard');

    return (
        <div className="container mt-5">
            <h2 className="text-center">Tambah Anggota Organisasi</h2>
            <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <div className="mb-4 row">
                    <label htmlFor="username" className="col-sm-1 col-form-label">Username</label>
                    <div className="col-sm-3">
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="nama" className="col-sm-1 col-form-label">Nama</label>
                    <div className="col-sm-3">
                        <input
                            type="text"
                            className="form-control"
                            id="nama"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="jabatan" className="col-sm-1 col-form-label">Jabatan</label>
                    <div className="col-sm-3">
                        <input
                            type="text"
                            className="form-control"
                            id="jabatan"
                            value={jabatan}
                            onChange={(e) => setJabatan(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="laporan" className="col-sm-1 col-form-label">Laporan</label>
                    <div className="col-sm-3">
                        <input
                            type="text"
                            className="form-control"
                            id="laporan"
                            value={laporan}
                            onChange={(e) => setLaporan(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="email" className="col-sm-1 col-form-label">Email</label>
                    <div className="col-sm-3">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="password" className="col-sm-1 col-form-label">Password</label>
                    <div className="col-sm-3">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="mb-4 row">
                    <label htmlFor="foto" className="col-sm-1 col-form-label">Upload Foto</label>
                    <div className="col-sm-3">
                        <input
                            type="file"
                            className="form-control"
                            id="foto"
                            onChange={handleFileChange}
                            accept="image/*"
                            required
                        />
                    </div>
                </div>

                <div className="d-flex">
                    <button type="submit" className="btn btn-primary me-2">Submit</button>
                    <button type="button" className="btn btn-secondary" onClick={handleBack}>Kembali</button>
                </div>
            </form>
        </div>
    );
}

export default AddMember;

//MemberDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function MemberDetail() {
    const { id } = useParams();
    const navigate = useNavigate(); // Untuk navigasi
    const [member, setMember] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users/csrf', { withCredentials: true });
                axios.defaults.headers.common['X-XSRF-TOKEN'] = response.data.token;
                axios.defaults.withCredentials = true;
            } catch (error) {
                console.error("Error fetching CSRF token:", error);
            }
        };

        const fetchMember = async () => {
            try {
                await fetchCsrfToken();
                const response = await axios.get(`http://localhost:8080/api/users/${id}`, { withCredentials: true });
                setMember(response.data);
            } catch (error) {
                setError("Gagal mengambil data anggota.");
            }
        };

        fetchMember();
    }, [id]);

    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!member) return <div className="text-center">Loading...</div>;

    return (
        <div className="container mt-5">
            <div className="card mb-3" style={{ maxWidth: '540px' }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            src={member.foto || 'default-image.png'}
                            className="img-fluid rounded-start"
                            alt={member.nama || 'Foto tidak tersedia'}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{member.nama || 'Nama tidak tersedia'}</h5>
                            <p className="card-text">
                                <strong>Username:</strong> {member.username}<br />
                                <strong>Email:</strong> {member.email}<br />
                                <strong>Jabatan:</strong> {member.jabatan}<br />
                                <strong>Laporan:</strong> {member.laporan}
                            </p>
                            <p className="card-text">
                                <small className="text-muted">Terakhir diperbarui beberapa waktu yang lalu</small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <button
                className="btn btn-secondary mt-3"
                onClick={() => navigate('/dashboard')}
            >
                Kembali
            </button>
        </div>
    );
}

export default MemberDetail;

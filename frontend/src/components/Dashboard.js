//Dashboard.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

function Dashboard() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [membersPerPage] = useState(5);

    const navigate = useNavigate();

    // Cek apakah user sudah login atau belum
    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (isLoggedIn !== 'true') {
            navigate('/login'); // Redirect ke login jika belum login
        }
    }, [navigate]);

    const fetchCsrfToken = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users/csrf', { withCredentials: true });
            const csrfToken = response.data.token;
            axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
            axios.defaults.withCredentials = true;
        } catch (error) {
            console.error("Error fetching CSRF token:", error);
        }
    };

    const fetchMembers = useCallback(async () => {
        await fetchCsrfToken();
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/users/all', { withCredentials: true });
            if (response.data && Array.isArray(response.data)) {
                setMembers(response.data);
            } else {
                setError("Data anggota tidak valid.");
            }
        } catch (error) {
            setError("Error fetching members: " + (error.response ? error.response.data : error.message));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMembers();
    }, [fetchMembers]);

    const handleEmptyValue = (value) => value == null ? 'kosong' : value;

    const filteredMembers = members.filter(member =>
        (member.nama && member.nama.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (member.username && member.username.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;
    const currentMembers = filteredMembers.slice(indexOfFirstMember, indexOfLastMember);
    const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Hapus token autentikasi
        sessionStorage.removeItem('isLoggedIn'); // Hapus status login dari sessionStorage
        navigate('/login'); // Redirect ke halaman login setelah logout
    };

    return (
        <div className="container mt-5">

            {/* Top-right Navbar with Profile, Setting, and Logout */}
            <Navbar bg="light" expand="lg" className="mb-3">
                <Container>
                    <Navbar.Brand href="/"></Navbar.Brand>
                    <Nav className="ms-auto">
                        <NavDropdown title="Account" id="basic-nav-dropdown" align="end">
                            <NavDropdown.Item onClick={() => navigate('/dashboard')}>Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => navigate('/dashboard')}>Setting</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>

            <h2 className="text-center">Daftar Anggota Organisasi</h2>

            {/* Navbar with "Tambah" Button and Search */}
            <Navbar bg="light" expand="lg" className="mb-3">
                <Container fluid>
                    <button type="button" className="btn btn-primary" onClick={() => navigate('/add-member')}>Tambah</button>
                    <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Cari anggota..."
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-outline-success me-2" type="button" onClick={() => setCurrentPage(1)}>Search</button>
                    </form>
                </Container>
            </Navbar>

            {loading ? (
                <div className="text-center">
                    <button className="btn btn-primary" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        <span role="status"> Loading...</span>
                    </button>
                </div>
            ) : error ? (
                <div className="text-center text-danger">{error}</div>
            ) : (
                <>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Username</th>
                                <th>Foto</th>
                                <th>Nama</th>
                                <th>Email</th>
                                <th>Jabatan</th>
                                <th>Laporan</th>
                                <th>Keterangan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMembers.length > 0 ? (
                                currentMembers.map((member, index) => (
                                    <tr key={index}>
                                        <td>{indexOfFirstMember + index + 1}</td>
                                        <td>{handleEmptyValue(member.username)}</td>
                                        <td>
                                            <img
                                                src={member.foto || 'default-image.png'}
                                                alt={handleEmptyValue(member.nama)}
                                                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                                            />
                                        </td>
                                        <td>{handleEmptyValue(member.nama)}</td>
                                        <td>{handleEmptyValue(member.email)}</td>
                                        <td>{handleEmptyValue(member.jabatan)}</td>
                                        <td>{handleEmptyValue(member.laporan)}</td>
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-info btn-sm"
                                                onClick={() => navigate(`/member-detail/${member.id}`)}
                                            >
                                                Detail
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center">Tidak ada data anggota ditemukan.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Custom Pagination */}
                    <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
                            </li>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <li
                                    key={index + 1}
                                    className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => paginate(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
                            </li>
                        </ul>
                    </nav>
                </>
            )}
        </div>
    );
}

export default Dashboard;

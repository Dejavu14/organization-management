//App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import AuthRoute from './components/AuthRoute';  // Import AuthRoute untuk proteksi
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import AddMember from './components/AddMember';
import MemberDetail from './components/MemberDetail';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} /> {/* Halaman default ke login */}

                {/* Rute yang dilindungi */}
                <Route
                    path="/dashboard"
                    element={
                        <AuthRoute>
                            <Dashboard />
                        </AuthRoute>
                    }
                />
                <Route
                    path="/add-member"
                    element={
                        <AuthRoute>
                            <AddMember />
                        </AuthRoute>
                    }
                />
                <Route
                    path="/member-detail/:id"
                    element={
                        <AuthRoute>
                            <MemberDetail />
                        </AuthRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;

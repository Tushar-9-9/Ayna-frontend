import React from 'react';

const Logout = ({ className }) => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <button className={className} onClick={handleLogout}>
            {}
            <span className="visually-hidden">Logout</span>
        </button>
    );
};

export default Logout;

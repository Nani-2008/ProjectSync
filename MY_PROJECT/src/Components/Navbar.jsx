import React from 'react';

const Navbar = ({ user, onLogout }) => (
  <nav className="navbar">
    <div className="navbar-container">
      <div className="navbar-brand">
        <span className="navbar-logo">📚</span>
        <h1>ProjectSync</h1>
      </div>
      <div className="navbar-right">
        <div className="user-info">
          <span className="user-avatar">{user?.avatar}</span>
          <div className="user-details">
            <p className="user-name">{user?.name}</p>
            <p className="user-role">{user?.role === 'teacher' ? 'Instructor' : 'Student'}</p>
          </div>
        </div>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
    </div>
  </nav>
);

export default Navbar;

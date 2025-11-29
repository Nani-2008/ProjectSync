import React, { useState } from 'react';
import Button from './Button.jsx';

const MOCK_GROUPS = [
  { id: 1, name: 'Team Alpha', members: [2, 3], status: 'active', createdDate: '2025-11-01' },
  { id: 2, name: 'Team Beta', members: [4, 5], status: 'active', createdDate: '2025-11-02' },
  { id: 3, name: 'Team Gamma', members: [2, 4], status: 'active', createdDate: '2025-11-03' },
];

const MOCK_PROJECTS = [
  { id: 1, name: 'E-Commerce Platform', description: 'Full-stack e-commerce app', groupId: 1, dueDate: '2025-12-15', status: 'in-progress', progress: 65 },
  { id: 2, name: 'Social Media App', description: 'Real-time social platform', groupId: 2, dueDate: '2025-12-20', status: 'pending', progress: 20 },
  { id: 3, name: 'Task Management', description: 'Collaborative task tool', groupId: 3, dueDate: '2025-12-10', status: 'in-progress', progress: 45 },
];

const AdminDashboard = ({ user, groups, projects, onNavigate }) => {
  const stats = [
    { label: 'Total Groups', value: groups.length, icon: '👥', color: 'coffee' },
    { label: 'Active Projects', value: projects.length, icon: '📋', color: 'accent' },
    { label: 'Pending Submissions', value: 3, icon: '📝', color: 'dark' },
  ];

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Dashboard Overview</h2>
        <p>Welcome back, {user.name}</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className={`stat-card stat-${stat.color}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <p className="stat-label">{stat.label}</p>
              <h3 className="stat-value">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="action-buttons">
        <Button variant="primary" onClick={() => onNavigate('createGroup')}>
          + Create Group
        </Button>
        <Button variant="secondary" onClick={() => onNavigate('createProject')}>
          + Create Project
        </Button>
      </div>

      <div className="section">
        <h3>Groups ({groups.length})</h3>
        <div className="groups-list">
          {groups.map(group => (
            <div key={group.id} className="group-item">
              <div className="group-info">
                <h4>{group.name}</h4>
                <p>{group.members.length} members • Created {group.createdDate}</p>
              </div>
              <span className={`status-badge status-${group.status}`}>{group.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h3>Projects ({projects.length})</h3>
        <div className="projects-list">
          {projects.map(project => (
            <div key={project.id} className="project-item">
              <div className="project-info">
                <h4>{project.name}</h4>
                <p>{project.description}</p>
                <p className="project-due">Due: {project.dueDate}</p>
              </div>
              <span className={`status-badge status-${project.status}`}>{project.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

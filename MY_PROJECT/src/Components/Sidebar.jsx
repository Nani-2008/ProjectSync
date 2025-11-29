import React from 'react';

const Sidebar = ({ role, activeTab, onTabChange }) => {
  const teacherMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'groups', label: 'Groups', icon: '👥' },
    { id: 'projects', label: 'Projects', icon: '📋' },
    { id: 'submissions', label: 'Submissions', icon: '📝' },
  ];
  const studentMenu = [
    { id: 'dashboard', label: 'Dashboard', icon: '🎯' },
    { id: 'tasks', label: 'My Tasks', icon: '✓' },
    { id: 'milestones', label: 'Milestones', icon: '🎖️' },
    { id: 'collaboration', label: 'Collaboration', icon: '🤝' },
    { id: 'projects', label: 'Projects', icon: '📁' },
  ];
  const menu = role === 'teacher' ? teacherMenu : studentMenu;
  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        {menu.map(item => (
          <li key={item.id}>
            <button
              className={`sidebar-link ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => onTabChange(item.id)}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;

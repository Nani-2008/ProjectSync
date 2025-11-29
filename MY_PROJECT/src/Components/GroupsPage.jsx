import React from 'react';
import Button from './Button.jsx';

const GroupsPage = ({ groups, onDeleteGroup, onViewGroup }) => {
  const handleDelete = (id, name) => {
    const confirmed = window.confirm(`Delete group "${name}"? This cannot be undone.`);
    if (confirmed && onDeleteGroup) {
      onDeleteGroup(id);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Groups</h2>
          <p className="page-description">
            View and manage all student groups participating in projects.
          </p>
        </div>
      </div>

      <div className="simple-list">
        {groups.map(group => (
          <div key={group.id} className="item-card">
            <div className="item-header">
              <div>
                <h3 className="item-title">{group.name}</h3>
                <p className="item-subtitle">Group ID: {group.id}</p>
              </div>
              <span className={`status-badge status-${group.status}`}>
                {group.status}
              </span>
            </div>

            <div className="item-meta">
              <span className="meta-pill">
                👥 {group.members?.length || 0} members
              </span>
              <span className="meta-pill">
                📅 Created: {group.createdDate}
              </span>
            </div>

            <div className="item-footer">
  <span className="hint">
    Groups can be edited or deleted by the instructor.
  </span>
  <div style={{ display: 'flex', gap: '8px' }}>
    <Button
      variant="outline"
      size="sm"
      onClick={() => onViewGroup(group.id)}
    >
      View
    </Button>

    <Button
      variant="secondary"
      size="sm"
      onClick={() => handleDelete(group.id, group.name)}
    >
      Delete
    </Button>
  </div>
</div>

          </div>
        ))}
        {groups.length === 0 && (
          <p className="empty-state">No groups yet. Create one from the dashboard.</p>
        )}
      </div>
    </div>
  );
};

export default GroupsPage;

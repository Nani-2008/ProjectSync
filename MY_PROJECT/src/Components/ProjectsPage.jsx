import React from 'react';
import Button from './Button.jsx';

const ProjectsPage = ({ projects, onDeleteProject, onOpenProject }) => {
  const handleDelete = (id, name) => {
    const confirmed = window.confirm(`Delete project "${name}"? This cannot be undone.`);
    if (confirmed && onDeleteProject) {
      onDeleteProject(id);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Projects</h2>
          <p className="page-description">
            Overview of all assigned group projects, their status, and deadlines.
          </p>
        </div>
      </div>

      <div className="simple-list">
        {projects.map(project => (
          <div key={project.id} className="item-card">
            <div className="item-header">
              <div>
                <h3 className="item-title">{project.name}</h3>
                <p className="item-subtitle">{project.description}</p>
              </div>
              <span className={`status-badge status-${project.status}`}>
                {project.status}
              </span>
            </div>

            <div className="item-meta">
              <span className="meta-pill meta-pill--primary">
                📈 Progress: {project.progress}%
              </span>
              <span className="meta-pill">
                📅 Due: {project.dueDate || 'Not set'}
              </span>
              {project.groupId && (
                <span className="meta-pill meta-pill--warning">
                  Group #{project.groupId}
                </span>
              )}
            </div>

            <div className="item-footer">
              <span className="hint">
                Deleting a project removes it from all views.
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOpenProject && onOpenProject(project.id)}
                >
                  Open
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDelete(project.id, project.name)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <p className="empty-state">
            No projects yet. Create one from the dashboard.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;

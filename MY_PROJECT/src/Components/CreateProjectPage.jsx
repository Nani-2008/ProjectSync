import React, { useState } from 'react';
import Button from './Button.jsx';

const CreateProjectPage = ({ onBack, onCreateProject }) => {
  const [name, setName] = useState('');
  const [groupId, setGroupId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreateProject({
      name,
      description: desc,
      groupId,
      dueDate,
    });
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Create New Project</h2>
          <p className="page-description">
            Configure a new group project with deadline and group assignment.
          </p>
        </div>
        <div className="page-toolbar">
          <button className="btn btn--outline" type="button" onClick={onBack}>
            ← Back to Dashboard
          </button>
        </div>
      </div>

      <form className="page-form" onSubmit={handleSubmit}>
        <div className="page-form-row">
          <div className="form-group">
            <label className="form-label">Project Name</label>
            <input
              className="form-input"
              type="text"
              placeholder="e.g. Smart Attendance System"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Assigned Group ID</label>
            <input
              className="form-input"
              type="number"
              min="1"
              placeholder="e.g. 1"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Due Date</label>
            <input
              className="form-input"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-input"
              rows="4"
              placeholder="Describe the project scope, technologies, and expectations..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        </div>

        <div className="page-form-actions">
          <Button variant="secondary" type="button" onClick={onBack}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Create Project
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectPage;

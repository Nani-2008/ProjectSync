import React, { useState } from 'react';
import Button from './Button.jsx';

const CreateGroupPage = ({ onBack, onCreateGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupName.trim()) return;
    onCreateGroup({ name: groupName, note });
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Create New Group</h2>
          <p className="page-description">
            Define a new project group and assign students later.
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
            <label className="form-label">Group Name</label>
            <input
              className="form-input"
              type="text"
              placeholder="e.g. Team Phoenix"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Notes (optional)</label>
            <textarea
              className="form-input"
              rows="3"
              placeholder="Add any initial instructions or description..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>
        <div className="page-form-actions">
          <Button variant="secondary" type="button" onClick={onBack}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Create Group
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateGroupPage;

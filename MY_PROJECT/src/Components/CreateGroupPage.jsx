import React, { useState } from 'react';
import Button from './Button.jsx';

const CreateGroupPage = ({ onBack, onCreateGroup, students = [] }) => {
  const [groupName, setGroupName] = useState('');
  const [note, setNote] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);

  const toggleMember = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupName.trim()) return;

    onCreateGroup({
      name: groupName,
      note,
      memberIds: selectedMembers,   // ⭐ pass selected student IDs
    });
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Create New Group</h2>
          <p className="page-description">
            Define a new project group and assign student members.
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

        {/* ⭐ Member selection */}
        <div className="form-group">
          <label className="form-label">Assign Members</label>
          {students.length === 0 ? (
            <p className="empty-state">No students available to assign.</p>
          ) : (
            <div className="members-list">
              {students.map((student) => {
                const checked = selectedMembers.includes(student.id);
                return (
                  <label
                    key={student.id}
                    className={`member-card`}
                    style={{ cursor: 'pointer' }}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleMember(student.id)}
                      style={{ marginRight: 8 }}
                    />
                    <span className="member-avatar">{student.avatar}</span>
                    <div className="member-info">
                      <p className="member-name">{student.name}</p>
                      <p className="member-role">Year {student.year}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          )}
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

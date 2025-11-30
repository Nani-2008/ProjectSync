import React, { useState, useEffect } from 'react';

// Seed data used ONLY if there is nothing in localStorage yet
const MOCK_DISCUSSIONS = [
  {
    id: 1,
    groupId: 1,
    userId: 2,
    userName: 'Priya Singh',
    avatar: '👩‍🎓',
    message: "Let's start with database design tomorrow",
    timestamp: '2025-11-28 10:30',
  },
  {
    id: 2,
    groupId: 1,
    userId: 3,
    userName: 'Arjun Patel',
    avatar: '👨‍🎓',
    message: "Great! I'll prepare the schema draft",
    timestamp: '2025-11-28 11:15',
  },
];

const MOCK_FILES = [
  {
    id: 1,
    groupId: 1,
    name: 'database-schema.sql',
    uploadedBy: 'Arjun Patel',
    uploadDate: '2025-11-28',
    size: '45 KB',
  },
  {
    id: 2,
    groupId: 1,
    name: 'project-proposal.pdf',
    uploadedBy: 'Priya Singh',
    uploadDate: '2025-11-27',
    size: '2.3 MB',
  },
];

const MOCK_ACTIVITIES = [
  {
    id: 1,
    groupId: 1,
    type: 'task_created',
    description: 'Database Schema Design task created',
    timestamp: '2025-11-25',
    icon: '✅',
  },
  {
    id: 2,
    groupId: 1,
    type: 'file_uploaded',
    description: 'database-schema.sql uploaded',
    timestamp: '2025-11-28',
    icon: '📁',
  },
  {
    id: 3,
    groupId: 1,
    type: 'discussion',
    description: 'New discussion posted',
    timestamp: '2025-11-28',
    icon: '💬',
  },
];

const STORAGE_KEY = 'projectsync_discussions';

const GroupCollaboration = ({ groupId, user, groups = [] }) => {
  const [activeTab, setActiveTab] = useState('discussion');

  const [currentGroupId, setCurrentGroupId] = useState(groupId || null);

  const [discussionsByGroup, setDiscussionsByGroup] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    const initial = {};
    MOCK_DISCUSSIONS.forEach(msg => {
      if (!initial[msg.groupId]) initial[msg.groupId] = [];
      initial[msg.groupId].push(msg);
    });
    return initial;
  });

  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (groupId) {
      setCurrentGroupId(groupId);
    }
  }, [groupId]);

  const isTeacher = user.role === 'teacher';

  const availableGroups = isTeacher
    ? groups
    : groups.filter(g => g.members && g.members.includes(user.id));

  useEffect(() => {
    if (!currentGroupId && availableGroups.length > 0) {
      setCurrentGroupId(availableGroups[0].id);
    }
  }, [availableGroups, currentGroupId]);

  const currentGroup =
    availableGroups.find(g => g.id === currentGroupId) || availableGroups[0];

  const currentGroupIdSafe = currentGroup ? currentGroup.id : null;

  const discussions = currentGroupIdSafe
    ? discussionsByGroup[currentGroupIdSafe] || []
    : [];

  const files = currentGroupIdSafe
    ? MOCK_FILES.filter(f => f.groupId === currentGroupIdSafe)
    : [];

  const activities = currentGroupIdSafe
    ? MOCK_ACTIVITIES.filter(a => a.groupId === currentGroupIdSafe)
    : [];

  const handlePostMessage = () => {
    if (!newMessage.trim() || !currentGroupIdSafe) return;

    const newDiscussion = {
      id: Date.now(),
      groupId: currentGroupIdSafe,
      userId: user.id,
      userName: user.name,
      avatar: user.avatar,
      message: newMessage.trim(),
      timestamp: new Date().toLocaleString(),
    };

    setDiscussionsByGroup(prev => {
      const updated = {
        ...prev,
        [currentGroupIdSafe]: [
          ...(prev[currentGroupIdSafe] || []),
          newDiscussion,
        ],
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    setNewMessage('');
  };

  if (!availableGroups.length) {
    return (
      <div className="group-collaboration">
        <div className="collaboration-header">
          <h2>Group Collaboration</h2>
          <p>
            {isTeacher
              ? 'No groups created yet. Create a group from the Dashboard.'
              : 'You are not assigned to any group yet. Please contact your instructor.'}
          </p>
        </div>
      </div>
    );
  }

  const handleGroupChange = (e) => {
    const newId = Number(e.target.value);
    setCurrentGroupId(newId);
  };

  return (
    <div className="group-collaboration">
      <div className="collaboration-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center' }}>
          <div>
            <h2>Group Collaboration</h2>
            <p>
              {currentGroup
                ? `${currentGroup.name} • Group #${currentGroup.id}`
                : 'Select a group to start collaborating'}
            </p>
          </div>

          {availableGroups.length > 1 && (
            <div>
              <label className="form-label" style={{ marginBottom: 4 }}>
                {isTeacher ? 'View group:' : 'My groups:'}
              </label>
              <select
                className="form-control"
                value={currentGroupIdSafe || ''}
                onChange={handleGroupChange}
              >
                {availableGroups.map(g => (
                  <option key={g.id} value={g.id}>
                    {g.name} (#{g.id})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="collaboration-tabs">
        <button
          className={`tab-btn ${activeTab === 'discussion' ? 'active' : ''}`}
          onClick={() => setActiveTab('discussion')}
        >
          💬 Discussion
        </button>
        <button
          className={`tab-btn ${activeTab === 'files' ? 'active' : ''}`}
          onClick={() => setActiveTab('files')}
        >
          📁 Files
        </button>
        <button
          className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
          onClick={() => setActiveTab('activity')}
        >
          📊 Activity
        </button>
      </div>

      <div className="collaboration-content">
        {activeTab === 'discussion' && (
          <div className="discussion-panel">
            <div className="discussion-list">
              {discussions.length === 0 && (
                <p className="empty-state">
                  No messages yet in this group. Start the conversation!
                </p>
              )}

              {discussions.map(discussion => (
                <div key={discussion.id} className="discussion-item">
                  <div className="discussion-avatar">
                    {discussion.avatar}
                  </div>
                  <div className="discussion-content">
                    <div className="discussion-header">
                      <strong>{discussion.userName}</strong>
                      <span className="discussion-time">
                        {discussion.timestamp}
                      </span>
                    </div>
                    <p className="discussion-message">{discussion.message}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="discussion-input">
              <textarea
                className="message-input"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows="3"
              />
              <button
                className="send-btn"
                onClick={handlePostMessage}
                disabled={!newMessage.trim() || !currentGroupIdSafe}
              >
                Send Message
              </button>
            </div>
          </div>
        )}

        {activeTab === 'files' && (
          <div className="file-upload">
            <div className="upload-header">
              <h3>Shared Files</h3>
              <button className="upload-btn">+ Upload File</button>
            </div>
            <div className="files-list">
              {files.length === 0 && (
                <p className="empty-state">No files shared yet.</p>
              )}
              {files.map(file => (
                <div key={file.id} className="file-item">
                  <span className="file-icon">📄</span>
                  <div className="file-details">
                    <p className="file-name">{file.name}</p>
                    <p className="file-meta">
                      {file.uploadedBy} • {file.uploadDate} • {file.size}
                    </p>
                  </div>
                  <button className="download-btn">⬇️</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="activity-timeline">
            <h3>Group Activity</h3>
            <div className="timeline">
              {activities.length === 0 && (
                <p className="empty-state">No activity recorded yet.</p>
              )}
              {activities.map(activity => (
                <div key={activity.id} className="timeline-item">
                  <div className="timeline-dot">{activity.icon}</div>
                  <div className="timeline-content">
                    <p className="timeline-description">
                      {activity.description}
                    </p>
                    <p className="timeline-time">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupCollaboration;

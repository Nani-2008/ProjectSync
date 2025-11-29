import React, { useState, useEffect } from 'react';

const MOCK_DISCUSSIONS = [
  { id: 1, groupId: 1, userId: 2, userName: 'Priya Singh', avatar: '👩‍🎓', message: 'Let\'s start with database design tomorrow', timestamp: '2025-11-28 10:30' },
  { id: 2, groupId: 1, userId: 3, userName: 'Arjun Patel', avatar: '👨‍🎓', message: 'Great! I\'ll prepare the schema draft', timestamp: '2025-11-28 11:15' },
];

const MOCK_FILES = [
  { id: 1, groupId: 1, name: 'database-schema.sql', uploadedBy: 'Arjun Patel', uploadDate: '2025-11-28', size: '45 KB' },
  { id: 2, groupId: 1, name: 'project-proposal.pdf', uploadedBy: 'Priya Singh', uploadDate: '2025-11-27', size: '2.3 MB' },
];

const MOCK_ACTIVITIES = [
  { id: 1, groupId: 1, type: 'task_created', description: 'Database Schema Design task created', timestamp: '2025-11-25', icon: '✅' },
  { id: 2, groupId: 1, type: 'file_uploaded', description: 'database-schema.sql uploaded', timestamp: '2025-11-28', icon: '📁' },
  { id: 3, groupId: 1, type: 'discussion', description: 'New discussion posted', timestamp: '2025-11-28', icon: '💬' },
];

const GroupCollaboration = ({ groupId, user }) => {
  const [activeTab, setActiveTab] = useState('discussion');
  const [discussions, setDiscussions] = useState(
    MOCK_DISCUSSIONS.filter(d => d.groupId === groupId)
  );
  const [newMessage, setNewMessage] = useState('');
  const [files, setFiles] = useState(
    MOCK_FILES.filter(f => f.groupId === groupId)
  );
  const [activities, setActivities] = useState(
    MOCK_ACTIVITIES.filter(a => a.groupId === groupId)
  );

  // 🔁 Re-load data whenever groupId changes (when teacher/student views another group)
  useEffect(() => {
    setDiscussions(MOCK_DISCUSSIONS.filter(d => d.groupId === groupId));
    setFiles(MOCK_FILES.filter(f => f.groupId === groupId));
    setActivities(MOCK_ACTIVITIES.filter(a => a.groupId === groupId));
    setNewMessage('');
  }, [groupId]);

  const handlePostMessage = () => {
    if (newMessage.trim()) {
      const discussion = {
        id: discussions.length + 1,
        groupId,
        userId: user.id,
        userName: user.name,
        avatar: user.avatar,
        message: newMessage,
        timestamp: new Date().toLocaleString(),
      };
      setDiscussions(prev => [...prev, discussion]);
      setNewMessage('');
    }
  };

  return (
    <div className="group-collaboration">
      <div className="collaboration-header">
        <h2>Group Collaboration</h2>
        <p>Group #{groupId} • Shared workspace for discussions, files and activity</p>
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
                  No messages yet. Start the conversation for this group.
                </p>
              )}
              {discussions.map(discussion => (
                <div key={discussion.id} className="discussion-item">
                  <div className="discussion-avatar">{discussion.avatar}</div>
                  <div className="discussion-content">
                    <div className="discussion-header">
                      <strong>{discussion.userName}</strong>
                      <span className="discussion-time">{discussion.timestamp}</span>
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
                disabled={!newMessage.trim()}
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
                <p className="empty-state">
                  No files uploaded yet for this group.
                </p>
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
                <p className="empty-state">
                  No activity logged yet for this group.
                </p>
              )}
              {activities.map(activity => (
                <div key={activity.id} className="timeline-item">
                  <div className="timeline-dot">{activity.icon}</div>
                  <div className="timeline-content">
                    <p className="timeline-description">{activity.description}</p>
                    <p className="timeline-time">{activity.timestamp}</p>
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

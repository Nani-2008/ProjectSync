import React from 'react';
import TaskCard from './TaskCard.jsx';
import ProgressBar from './ProgressBar.jsx';

const MOCK_TASKS = [
  { id: 1, projectId: 1, name: 'Database Design', status: 'completed', priority: 'high', dueDate: '2025-11-30', assignedTo: 2, description: 'Design database schema' },
  { id: 2, projectId: 1, name: 'Frontend UI', status: 'in-progress', priority: 'high', dueDate: '2025-12-05', assignedTo: 3, description: 'Create React components' },
  { id: 3, projectId: 1, name: 'Backend API', status: 'to-do', priority: 'high', dueDate: '2025-12-10', assignedTo: 2, description: 'Develop REST API' },
];

const MOCK_MILESTONES = [
  { id: 1, projectId: 1, name: 'Phase 1: Planning & Design', progress: 100, dueDate: '2025-11-30', status: 'completed' },
  { id: 2, projectId: 1, name: 'Phase 2: Development', progress: 65, dueDate: '2025-12-15', status: 'in-progress' },
  { id: 3, projectId: 1, name: 'Phase 3: Testing', progress: 0, dueDate: '2025-12-20', status: 'pending' },
];

const MOCK_USERS = [
  { id: 2, name: 'Priya Singh', email: 'student@uni.com', role: 'student', avatar: '👩‍🎓', year: 2 },
  { id: 3, name: 'Arjun Patel', email: 'arjun@uni.com', role: 'student', avatar: '👨‍🎓', year: 2 },
  { id: 4, name: 'Neha Sharma', email: 'neha@uni.com', role: 'student', avatar: '👩‍💻', year: 2 },
];

const StudentDashboard = ({ user, mode }) => {
  const userTasks = MOCK_TASKS.filter(task => task.assignedTo === user.id);
  const userMilestones = MOCK_MILESTONES;
  const groupMembers = MOCK_USERS.filter(u => u.id !== user.id).slice(0, 3);

  return (
    <div className="student-dashboard">
      <div className="dashboard-header">
        <h2>
          {mode === 'dashboard' && 'My Dashboard'}
          {mode === 'tasks' && 'My Tasks'}
          {mode === 'milestones' && 'Project Milestones'}
        </h2>

        <p>Welcome back, {user.name}!</p>
      </div>

      {/* DASHBOARD MODE */}
      {mode === 'dashboard' && (
        <>
          <div className="quick-stats">
            <div className="stat-box">
              <span className="stat-icon">📋</span>
              <div>
                <p className="stat-label">My Tasks</p>
                <h3>{userTasks.length}</h3>
              </div>
            </div>

            <div className="stat-box">
              <span className="stat-icon">🎖️</span>
              <div>
                <p className="stat-label">Milestones</p>
                <h3>{userMilestones.length}</h3>
              </div>
            </div>

            <div className="stat-box">
              <span className="stat-icon">✓</span>
              <div>
                <p className="stat-label">Completed</p>
                <h3>{userTasks.filter(t => t.status === 'completed').length}</h3>
              </div>
            </div>
          </div>

          <div className="section">
            <h3>Group Members</h3>
            <div className="members-list">
              {groupMembers.map(member => (
                <div key={member.id} className="member-card">
                  <span className="member-avatar">{member.avatar}</span>
                  <div className="member-info">
                    <p className="member-name">{member.name}</p>
                    <p className="member-role">Year {member.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* TASKS MODE */}
      {mode === 'tasks' && (
        <div className="section">
          <h3>Assigned Tasks</h3>
          <div className="task-list">
            {userTasks.length > 0 ?
              userTasks.map(task => <TaskCard key={task.id} task={task} />) :
              <p className="empty-state">No tasks assigned yet</p>
            }
          </div>
        </div>
      )}

      {/* MILESTONES MODE */}
      {mode === 'milestones' && (
        <div className="section">
          <h3>Project Milestones</h3>
          <div className="milestones-list">
            {userMilestones.map(milestone => (
              <div key={milestone.id} className="milestone-item">
                <div className="milestone-header">
                  <h4>{milestone.name}</h4>
                  <span className={`status-badge status-${milestone.status}`}>
                    {milestone.status}
                  </span>
                </div>
                <ProgressBar progress={milestone.progress} />
                <p className="milestone-due">Due: {milestone.dueDate}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default StudentDashboard;

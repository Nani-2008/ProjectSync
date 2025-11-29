import React, { useState } from 'react';
import ProgressBar from './ProgressBar.jsx';

const MOCK_PROJECTS = [
  { id: 1, name: 'E-Commerce Platform', description: 'Full-stack e-commerce app', groupId: 1, dueDate: '2025-12-15', status: 'in-progress', progress: 65 },
  { id: 2, name: 'Social Media App', description: 'Real-time social platform', groupId: 2, dueDate: '2025-12-20', status: 'pending', progress: 20 },
  { id: 3, name: 'Task Management', description: 'Collaborative task tool', groupId: 3, dueDate: '2025-12-10', status: 'in-progress', progress: 45 },
];

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
  { id: 2, name: 'Priya Singh', avatar: '👩‍🎓', year: 2, role: 'student' },
  { id: 3, name: 'Arjun Patel', avatar: '👨‍🎓', year: 2, role: 'student' },
  { id: 4, name: 'Neha Sharma', avatar: '👩‍💻', year: 2, role: 'student' },
  { id: 5, name: 'Vikram Desai', avatar: '👨‍💻', year: 2, role: 'student' },
];

const ProjectDetails = ({ projectId, user }) => {
  const [activeView, setActiveView] = useState('timeline');
  const project = MOCK_PROJECTS.find(p => p.id === projectId) || MOCK_PROJECTS[0];
  const projectTasks = MOCK_TASKS.filter(t => t.projectId === projectId);
  const projectMilestones = MOCK_MILESTONES.filter(m => m.projectId === projectId);
  const [submission, setSubmission] = useState({ status: 'not-submitted', file: null });

  return (
    <div className="project-details">
      <div className="project-header">
        <h2>{project.name}</h2>
        <p>{project.description}</p>
        <div className="project-meta">
          <span>Due: {project.dueDate}</span>
          <span>Status: {project.status}</span>
          <span>Progress: {project.progress}%</span>
        </div>
      </div>
      <div className="view-tabs">
        <button className={`tab ${activeView === 'timeline' ? 'active' : ''}`} onClick={() => setActiveView('timeline')}>📊 Timeline</button>
        <button className={`tab ${activeView === 'kanban' ? 'active' : ''}`} onClick={() => setActiveView('kanban')}>📋 Tasks</button>
        <button className={`tab ${activeView === 'members' ? 'active' : ''}`} onClick={() => setActiveView('members')}>👥 Members</button>
        <button className={`tab ${activeView === 'submission' ? 'active' : ''}`} onClick={() => setActiveView('submission')}>📝 Submit</button>
      </div>
      <div className="project-content">
        {activeView === 'timeline' && (
          <div className="timeline-view">
            <h3>Project Timeline</h3>
            <div className="timeline-container">
              {projectMilestones.map(milestone => (
                <div key={milestone.id} className="timeline-phase">
                  <div className="phase-header">
                    <h4>{milestone.name}</h4>
                    <span className={`phase-status status-${milestone.status}`}>{milestone.status}</span>
                  </div>
                  <ProgressBar progress={milestone.progress} label={`${milestone.progress}% Complete`} />
                  <p className="phase-date">Due: {milestone.dueDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeView === 'kanban' && (
          <div className="kanban-board">
            <h3>Task Board</h3>
            <div className="kanban-columns">
              {['to-do', 'in-progress', 'completed'].map(status => (
                <div key={status} className="kanban-column">
                  <div className="column-header">
                    <h4>{status === 'to-do' ? '📌 To Do' : status === 'in-progress' ? '⏳ In Progress' : '✅ Completed'}</h4>
                    <span className="task-count">{projectTasks.filter(t => t.status === status).length}</span>
                  </div>
                  <div className="column-tasks">
                    {projectTasks.filter(t => t.status === status).map(task => (
                      <div key={task.id} className="kanban-card">
                        <h5>{task.name}</h5>
                        <p>{task.description}</p>
                        <div className="card-footer">
                          <span className="priority">{task.priority}</span>
                          <span className="due">{task.dueDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeView === 'members' && (
          <div className="members-section">
            <h3>Project Members</h3>
            <div className="members-grid">
              {MOCK_USERS.filter(u => u.role === 'student').slice(0, 4).map(member => (
                <div key={member.id} className="member-profile">
                  <div className="member-avatar-large">{member.avatar}</div>
                  <div className="member-details">
                    <h5>{member.name}</h5>
                    <p>Year {member.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeView === 'submission' && (
          <div className="submission-section">
            <h3>Project Submission</h3>
            {submission.status === 'submitted' ? (
              <div className="submission-success">
                <p className="success-icon">✓</p>
                <p><strong>Submitted Successfully</strong></p>
                <p className="file-info">File: {submission.file?.name || 'project.zip'}</p>
              </div>
            ) : (
              <div className="submission-form">
                <div className="upload-box">
                  <p>📁 Upload your project files</p>
                  <input type="file" onChange={(e) => setSubmission({ ...submission, file: e.target.files[0] })} className="file-input" />
                  {submission.file && <p className="file-name">{submission.file.name}</p>}
                </div>
                <button className="submit-btn" onClick={() => setSubmission({ ...submission, status: 'submitted' })} disabled={!submission.file}>
                  Submit Project
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;

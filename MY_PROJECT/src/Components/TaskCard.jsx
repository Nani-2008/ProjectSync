import React from 'react';

const TaskCard = ({ task, onClick }) => {
  const getPriorityColor = (priority) => {
    const colors = { high: '#C7A17A', medium: '#8B6F47', low: '#D4AF9F' };
    return colors[priority] || '#C7A17A';
  };
  const getStatusBadge = (status) => {
    const statusMap = { completed: '✓ Completed', 'in-progress': '◐ In Progress', 'to-do': '○ To Do' };
    return statusMap[status] || status;
  };
  return (
    <div className="task-card" onClick={onClick}>
      <div className="task-header">
        <h4>{task.name}</h4>
        <span className="task-priority" style={{ backgroundColor: getPriorityColor(task.priority) }}>
          {task.priority.toUpperCase()}
        </span>
      </div>
      <p className="task-description">{task.description}</p>
      <div className="task-footer">
        <span className={`task-status status-${task.status}`}>{getStatusBadge(task.status)}</span>
        <span className="task-due">{task.dueDate}</span>
      </div>
    </div>
  );
};

export default TaskCard;

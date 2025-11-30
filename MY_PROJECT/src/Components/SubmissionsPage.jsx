import React, { useState, useEffect } from 'react';
import Button from './Button.jsx';

const SubmissionsPage = () => {
  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem("projectsync_submissions");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, group: 'Team Alpha', project: 'E-Commerce Platform', date: '2025-12-12', status: 'pending' },
          { id: 2, group: 'Team Beta', project: 'Social Media App', date: '2025-12-10', status: 'pending' },
        ];
  });

  useEffect(() => {
    localStorage.setItem("projectsync_submissions", JSON.stringify(submissions));
  }, [submissions]);

  const handleMarkReviewed = (id) => {
    setSubmissions(prev =>
      prev.map(sub =>
        sub.id === id
          ? { ...sub, status: "reviewed" }
          : sub
      )
    );
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Submissions</h2>
          <p className="page-description">
            Review project submissions from student groups and track evaluation status.
          </p>
        </div>
      </div>

      <table className="submissions-table">
        <thead>
          <tr>
            <th>Group</th>
            <th>Project</th>
            <th>Submitted On</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {submissions.map(sub => (
            <tr key={sub.id}>
              <td>{sub.group}</td>
              <td>{sub.project}</td>
              <td>{sub.date}</td>

              <td>
                <span
                  className={
                    sub.status === "reviewed"
                      ? "status status--success"
                      : "status status--warning"
                  }
                >
                  {sub.status === "reviewed" ? "Reviewed" : "Pending"}
                </span>
              </td>

              <td>
                {sub.status === "reviewed" ? (
                  <Button size="sm" variant="outline" disabled>
                    Reviewed
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleMarkReviewed(sub.id)}
                  >
                    Mark Reviewed
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {submissions.length === 0 && (
        <p className="empty-state">No submissions yet.</p>
      )}
    </div>
  );
};

export default SubmissionsPage;

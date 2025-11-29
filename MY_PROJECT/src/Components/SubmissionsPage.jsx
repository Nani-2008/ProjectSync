import React from 'react';

const SubmissionsPage = () => {
  // placeholder demo data
  const submissions = [
    { id: 1, group: 'Team Alpha', project: 'E-Commerce Platform', date: '2025-12-12', status: 'pending' },
    { id: 2, group: 'Team Beta', project: 'Social Media App', date: '2025-12-10', status: 'reviewed' },
  ];

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
          </tr>
        </thead>
        <tbody>
          {submissions.map(row => (
            <tr key={row.id}>
              <td>{row.group}</td>
              <td>{row.project}</td>
              <td>{row.date}</td>
              <td>
                <span
                  className={
                    'status ' +
                    (row.status === 'reviewed'
                      ? 'status--success'
                      : 'status--warning')
                  }
                >
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionsPage;

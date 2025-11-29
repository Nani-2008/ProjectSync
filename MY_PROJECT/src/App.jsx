import React, { useState, useEffect } from 'react';
import './App.css';

import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import StudentDashboard from './components/StudentDashboard.jsx';
import LoginPage from './components/LoginPage.jsx';
import GroupCollaboration from './components/GroupCollaboration.jsx';
import ProjectDetails from './components/ProjectDetails.jsx';
import GroupsPage from './components/GroupsPage.jsx';
import ProjectsPage from './components/ProjectsPage.jsx';
import SubmissionsPage from './components/SubmissionsPage.jsx';
import CreateGroupPage from './components/CreateGroupPage.jsx';
import CreateProjectPage from './components/CreateProjectPage.jsx';

// SAMPLE DATA
const MOCK_USERS = [
  { id: 1, name: 'Dr. Rajesh Kumar', email: 'teacher@uni.com', password: 'password123', role: 'teacher', avatar: '👨‍🏫' },
  { id: 2, name: 'Priya Singh', email: 'student@uni.com', password: 'password123', role: 'student', avatar: '👩‍🎓', year: 2 },
  { id: 3, name: 'Arjun Patel', email: 'arjun@uni.com', password: 'password123', role: 'student', avatar: '👨‍🎓', year: 2 },
  { id: 4, name: 'Neha Sharma', email: 'neha@uni.com', password: 'password123', role: 'student', avatar: '👩‍💻', year: 2 },
  { id: 5, name: 'Vikram Desai', email: 'vikram@uni.com', password: 'password123', role: 'student', avatar: '👨‍💻', year: 2 },
];

const MOCK_GROUPS = [
  { id: 1, name: 'Team Alpha', members: [2, 3], status: 'active', createdDate: '2025-11-01' },
  { id: 2, name: 'Team Beta', members: [4, 5], status: 'active', createdDate: '2025-11-02' },
  { id: 3, name: 'Team Gamma', members: [2, 4], status: 'active', createdDate: '2025-11-03' },
];

const MOCK_PROJECTS = [
  { id: 1, name: 'E-Commerce Platform', description: 'Full-stack e-commerce app', groupId: 1, dueDate: '2025-12-15', status: 'in-progress', progress: 65 },
  { id: 2, name: 'Social Media App', description: 'Real-time social platform', groupId: 2, dueDate: '2025-12-20', status: 'pending', progress: 20 },
  { id: 3, name: 'Task Management', description: 'Collaborative task tool', groupId: 3, dueDate: '2025-12-10', status: 'in-progress', progress: 45 },
];

export default function App() {
  const [authState, setAuthState] = useState({ isAuthenticated: false, user: null });
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState(1);
  const [selectedGroupId, setSelectedGroupId] = useState(1);

  const [groups, setGroups] = useState(() => {
    const stored = localStorage.getItem('projectsync_groups');
    return stored ? JSON.parse(stored) : MOCK_GROUPS;
  });

  const [projects, setProjects] = useState(() => {
    const stored = localStorage.getItem('projectsync_projects');
    return stored ? JSON.parse(stored) : MOCK_PROJECTS;
  });

  useEffect(() => {
    localStorage.setItem('projectsync_groups', JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem('projectsync_projects', JSON.stringify(projects));
  }, [projects]);

  const handleLoginSuccess = (user) => {
    setAuthState({ isAuthenticated: true, user });
  };

  const handleLogout = () => {
    setAuthState({ isAuthenticated: false, user: null });
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page, id) => {
  setCurrentPage(page);

  if ((page === 'projects' || page === 'projectDetails') && id) {
    setSelectedProjectId(id);
  }

  if (page === 'collaboration' && id) {
    setSelectedGroupId(id);
  }
};


  const handleCreateGroup = (data) => {
    setGroups(prev => {
      const nextId = prev.length ? Math.max(...prev.map(g => g.id)) + 1 : 1;
      const newGroup = {
        id: nextId,
        name: data.name,
        members: [],                  
        status: 'active',
        createdDate: new Date().toISOString().slice(0, 10),
      };
      return [...prev, newGroup];
    });
    setCurrentPage('groups');
  };

  const handleCreateProject = (data) => {
    setProjects(prev => {
      const nextId = prev.length ? Math.max(...prev.map(p => p.id)) + 1 : 1;
      const newProject = {
        id: nextId,
        name: data.name,
        description: data.description,
        groupId: data.groupId ? Number(data.groupId) : null,
        dueDate: data.dueDate || '',
        status: 'pending',
        progress: 0,
      };
      return [...prev, newProject];
    });
    setCurrentPage('projects');
  };

    const handleDeleteGroup = (id) => {
    setGroups(prev => prev.filter(g => g.id !== id));

    setProjects(prev =>
      prev.map(p => (p.groupId === id ? { ...p, groupId: null } : p))
    );
  };

  const handleDeleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };


  if (!authState.isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  const isTeacher = authState.user.role === 'teacher';
  const isStudent = authState.user.role === 'student';

  return (
    <div className="app-container">
      <Navbar user={authState.user} onLogout={handleLogout} />
      <div className="app-layout">
        <Sidebar
          role={authState.user.role}
          activeTab={currentPage}
          onTabChange={setCurrentPage}
        />

        <main className="main-content">
  {/* Teacher Dashboard */}
  {isTeacher && currentPage === 'dashboard' && (
    <AdminDashboard
      user={authState.user}
      groups={groups}
      projects={projects}
      onNavigate={setCurrentPage}
    />
  )}

  {/* Teacher Groups Page */}
  {isTeacher && currentPage === 'groups' && (
    <GroupsPage
      groups={groups}
      onDeleteGroup={handleDeleteGroup}
      onViewGroup={(id) => handleNavigate('collaboration', id)}  // ⭐ ADDED
    />
  )}

  {/* Teacher Projects Page */}
  {isTeacher && currentPage === 'projects' && (
  <ProjectsPage
    projects={projects}
    onDeleteProject={handleDeleteProject}
    onOpenProject={(id) => handleNavigate('projectDetails', id)}   // ⭐ ADDED
  />
)}


  {/* Teacher Submissions Page */}
  {isTeacher && currentPage === 'submissions' && <SubmissionsPage />}

  {/* Teacher Create Group */}
  {isTeacher && currentPage === 'createGroup' && (
    <CreateGroupPage
      onBack={() => setCurrentPage('dashboard')}
      onCreateGroup={handleCreateGroup}
    />
  )}

  {/* Teacher Create Project */}
  {isTeacher && currentPage === 'createProject' && (
    <CreateProjectPage
      onBack={() => setCurrentPage('dashboard')}
      onCreateProject={handleCreateProject}
    />
  )}

  {/* Student Dashboard */}
  {isStudent && currentPage === 'dashboard' && (
    <StudentDashboard
      user={authState.user}
      onNavigate={handleNavigate}
    />
  )}

  {/* Student / Teacher — Group Collaboration */}
  {(isStudent || isTeacher) && currentPage === 'collaboration' && (
    <GroupCollaboration
      groupId={selectedGroupId}
      user={authState.user}
    />
  )}

  {/* Student Project Details */}
  {isStudent && currentPage === 'projectDetails' && (
    <ProjectDetails
      projectId={selectedProjectId}
      user={authState.user}
    />
  )}

   {isTeacher && currentPage === 'projectDetails' && (
  <ProjectDetails
    projectId={selectedProjectId}
    user={authState.user}
  />
)}


</main>

      </div>
    </div>
  );
}

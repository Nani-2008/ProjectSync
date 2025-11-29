import React, { useState } from 'react';
import Button from './Button.jsx';

const MOCK_USERS = [
  { id: 1, name: 'Dr. Rajesh Kumar', email: 'teacher@uni.com', password: 'password123', role: 'teacher', avatar: '👨‍🏫' },
  { id: 2, name: 'Priya Singh', email: 'student@uni.com', password: 'password123', role: 'student', avatar: '👩‍🎓', year: 2 },
];

const LoginPage = ({ onLoginSuccess, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const user = MOCK_USERS.find(u => u.email === email && u.password === password);
      if (user) {
        onLoginSuccess(user);
      } else {
        setError('Invalid credentials. Try: teacher@uni.com or student@uni.com');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome to ProjectSync</h1>
          <p>Collaborative Group Project Management</p>
        </div>
        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" className="form-input" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-input" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <div className="error-message">{error}</div>}
          <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <div className="demo-credentials">
          <p><strong>Demo Credentials:</strong></p>
          <p>👨‍🏫 Teacher: teacher@uni.com / password123</p>
          <p>👩‍🎓 Student: student@uni.com / password123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

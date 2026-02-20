import React, { useState } from 'react';
import { Lock, User, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API delay
    setTimeout(() => {
      const validUsername = import.meta.env.VITE_VOLUNTEER_USERNAME;
      const validPassword = import.meta.env.VITE_VOLUNTEER_PASSWORD;

      if (username === validUsername && password === validPassword) {
        onLogin();
      } else {
        setError('Invalid volunteer credentials. Please try again.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: '100%',
          maxWidth: '400px',
          background: 'var(--card-bg)',
          padding: '2.5rem',
          borderRadius: '1.5rem',
          boxShadow: 'var(--shadow)',
          border: '1px solid var(--border-color)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: 'rgba(37, 99, 235, 0.1)',
            borderRadius: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            color: 'var(--primary)'
          }}>
            <ShieldCheck size={32} />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            Volunteer Login
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Access the Rush Arena management portal
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  color: 'var(--error)',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                  border: '1px solid rgba(239, 68, 68, 0.2)'
                }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
              Registration Number / Email
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <User size={18} />
              </span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your credentials"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.75rem',
                  borderRadius: '0.75rem',
                  border: '1px solid var(--border-color)',
                  fontSize: '1rem',
                  transition: 'border-color 0.2s'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Lock size={18} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.75rem',
                  borderRadius: '0.75rem',
                  border: '1px solid var(--border-color)',
                  fontSize: '1rem'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.875rem',
              background: 'var(--primary)',
              color: 'white',
              borderRadius: '0.75rem',
              fontWeight: '600',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Only authorized club volunteers can access this platform.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

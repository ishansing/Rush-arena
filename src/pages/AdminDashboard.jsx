import React from 'react';
import { LayoutDashboard, Users, Settings, LogOut } from 'lucide-react';

const AdminDashboard = ({ onLogout }) => {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <nav style={{
        padding: '1rem 2rem',
        background: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <LayoutDashboard color="#2563eb" />
          <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e293b' }}>Rush Arena Admin</h1>
        </div>
        <button
          onClick={onLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid #e2e8f0',
            background: 'white',
            cursor: 'pointer',
            color: '#64748b'
          }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </nav>

      <main style={{ padding: '2rem' }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ marginBottom: '1rem', color: '#1e293b' }}>Welcome, Admin!</h2>
          <p style={{ color: '#64748b' }}>
            This is the administrative dashboard. You can manage volunteers, view reports, and configure event settings from here.
          </p>

          <div style={{
            marginTop: '2rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{ padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '0.75rem' }}>
              <Users color="#2563eb" style={{ marginBottom: '0.5rem' }} />
              <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Volunteers</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>10</p>
            </div>
            <div style={{ padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '0.75rem' }}>
              <Settings color="#2563eb" style={{ marginBottom: '0.5rem' }} />
              <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>System Status</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Active</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

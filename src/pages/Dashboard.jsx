import React, { useState } from 'react';
import { Search, LogOut, User, Mail, Hash, Phone, CheckCircle2, Trophy, ArrowRight, UserCircle, CalendarCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = ({ onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [participant, setParticipant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Mock data for demonstration
  const [mockParticipants, setMockParticipants] = useState([
    {
      id: '1',
      regNo: '2024CS101',
      name: 'Aaryan Sharma',
      email: 'aaryan.s@university.edu',
      phone: '+91 98765 43210',
      attendance: false,
      games: {
        'Mini Game 1': false,
        'Mini Game 2': true,
        'Mini Game 3': false,
        'Mini Game 4': false,
        'Mini Game 5': false,
        'Mini Game 6': false,
        'Mini Game 7': false,
        'Mini Game 8': false,
        'Mini Game 9': false,
      },
      special: {
        'Mechanical Bull Ride': true,
        'Body Zorbing': false,
        'Speed Dating': false
      }
    }
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setUpdateSuccess(false);
    // Simulate API search
    setTimeout(() => {
      const found = mockParticipants.find(p =>
        p.regNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setParticipant(found ? { ...found } : 'not_found');
      setLoading(false);
    }, 800);
  };

  const toggleAttendance = () => {
    if (typeof participant === 'object' && participant) {
      setParticipant({ ...participant, attendance: !participant.attendance });
    }
  };

  const toggleGame = (game) => {
    if (typeof participant === 'object' && participant) {
      const newGames = { ...participant.games, [game]: !participant.games[game] };
      setParticipant({ ...participant, games: newGames });
    }
  };

  const toggleSpecial = (activity) => {
    if (typeof participant === 'object' && participant) {
      const newSpecial = { ...participant.special, [activity]: !participant.special[activity] };
      setParticipant({ ...participant, special: newSpecial });
    }
  };

  const handleUpdate = () => {
    if (typeof participant !== 'object' || !participant) return;

    setUpdating(true);
    // Simulate DB Update
    setTimeout(() => {
      setMockParticipants(prev =>
        prev.map(p => p.id === participant.id ? participant : p)
      );
      setUpdating(false);
      setUpdateSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => setUpdateSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div style={{ minHeight: '100vh', padding: '1rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 0',
        marginBottom: '2rem',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary)' }}>RUSH ARENA</h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Volunteer Dashboard</p>
        </div>
        <button
          onClick={onLogout}
          style={{
            padding: '0.5rem 1rem',
            background: 'rgba(239, 68, 68, 0.1)',
            color: 'var(--error)',
            borderRadius: '0.5rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <LogOut size={16} /> Sign Out
        </button>
      </nav>

      {/* Search Section */}
      <section style={{ marginBottom: '2.5rem' }}>
        <form onSubmit={handleSearch} style={{ position: 'relative' }}>
          <div style={{ position: 'relative', display: 'flex', gap: '0.75rem' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Search size={20} />
              </span>
              <input
                type="text"
                placeholder="Search by Name or Registration Number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1rem 1rem 3rem',
                  borderRadius: '1rem',
                  border: '1px solid var(--border-color)',
                  background: 'var(--card-bg)',
                  fontSize: '1rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '0 1.5rem',
                background: 'var(--primary)',
                color: 'white',
                borderRadius: '1rem',
                fontWeight: '600',
                fontSize: '0.875rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {loading ? '...' : 'Search'}
            </button>
          </div>
        </form>
      </section>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {!participant && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}
          >
            <div style={{ marginBottom: '1rem' }}><UserCircle size={64} strokeWidth={1} style={{ margin: '0 auto', opacity: 0.3 }} /></div>
            <p>Search for a participant to manage their activity data</p>
          </motion.div>
        )}

        {participant === 'not_found' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              padding: '2rem',
              textAlign: 'center',
              background: 'white',
              borderRadius: '1rem',
              border: '1px dashed var(--error)'
            }}
          >
            <h3 style={{ color: 'var(--error)' }}>No participant found</h3>
            <p style={{ color: 'var(--text-muted)' }}>Check the registration number and try again.</p>
          </motion.div>
        )}

        {typeof participant === 'object' && participant && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {/* Participant Profile Card */}
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '1.5rem',
              boxShadow: 'var(--shadow)',
              marginBottom: '2rem',
              border: '1px solid var(--border-color)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem'
            }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', gridColumn: '1 / -1', marginBottom: '0.5rem', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ padding: '0.75rem', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '1rem', color: 'var(--primary)' }}>
                    <User size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: '700', fontSize: '1.25rem' }}>{participant.name}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Verified Participant</p>
                  </div>
                </div>

                {/* Attendance Toggle */}
                <div
                  onClick={toggleAttendance}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '1rem',
                    background: participant.attendance ? 'rgba(16, 185, 129, 0.1)' : '#f1f5f9',
                    border: `1px solid ${participant.attendance ? 'rgba(16, 185, 129, 0.2)' : '#e2e8f0'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <CalendarCheck size={20} color={participant.attendance ? '#10b981' : '#64748b'} />
                  <span style={{
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    color: participant.attendance ? '#10b981' : '#64748b'
                  }}>
                    {participant.attendance ? 'PRESENT' : 'MARK ATTENDANCE'}
                  </span>
                  <div style={{
                    width: '36px',
                    height: '20px',
                    background: participant.attendance ? '#10b981' : '#cbd5e1',
                    borderRadius: '10px',
                    position: 'relative',
                    transition: 'background 0.2s'
                  }}>
                    <div style={{
                      width: '14px',
                      height: '14px',
                      background: 'white',
                      borderRadius: '50%',
                      position: 'absolute',
                      top: '3px',
                      left: participant.attendance ? '19px' : '3px',
                      transition: 'left 0.2s'
                    }} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
                <Hash size={18} />
                <span style={{ fontSize: '0.875rem' }}>{participant.regNo}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
                <Mail size={18} />
                <span style={{ fontSize: '0.875rem' }}>{participant.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
                <Phone size={18} />
                <span style={{ fontSize: '0.875rem' }}>{participant.phone}</span>
              </div>
            </div>

            {/* Games Logic Area */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {/* Mini Games Grid */}
              <div style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '1.5rem',
                border: '1px solid var(--border-color)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <Trophy size={20} color="var(--primary)" />
                  <h4 style={{ fontWeight: '700' }}>Mini Games (9)</h4>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
                  {Object.entries(participant.games).map(([game, status]) => (
                    <div
                      key={game}
                      onClick={() => toggleGame(game)}
                      style={{
                        padding: '1rem',
                        borderRadius: '0.75rem',
                        background: status ? 'rgba(16, 185, 129, 0.05)' : '#f8fafc',
                        border: `1px solid ${status ? 'rgba(16, 185, 129, 0.2)' : 'var(--border-color)'}`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.1s'
                      }}
                    >
                      <span style={{ fontSize: '0.875rem', fontWeight: '500', color: status ? 'var(--success)' : 'var(--text-main)' }}>{game}</span>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        border: `2px solid ${status ? 'var(--success)' : 'var(--border-color)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: status ? 'var(--success)' : 'transparent',
                        color: 'white'
                      }}>
                        {status && <CheckCircle2 size={16} />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Events Area */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '1.5rem',
                  border: '1px solid var(--border-color)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      <StarIcon />
                    </motion.div>
                    <h4 style={{ fontWeight: '700' }}>Premium Activities</h4>
                  </div>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {Object.entries(participant.special).map(([activity, status]) => (
                      <div
                        key={activity}
                        onClick={() => toggleSpecial(activity)}
                        style={{
                          padding: '1.25rem',
                          borderRadius: '1rem',
                          background: status ? 'linear-gradient(to right, #6366f1, #4f46e5)' : '#f8fafc',
                          color: status ? 'white' : 'var(--text-main)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer',
                          boxShadow: status ? '0 10px 15px -3px rgba(79, 70, 229, 0.2)' : 'none'
                        }}
                      >
                        <span style={{ fontWeight: '600' }}>{activity}</span>
                        <div style={{
                          padding: '4px',
                          background: status ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.05)',
                          borderRadius: '6px'
                        }}>
                          {status ? 'COMPLETED' : 'PENDING'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Action */}
                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <AnimatePresence>
                    {updateSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        style={{
                          padding: '0.75rem',
                          background: 'rgba(16, 185, 129, 0.1)',
                          color: '#10b981',
                          borderRadius: '0.75rem',
                          fontSize: '0.875rem',
                          textAlign: 'center',
                          fontWeight: '600'
                        }}
                      >
                        Changes updated successfully to database!
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={handleUpdate}
                    disabled={updating}
                    style={{
                      padding: '1.25rem',
                      background: updating ? '#64748b' : 'var(--text-main)',
                      color: 'white',
                      borderRadius: '1rem',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '1rem',
                      fontSize: '1.125rem',
                      border: 'none',
                      cursor: updating ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {updating ? 'Saving Changes...' : (
                      <>Update All Changes <ArrowRight size={20} /></>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
        &copy; 2026 Club Management System • Secure Volunteer Session
      </footer>
    </div>
  );
};

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#f59e0b' }}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

export default Dashboard;


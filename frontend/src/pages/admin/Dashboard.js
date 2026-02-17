import React, { useState, useEffect } from 'react';
import { FaQuestion, FaEdit, FaGlobe, FaEnvelope } from 'react-icons/fa';
import api from '../../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState({
        pages: 0,
        faqs: 0,
        blogs: 0,
        users: 0 // Placeholder if we add user management later
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch Pages count
                const pagesRes = await api.get('/pages');
                const faqsRes = await api.get('/faqs');

                setStats(prev => ({
                    ...prev,
                    pages: pagesRes.data.success ? pagesRes.data.count : 0,
                    faqs: faqsRes.data.success ? faqsRes.data.count : 0
                }));
            } catch (err) {
                console.error('Error fetching stats:', err);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '5px', color: '#2d3748' }}>Dashboard</h2>
                    <p style={{ color: '#718096' }}>Manage your content with ease</p>
                </div>
                <div className="user-welcome" style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'white', padding: '10px 20px', borderRadius: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                    <div className="user-avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        👤
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <span style={{ display: 'block', fontSize: '0.8rem', color: '#718096' }}>Welcome back,</span>
                        <span style={{ fontWeight: 'bold', color: '#2d3748' }}>Administrator</span>
                    </div>
                </div>
            </div>

            <div className="dashboard-content-card" style={{ background: 'white', borderRadius: '20px', padding: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#2d3748' }}>Dashboard</h3>
                <p style={{ color: '#718096', marginBottom: '30px' }}>Welcome back! Here's an overview of your content.</p>

                <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '25px' }}>
                    {/* Total FAQs Card */}
                    <div className="stat-card" style={{ background: '#3b82f6', borderRadius: '16px', padding: '25px', color: 'white', position: 'relative', overflow: 'hidden', minHeight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <FaQuestion style={{ fontSize: '2.5rem', opacity: '0.8' }} />
                            <div style={{ width: '30px', height: '30px', background: 'white', borderRadius: '50%' }}></div>
                        </div>
                        <div>
                            <p style={{ fontSize: '0.9rem', fontWeight: '600', opacity: '0.9', marginBottom: '5px' }}>TOTAL FAQS</p>
                            <h3 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>{stats.faqs}</h3>
                        </div>
                    </div>

                    {/* Total Blogs Card */}
                    <div className="stat-card" style={{ background: '#10b981', borderRadius: '16px', padding: '25px', color: 'white', position: 'relative', overflow: 'hidden', minHeight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <FaEdit style={{ fontSize: '2.5rem', opacity: '0.8' }} />
                            <div style={{ width: '30px', height: '30px', background: 'white', borderRadius: '50%' }}></div>
                        </div>
                        <div>
                            <p style={{ fontSize: '0.9rem', fontWeight: '600', opacity: '0.9', marginBottom: '5px' }}>TOTAL BLOGS</p>
                            <h3 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>{stats.blogs}</h3>
                        </div>
                    </div>

                    {/* Service Countries Card */}
                    <div className="stat-card" style={{ background: '#8b5cf6', borderRadius: '16px', padding: '25px', color: 'white', position: 'relative', overflow: 'hidden', minHeight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <FaGlobe style={{ fontSize: '2.5rem', opacity: '0.8' }} />
                            <div style={{ width: '30px', height: '30px', background: 'white', borderRadius: '50%' }}></div>
                        </div>
                        <div>
                            <p style={{ fontSize: '0.9rem', fontWeight: '600', opacity: '0.9', marginBottom: '5px' }}>SERVICE COUNTRIES</p>
                            <h3 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>0</h3>
                        </div>
                    </div>

                    {/* Contact Submissions Card */}
                    <div className="stat-card" style={{ background: '#f97316', borderRadius: '16px', padding: '25px', color: 'white', position: 'relative', overflow: 'hidden', minHeight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <FaEnvelope style={{ fontSize: '2.5rem', opacity: '0.8' }} />
                            <div style={{ width: '30px', height: '30px', background: 'white', borderRadius: '50%' }}></div>
                        </div>
                        <div>
                            <p style={{ fontSize: '0.9rem', fontWeight: '600', opacity: '0.9', marginBottom: '5px' }}>CONTACT SUBMISSIONS</p>
                            <h3 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0 }}>0</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

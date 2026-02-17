import React, { useState, useEffect } from 'react';
import { FaCertificate, FaShieldAlt, FaHeadset, FaCheckCircle } from 'react-icons/fa';
import api from '../services/api';
import './StaticPages.css';

// Icon mapping
const iconMap = {
    FaCertificate: FaCertificate,
    FaShieldAlt: FaShieldAlt,
    FaHeadset: FaHeadset,
    FaCheckCircle: FaCheckCircle
};

const About = () => {
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const res = await api.get('/about');
                if (res.data.success) {
                    setAboutData(res.data.data);
                } else {
                    setError('Success flag false: ' + JSON.stringify(res.data));
                }
            } catch (err) {
                console.error('Failed to fetch about data', err);
                setError(err.message || 'Unknown error');
                if (err.response) {
                    setError(`Server responded with ${err.response.status}: ${JSON.stringify(err.response.data)}`);
                } else if (err.request) {
                    setError('No response received from server. Is backend running on port 5000?');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAboutData();
    }, []);

    if (loading) return <div className="loading-spinner">Loading...</div>;

    if (error) {
        return <div className="container mt-5 alert alert-danger">Error loading content: {error}</div>;
    }

    if (!aboutData) return <div>Failed to load content. (No data returned)</div>;

    const { hero, mission, features } = aboutData;

    return (
        <div className="static-page">
            <div className="page-hero" style={{ backgroundImage: hero.image ? `url(${hero.image})` : undefined }}>
                <div className="container">
                    <h1>{hero.title}</h1>
                    <p>{hero.subtitle}</p>
                </div>
            </div>

            <div className="container">
                {/* Mission Section */}
                <section className="page-section">
                    <div className="row" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '30px' }}>
                        <div style={{ flex: 1, minWidth: '300px' }}>
                            <h2>{mission.title}</h2>
                            <p className="lead-text" style={{ whiteSpace: 'pre-wrap' }}>
                                {mission.content}
                            </p>
                        </div>
                        {mission.image && (
                            <div style={{ flex: 1, minWidth: '300px' }}>
                                <img src={mission.image} alt="Mission" style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                            </div>
                        )}
                    </div>
                </section>

                {/* Features Section */}
                <section className="page-section">
                    <h2>Why Choose Us</h2>
                    <div className="features-grid">
                        {features.map((item, index) => {
                            const Icon = iconMap[item.icon] || FaCertificate;
                            return (
                                <div key={index} className="feature-item">
                                    <Icon className="feature-icon" />
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;

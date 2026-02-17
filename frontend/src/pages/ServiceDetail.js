import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './services/ServicePage.css'; // Reuse existing CSS

const ServiceDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const res = await api.get(`/services/${slug}`);
                if (res.data.success) {
                    setService(res.data.data);
                }
            } catch (err) {
                console.error('Failed to fetch service', err);
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [slug]);

    const goToChat = () => {
        navigate('/chat-support');
    };

    if (loading) return <div className="loading-spinner">Loading...</div>;
    if (!service) return <div className="container">Service not found</div>;

    return (
        <div className="service-page-template">
            {/* HERO SECTION */}
            <header className="service-hero">
                <div className="container">
                    <h1>{service.title}</h1>
                    <p>{service.shortDescription}</p>
                    <button className="btn btn-primary" onClick={goToChat}>
                        Get Instant Help
                    </button>
                </div>
            </header>

            {/* CONTENT SECTION */}
            <section className="service-content-section section-gray">
                <div className="container">
                    <div className="content-wrapper">
                        {/* Render HTML content safely */}
                        <div
                            className="service-body-content"
                            dangerouslySetInnerHTML={{ __html: service.content }}
                        />
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="cta-section">
                <div className="container">
                    <h2>Still having issues with your printer?</h2>
                    <p>Our experts are available 24/7 to resolve your technical problems.</p>
                    <button className="btn btn-light btn-large" onClick={goToChat}>
                        Chat with an Expert
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ServiceDetail;

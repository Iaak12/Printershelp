// Service Page Template Generator
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import './ServicePage.css';

const ServicePageTemplate = ({ icon: Icon, title, description, issues, slug }) => {

    const navigate = useNavigate();

    return (
        <div className="service-page">
            <div className="service-hero">
                <div className="container">
                    <div className="service-icon-large">
                        <Icon />
                    </div>
                    <h1>{title}</h1>
                    <p className="service-subtitle">{description}</p>
                </div>
            </div>

            <div className="container">
                <section className="service-section">
                    <h2>Issues Covered</h2>
                    <div className="issues-list">
                        {issues.map((issue, index) => (
                            <div key={index} className="issue-item">
                                <FaCheckCircle /> {issue}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="service-section">
                    <h2>Supported Brands</h2>
                    <p className="brands-text">This service supports {slug} for:</p>
                    <div className="brands-list">
                        <span className="brand-tag hp">HP Printers</span>
                        <span className="brand-tag canon">Canon Printers</span>
                        <span className="brand-tag epson">Epson Printers</span>
                        <span className="brand-tag brother">Brother Printers</span>
                    </div>
                </section>

                <section className="service-cta">
                    <h3>Need Help with {title}?</h3>
                    <p>Connect with our certified experts for guided troubleshooting support</p>
                    <button 
                        className="btn btn-primary btn-large" 
                        onClick={() => navigate('/chat-support')}
                    >
                        Get Help Now
                    </button>
                </section>
            </div>
        </div>
    );
};

export default ServicePageTemplate;

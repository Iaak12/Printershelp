import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPowerOff, FaCheckCircle } from 'react-icons/fa';
import './ServicePage.css';

const PrinterOffline = () => {
    const navigate = useNavigate();

    return (
        <div className="service-page">
            <div className="service-hero">
                <div className="container">
                    <div className="service-icon-large">
                        <FaPowerOff />
                    </div>
                    <h1>Printer Offline Issues – Causes & Guided Fix</h1>
                    <p className="service-subtitle">
                        Printer offline issues are common and can occur due to network problems, driver errors, incorrect settings, or software conflicts.
                        Our support experts help identify the cause and guide users through the resolution process.
                    </p>
                </div>
            </div>

            <div className="container">
                <section className="service-section">
                    <h2>Issues Covered</h2>
                    <div className="issues-list">
                        <div className="issue-item">
                            <FaCheckCircle /> Printer showing offline
                        </div>
                        <div className="issue-item">
                            <FaCheckCircle /> Printer not responding
                        </div>
                        <div className="issue-item">
                            <FaCheckCircle /> Network connectivity issues
                        </div>
                        <div className="issue-item">
                            <FaCheckCircle /> Driver communication errors
                        </div>
                    </div>
                </section>

                <section className="service-section">
                    <h2>Supported Brands</h2>
                    <p className="brands-text">This service supports printer offline issues for:</p>
                    <div className="brands-list">
                        <span className="brand-tag hp">HP Printers</span>
                        <span className="brand-tag canon">Canon Printers</span>
                        <span className="brand-tag epson">Epson Printers</span>
                        <span className="brand-tag brother">Brother Printers</span>
                    </div>
                </section>

                <section className="service-cta">
                    <h3>Need Help Resolving Your Printer Offline Issue?</h3>
                    <p>Connect with our certified experts for guided troubleshooting support</p>
                    <button 
                        className="btn btn-primary btn-large"
                        onClick={() => navigate('/chat-support')}
                    >
                        Resolve Printer Offline Issue Now
                    </button>
                </section>
            </div>
        </div>
    );
};

export default PrinterOffline;

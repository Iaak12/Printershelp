import React from 'react';
import './StaticPages.css';

const Privacy = () => (
    <div className="static-page">
        <div className="page-hero">
            <div className="container">
                <h1>Privacy Policy</h1>
                <p>How we handle your information</p>
            </div>
        </div>
        <div className="container">
            <section className="page-section">
                <div className="legal-content">
                    <p>Last updated: February 2026</p>
                    <h2>Information Collection</h2>
                    <p>We collect information you provide when using our chat support service, including your name, phone number, and printer issue details.</p>
                    <h2>Use of Information</h2>
                    <p>Your information is used solely to provide printer support services and connect you with our technical experts.</p>
                    <h2>Data Security</h2>
                    <p>We implement appropriate security measures to protect your personal information.</p>
                </div>
            </section>
        </div>
    </div>
);

export default Privacy;

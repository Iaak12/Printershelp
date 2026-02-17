import React from 'react';
import './StaticPages.css';

const Terms = () => (
    <div className="static-page">
        <div className="page-hero">
            <div className="container">
                <h1>Terms & Conditions</h1>
                <p>Terms of service</p>
            </div>
        </div>
        <div className="container">
            <section className="page-section">
                <div className="legal-content">
                    <p>Last updated: February 2026</p>
                    <h2>Service Description</h2>
                    <p>We provide guided technical support for printer-related issues across major printer brands.</p>
                    <h2>User Responsibilities</h2>
                    <p>Users are responsible for providing accurate information about their printer issues.</p>
                    <h2>Limitation of Liability</h2>
                    <p>Our support services are provided on an "as is" basis. We are not liable for any damages resulting from the use of our services.</p>
                </div>
            </section>
        </div>
    </div>
);

export default Terms;

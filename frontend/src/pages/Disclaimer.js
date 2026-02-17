import React from 'react';
import './StaticPages.css';

const Disclaimer = () => (
    <div className="static-page">
        <div className="page-hero">
            <div className="container">
                <h1>Disclaimer</h1>
                <p>Important information</p>
            </div>
        </div>
        <div className="container">
            <section className="page-section">
                <div className="legal-content">
                    <h2>Independent Service</h2>
                    <p>We are an independent printer support service provider. We are not affiliated with, endorsed by, or sponsored by HP, Canon, Epson, Brother, or any other printer manufacturer.</p>
                    <h2>Service Scope</h2>
                    <p>Our services provide guided assistance for common printer issues. We do not provide on-site repairs or replacement parts.</p>
                    <h2>No Warranty</h2>
                    <p>While we strive to provide accurate and helpful support, we make no warranties regarding the resolution of all printer issues.</p>
                </div>
            </section>
        </div>
    </div>
);

export default Disclaimer;

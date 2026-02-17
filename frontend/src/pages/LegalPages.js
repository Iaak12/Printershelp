import React from 'react';
import './StaticPages.css';

export const Privacy = () => (
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

export const Terms = () => (
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

export const Disclaimer = () => (
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

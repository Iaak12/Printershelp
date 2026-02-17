import React from 'react';
import { FaComments } from 'react-icons/fa';
import './StaticPages.css';

const Contact = () => {
    return (
        <div className="static-page">
            <div className="page-hero">
                <div className="container">
                    <h1>Contact Us</h1>
                    <p>Get expert printer support assistance</p>
                </div>
            </div>

            <div className="container">
                <section className="page-section text-center">
                    <div className="contact-card">
                        <FaComments className="contact-icon" />
                        <h2>Need Help with Your Printer?</h2>
                        <p className="lead-text">
                            Use our AI-powered chat to connect with a support expert.
                            Our team is ready to help you resolve your printer issues quickly and efficiently.
                        </p>
                        <button
                            className="btn btn-primary btn-large"
                            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                        >
                            Chat with Support Expert
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Contact;

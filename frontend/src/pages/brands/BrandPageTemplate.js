import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BrandPage.css';

const BrandPageTemplate = ({ brandName, description, brandImage }) => {
    const navigate = useNavigate();

    const services = [
        'Printer Offline Issues',
        'Printer Not Printing',
        'Wireless / WiFi Setup',
        'Driver & Software Issues',
        'Paper Jam Problems',
        'Scanner Not Working',
        'Error Code Resolution',
        'Installation & Setup'
    ];

    const goToChat = () => {
        navigate('/chat-support');
        window.scrollTo(0, 0);
    };

    return (
        <div className="brand-page">

            {/* ================= HERO SECTION ================= */}
            <div className="brand-hero">
                <div className="container">

                    {/* White Logo Box */}
                    <div className="brand-logo-box">
                        <img src={brandImage} alt={`${brandName} Logo`} />
                    </div>

                    <h1>{brandName} Printer Support</h1>

                    <p className="brand-subtitle">
                        {description}
                    </p>

                </div>
            </div>

            {/* ================= CONTENT ================= */}
            <div className="container">

                {/* Section 1 */}
                <section className="brand-section">
                    <h2>Expert Support for {brandName} Printers</h2>
                    <p className="brand-text">
                        Our certified technicians specialize in {brandName} printer troubleshooting and support.
                        We understand the unique configurations and common issues specific to {brandName} printers.
                        From connectivity problems to driver installation and hardware errors,
                        our experts provide step-by-step guided assistance.
                    </p>
                </section>

                {/* Section 2 */}
                <section className="brand-section">
                    <h2>Services for {brandName} Printers</h2>
                    <div className="services-grid">
                        {services.map((service, index) => (
                            <div key={index} className="service-item">
                                <span className="service-bullet">✓</span>
                                {service}
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="brand-cta">
                    <h3>Need Help with Your {brandName} Printer?</h3>
                    <p>
                        Connect with our certified {brandName} printer specialists for instant expert assistance.
                    </p>
                    <button
                        className="btn btn-primary btn-large"
                        onClick={goToChat}
                    >
                        Get {brandName} Printer Support
                    </button>
                </section>

            </div>
        </div>
    );
};

export default BrandPageTemplate;

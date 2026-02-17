import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaShieldAlt, FaCertificate, FaHeadset } from 'react-icons/fa';
import { FaTools, FaLayerGroup, FaUserShield } from 'react-icons/fa';
import BrandCard from '../components/BrandCard';
import IssueCard from '../components/IssueCard';
import FAQItem from '../components/FAQItem';
import './Home.css';
import api from '../services/api';

// Icon mapping for dynamic rendering
const iconMap = {
    FaCertificate: FaCertificate,
    FaShieldAlt: FaShieldAlt,
    FaCheckCircle: FaCheckCircle,
    FaHeadset: FaHeadset
};

const Home = () => {
    const navigate = useNavigate();
    const [homeData, setHomeData] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Default FAQs (can be moved to DB later if needed, or fetched from FAQ API)
    const defaultFaqs = [
        {
            question: 'Why is my printer offline?',
            answer: 'Printer offline issues can occur due to network connectivity problems, outdated drivers, incorrect printer settings, or communication errors between your device and printer. Our experts can help diagnose and resolve the specific cause.'
        },
        {
            question: 'How do I connect my printer to WiFi?',
            answer: 'WiFi printer setup varies by brand and model. Generally, you\'ll need to access your printer\'s network settings, select your WiFi network, and enter the password. Our guided support can walk you through the exact steps for your specific printer model.'
        },
        {
            question: 'Why is my printer not printing?',
            answer: 'Common causes include empty ink cartridges, paper jams, driver issues, or print queue problems. Our support process helps identify the exact cause and provides step-by-step solutions.'
        },
        {
            question: 'How do I fix printer driver issues?',
            answer: 'Driver issues often require uninstalling old drivers, downloading the correct version for your operating system, and proper installation. Our experts can guide you through the process.'
        },
        {
            question: 'What printer brands do you support?',
            answer: 'We provide expert support for HP, Canon, Epson, and Brother printers, covering a wide range of models and configurations for each brand.'
        }
    ];

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const [homeRes, blogRes] = await Promise.all([
                    api.get('/homepage'),
                    api.get('/blogs')
                ]);

                if (homeRes.data.success) {
                    setHomeData(homeRes.data.data);
                } else {
                    setError('Home data fetch failed');
                }

                if (blogRes.data.success) {
                    setBlogs(blogRes.data.data.slice(0, 3));
                }
            } catch (err) {
                console.error('Failed to fetch page data', err);
                setError('Failed to load website content. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchHomeData();
    }, []);

    const goToChatSupport = () => {
        navigate('/chat-support');
        window.scrollTo(0, 0);
    };

    if (loading) {
        return <div className="loading-spinner">Loading...</div>;
    }

    if (error) {
        return <div className="container mt-5 alert alert-danger">Error loading content: {error}</div>;
    }

    if (!homeData) {
        return <div>Failed to load content. (No data returned)</div>;
    }

    const { hero, brands, issues, whyChooseUs, processSteps, trustStats, testimonials } = homeData;

    return (
        <div className="home">
            {/* HERO SECTION */}
            <section className="hero-section">
                <div className="container hero-wrapper">
                    {/* LEFT IMAGE */}
                    <div className="hero-image">
                        {/* Use dynamic image if available, else fallback is handled by logic or seed */}
                        <img src={hero.image} alt="Printer Support" />
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="hero-content">
                        <h1>{hero.title}</h1>
                        <p className="hero-subtitle">{hero.subtitle}</p>
                        <p className="hero-description">{hero.description}</p>

                        <div className="hero-buttons">
                            <button className="btn btn-primary btn-large" onClick={goToChatSupport}>
                                {hero.buttonText}
                            </button>
                        </div>

                        <div className="hero-badges">
                            <span>✔ Secure Assistance</span>
                            <span>✔ Certified Experts</span>
                            <span>✔ Brand-Specific Support</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Printer Brands We Support */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title text-center">Printer Brands We Support</h2>
                    <div className="brands-grid">
                        {brands.map((brand, index) => (
                            <BrandCard
                                key={index}
                                brand={brand.name}
                                logo={brand.logo}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 3: Printer Issues We Resolve */}
            <section className="section section-gray">
                <div className="container">
                    <h2 className="section-title text-center">Common Printer Issues We Resolve</h2>
                    <div className="issues-grid">
                        {issues.map((issue, index) => (
                            <IssueCard key={index} issue={issue.title} path={issue.path} />
                        ))}
                    </div>
                    <div className="text-center" style={{ marginTop: 'var(--spacing-2xl)' }}>
                        <button
                            className="btn btn-primary"
                            onClick={goToChatSupport}
                        >
                            Fix My Printer Issue
                        </button>
                    </div>
                </div>
            </section>

            {/* Section 4: Why Choose Us */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title text-center">Why Choose Our Printer Support Services</h2>
                    <div className="why-grid">
                        {whyChooseUs.map((item, index) => {
                            const Icon = iconMap[item.icon] || FaCertificate;
                            return (
                                <div key={index} className="why-card">
                                    <div className="why-icon">
                                        <Icon />
                                    </div>
                                    <h3 className="why-title">{item.title}</h3>
                                    <p className="why-description">{item.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Section 5: How Our Support Process Works */}
            <section className="section section-gray">
                <div className="container">
                    <h2 className="section-title text-center">How Our Printer Support Process Works</h2>
                    <div className="process-grid">
                        {processSteps.map((step, index) => (
                            <div key={index} className="process-step">
                                <div className="step-number">{step.stepNumber}</div>
                                <h4>{step.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 6: Customer Trust & Experience */}
            <section className="section trust-section-premium">
                <div className="container">
                    <h2 className="section-title text-center">
                        Helping Users Resolve Printer Issues with Confidence
                    </h2>

                    <div className="trust-stats">
                        <div className="stat-item">
                            <div className="stat-icon">
                                <FaTools />
                            </div>
                            <h3>{trustStats.experience.title}</h3>
                            <p>{trustStats.experience.description}</p>
                        </div>

                        <div className="stat-item">
                            <div className="stat-icon">
                                <FaLayerGroup />
                            </div>
                            <h3>{trustStats.multiBrand.title}</h3>
                            <p>{trustStats.multiBrand.description}</p>
                        </div>

                        <div className="stat-item">
                            <div className="stat-icon">
                                <FaUserShield />
                            </div>
                            <h3>{trustStats.professional.title}</h3>
                            <p>{trustStats.professional.description}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section blog-section-premium">
                <div className="container">
                    <h2 className="section-title text-center">
                        Printer Help & Troubleshooting Guides
                    </h2>
                    <div className="blog-grid">
                        {(blogs && blogs.length > 0 ? blogs : []).map((post, index) => (
                            <div key={post._id || index} className="blog-card" onClick={() => navigate(`/blog/${post.slug}`)}>
                                <div className="blog-card-image">
                                    {post.image ? (
                                        <img src={post.image} alt={post.title} />
                                    ) : (
                                        <div className="blog-image-placeholder">
                                            <span>Printer Guide</span>
                                        </div>
                                    )}
                                    <div className="blog-date">
                                        {new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </div>
                                </div>
                                <div className="blog-card-content">
                                    <h3>{post.title}</h3>
                                    <p>{post.excerpt}</p>
                                    <button
                                        className="blog-link"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/blog/${post.slug}`);
                                        }}
                                    >
                                        Read More →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="blog-cta-wrapper">
                        <button className="btn btn-primary btn-large" onClick={() => navigate('/blog')}>
                            View All Blogs
                        </button>
                    </div>
                </div>
            </section>

            {/* Section 8: Testimonials */}
            <section className="testimonial-premium-section">
                <div className="container">
                    <h2 className="testimonial-premium-title">What Our Customers Say</h2>
                    <p className="testimonial-subtitle">Trusted by thousands of printer users worldwide</p>

                    <div className="testimonial-slider">
                        <div className="testimonial-track">
                            {/* Map twice to create infinite scroll effect if desired, or simplified */}
                            {[...testimonials, ...testimonials].map((t, i) => (
                                <div key={i} className="testimonial-card">
                                    <div className="testimonial-top">
                                        <div>
                                            <h4>{t.name}</h4>
                                            <span>{t.company}</span>
                                        </div>
                                    </div>
                                    <div className="stars">{'★'.repeat(t.stars)}</div>
                                    <p>{t.review}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 9: FAQ Section */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title text-center">Frequently Asked Questions</h2>
                    <div className="faq-container">
                        {defaultFaqs.map((faq, index) => (
                            <FAQItem key={index} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                    <div className="text-center" style={{ marginTop: 'var(--spacing-2xl)' }}>
                        <p style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--gray-600)' }}>
                            Still Need Help?
                        </p>
                        <button className="btn btn-primary" onClick={goToChatSupport}>
                            Chat with an Expert
                        </button>
                    </div>
                </div>
            </section>

            {/* Section 10: SEO Content Area */}
            {homeData.seoContent && (homeData.seoContent.title || homeData.seoContent.body) && (
                <section className="section seo-content-section" style={{ background: '#f8f9fa', borderTop: '1px solid #e9ecef' }}>
                    <div className="container">
                        {homeData.seoContent.title && (
                            <h2 className="section-title text-center" style={{ marginBottom: '20px' }}>
                                {homeData.seoContent.title}
                            </h2>
                        )}
                        {homeData.seoContent.body && (
                            <div
                                className="seo-body-text"
                                dangerouslySetInnerHTML={{ __html: homeData.seoContent.body }}
                                style={{ color: '#4a5568', lineHeight: '1.7', fontSize: '0.95rem', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}
                            />
                        )}
                    </div>
                </section>
            )}
        </div>
    );
};

export default Home;

import React, { useState, useEffect } from 'react';
import FAQItem from '../components/FAQItem';
import api from '../services/api';
import './StaticPages.css';

const FAQ = () => {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                const res = await api.get('/faqs');
                if (res.data.success) {
                    setFaqs(res.data.data);
                }
            } catch (err) {
                console.error('Error fetching FAQs:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFAQs();
    }, []);

    return (
        <div className="static-page">
            <div className="page-hero">
                <div className="container">
                    <h1>Frequently Asked Questions</h1>
                    <p>Find answers to common printer support questions</p>
                </div>
            </div>

            <div className="container">
                <section className="page-section">
                    <div className="faq-container">
                        {loading ? (
                            <div className="text-center p-5">Loading FAQs...</div>
                        ) : faqs.length > 0 ? (
                            faqs.map((faq, index) => (
                                <FAQItem key={faq._id || index} question={faq.question} answer={faq.answer} />
                            ))
                        ) : (
                            <div className="text-center p-5">No FAQs available at the moment.</div>
                        )}
                    </div>

                    <div className="text-center" style={{ marginTop: 'var(--spacing-3xl)' }}>
                        <p style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--gray-600)' }}>
                            Still Need Help?
                        </p>
                        <button
                            className="btn btn-primary"
                            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                        >
                            Chat with an Expert
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default FAQ;

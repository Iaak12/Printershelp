import React, { useState } from 'react';
import { FaComments, FaTimes, FaCheck } from 'react-icons/fa';
import api from '../services/api';
import './Chatbot.css';

const Chatbot = ({ show, onClose, onOpen }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        issue: '',
        brand: '',
        description: '',
        name: '',
        email: '', // Added email
        phone: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const issues = [
        'Printer Offline',
        'Not Printing',
        'WiFi Setup',
        'Driver Issues',
        'Paper Jam',
        'Scanner Issues',
        'Error Codes',
        'Installation'
    ];

    const brands = ['HP', 'Canon', 'Epson', 'Brother'];

    const handleOpen = () => {
        setIsOpen(true);
        if (onOpen) onOpen();
        setStep(1);
        setIsSubmitted(false);
        setError(null);
        setFormData({
            issue: '',
            brand: '',
            description: '',
            name: '',
            email: '',
            phone: ''
        });
    };

    const handleClose = () => {
        setIsOpen(false);
        if (onClose) onClose();
    };

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleSelect = (field, value) => {
        setFormData({ ...formData, [field]: value });
        setTimeout(() => handleNext(), 300);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const payload = {
                brand: formData.brand || 'General',
                issue: formData.issue || 'General Inquiry',
                message: formData.description,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                facedBefore: 'No' // Default
            };

            const res = await api.post('/inquiries', payload);

            if (res.data.success) {
                setIsSubmitted(true);
            }
        } catch (err) {
            console.error("Submission failed", err);
            setError(err.response?.data?.message || 'Failed to submit. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Auto-open if show prop changes found to be handled in parent, 
    // but we can sync local state if needed. 
    // For now, local state controls visibility mostly.

    // Effect to respect parent's show prop if strictly needed
    React.useEffect(() => {
        if (show && !isOpen) {
            setIsOpen(true);
        }
    }, [show]);

    return (
        <>
            {/* Floating Chat Button */}
            {!isOpen && (
                <button className="chat-float-button" onClick={handleOpen}>
                    <FaComments />
                    <span className="chat-badge">Chat</span>
                </button>
            )}

            {/* Chatbot Window */}
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div>
                            <h3>Printer Support Chat</h3>
                            <p>We're here to help!</p>
                        </div>
                        <button className="close-button" onClick={handleClose}>
                            <FaTimes />
                        </button>
                    </div>

                    <div className="chatbot-body">
                        {!isSubmitted ? (
                            <>
                                {/* Step 1: Welcome & Select Issue */}
                                {step === 1 && (
                                    <div className="chat-step animate-fadeIn">
                                        <div className="bot-message">
                                            <p>👋 Hi! I'm here to help with your printer issue. Let's get started!</p>
                                            <p className="message-subtitle">What issue are you experiencing?</p>
                                        </div>
                                        <div className="options-grid">
                                            {issues.map((issue, index) => (
                                                <button
                                                    key={index}
                                                    className="option-button"
                                                    onClick={() => handleSelect('issue', issue)}
                                                >
                                                    {issue}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Select Brand */}
                                {step === 2 && (
                                    <div className="chat-step animate-fadeIn">
                                        <div className="bot-message">
                                            <p>Great! Which printer brand do you have?</p>
                                        </div>
                                        <div className="options-grid">
                                            {brands.map((brand, index) => (
                                                <button
                                                    key={index}
                                                    className="option-button"
                                                    onClick={() => handleSelect('brand', brand)}
                                                >
                                                    {brand}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Optional Description */}
                                {step === 3 && (
                                    <div className="chat-step animate-fadeIn">
                                        <div className="bot-message">
                                            <p>Tell us more about your issue (optional)</p>
                                        </div>
                                        <textarea
                                            className="chat-textarea"
                                            placeholder="Describe your printer issue..."
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            rows="3"
                                        />
                                        <button className="next-button" onClick={handleNext}>
                                            Continue
                                        </button>
                                    </div>
                                )}

                                {/* Step 4: Name */}
                                {step === 4 && (
                                    <div className="chat-step animate-fadeIn">
                                        <div className="bot-message">
                                            <p>What's your name?</p>
                                        </div>
                                        <input
                                            type="text"
                                            className="chat-input"
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                        <button
                                            className="next-button"
                                            onClick={handleNext}
                                            disabled={!formData.name}
                                        >
                                            Continue
                                        </button>
                                    </div>
                                )}

                                {/* Step 5: Email - NEW STEP */}
                                {step === 5 && (
                                    <div className="chat-step animate-fadeIn">
                                        <div className="bot-message">
                                            <p>Thanks, {formData.name}. What is your email address?</p>
                                        </div>
                                        <input
                                            type="email"
                                            className="chat-input"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                        <button
                                            className="next-button"
                                            onClick={handleNext}
                                            disabled={!formData.email}
                                        >
                                            Continue
                                        </button>
                                    </div>
                                )}

                                {/* Step 6: Phone & Submit */}
                                {step === 6 && (
                                    <div className="chat-step animate-fadeIn">
                                        <div className="bot-message">
                                            <p>Finally, please enter your phone number so our expert can contact you directly.</p>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <input
                                                type="tel"
                                                className="chat-input"
                                                placeholder="Enter your phone number"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                required
                                            />
                                            {error && <div className="error-message" style={{ color: 'red', fontSize: '0.85rem', marginTop: '10px' }}>{error}</div>}
                                            <button
                                                type="submit"
                                                className="submit-button"
                                                disabled={!formData.phone || loading}
                                            >
                                                {loading ? 'Submitting...' : 'Connect with Expert'}
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </>
                        ) : (
                            /* Success Message */
                            <div className="chat-step animate-fadeIn">
                                <div className="success-message">
                                    <div className="success-icon">
                                        <FaCheck />
                                    </div>
                                    <h3>Request Received!</h3>
                                    <p>An expert will contact you shortly to help resolve your {formData.issue} issue with your {formData.brand} printer.</p>
                                    <button className="close-chat-button" onClick={handleClose} style={{ marginTop: '20px', padding: '10px 20px', border: 'none', background: '#e2e8f0', borderRadius: '8px', cursor: 'pointer' }}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;

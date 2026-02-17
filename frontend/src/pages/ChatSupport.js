import React, { useState } from 'react';
import hpLogo from '../assets/brands/hp.png';
import canonLogo from '../assets/brands/canon.png';
import epsonLogo from '../assets/brands/epson.png';
import brotherLogo from '../assets/brands/brother.png';
import './ChatSupport.css';

import api from '../services/api'; // Import API

const ChatSupport = () => {
  const [step, setStep] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [facedBefore, setFacedBefore] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const brands = [
    { name: 'HP', logo: hpLogo },
    { name: 'Canon', logo: canonLogo },
    { name: 'Epson', logo: epsonLogo },
    { name: 'Brother', logo: brotherLogo }
  ];

  const issues = [
    'Printer Offline',
    'Printer Not Printing',
    'WiFi Setup',
    'Driver Issues',
    'Paper Jam',
    'Scanner Issues',
    'Error Codes',
    'Installation'
  ];

  /* ========== Chat Logic ========== */
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { text: "👋 Hi! I’m here to help with your printer issue.", sender: 'bot' },
    { text: "Please answer a few quick questions to connect with an expert.", sender: 'bot', isHighlight: true }
  ]);
  const [chatStep, setChatStep] = useState('query'); // query, name, email, phone, done
  const [chatData, setChatData] = useState({
    message: '',
    name: '',
    email: '',
    phone: '',
    brand: 'General', // Default if using chat only
    issue: 'Chat Inquiry'
  });

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;

    // Add user message to chat immediately
    const userMsg = { text: chatInput, sender: 'user' };
    setChatMessages(prev => [...prev, userMsg]);

    // Process based on current step
    if (chatStep === 'query') {
      const msg = chatInput;
      setChatData(prev => ({ ...prev, message: msg }));
      setFormData(prev => ({ ...prev, message: msg })); // Sync with form

      setChatInput('');
      setTimeout(() => {
        setChatMessages(prev => [...prev, { text: "I can help with that. To connect you with the right expert, please tell me your full name.", sender: 'bot' }]);
      }, 500);
      setChatStep('name');
    }
    else if (chatStep === 'name') {
      const name = chatInput;
      setChatData(prev => ({ ...prev, name }));
      setFormData(prev => ({ ...prev, name })); // Sync

      setChatInput('');
      setTimeout(() => {
        setChatMessages(prev => [...prev, { text: `Nice to meet you, ${name}. What is your email address?`, sender: 'bot' }]);
      }, 500);
      setChatStep('email');
    }
    else if (chatStep === 'email') {
      const email = chatInput;
      setChatData(prev => ({ ...prev, email }));
      setFormData(prev => ({ ...prev, email })); // Sync

      setChatInput('');
      setTimeout(() => {
        setChatMessages(prev => [...prev, { text: "Thanks. Finally, what is your phone number?", sender: 'bot' }]);
      }, 500);
      setChatStep('phone');
    }
    else if (chatStep === 'phone') {
      const phone = chatInput;
      const finalData = { ...chatData, phone };
      setFormData(prev => ({ ...prev, phone })); // Sync

      setChatInput('');
      setChatMessages(prev => [...prev, { text: "Connecting you to an expert...", sender: 'bot' }]);

      try {
        const res = await api.post('/inquiries', finalData);
        if (res.data.success) {
          setTimeout(() => {
            setChatMessages(prev => [...prev, { text: "✅ We have received your request. An expert will connect with you shortly!", sender: 'bot', isHighlight: true }]);
          }, 1000);
          setChatStep('done');
        }
      } catch (err) {
        console.error(err);
        setChatMessages(prev => [...prev, { text: "❌ Failed to submit. Please try again.", sender: 'bot' }]);
      }
    }
  };

  /* ========== Wizard Logic ========== */
  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill all details");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        brand: selectedBrand || 'General',
        issue: selectedIssue || 'General Inquiry',
        facedBefore,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      };

      const res = await api.post('/inquiries', payload);

      if (res.data.success) {
        alert("Your request has been submitted! Our expert will contact you shortly.");
        // Reset form
        setStep(1);
        setSelectedBrand(null);
        setSelectedIssue(null);
        setFacedBefore(null);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }
    } catch (err) {
      console.error("Submission failed", err);
      alert(err.response?.data?.message || "Failed to submit inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-support-page">

      {/* ================= HERO SECTION ================= */}
      <section className="chat-hero">
        <div className="container">
          <h1>Chat With Expert</h1>
          <p>Connect instantly with certified printer support specialists</p>
        </div>
      </section>

      {/* ================= MAIN SECTION ================= */}
      <div className="container chat-support-wrapper">

        {/* LEFT SIDE – LIVE CHAT PREVIEW */}
        <div className="chat-preview">

          <div className="agent-header">
            {/*<img
             src=""
              alt="Agent"
              className="agent-avatar"
            />*/}
            <div>
              <h4>Certified Support Agent</h4>
              <span className="online-status">● Online • Ready to Help</span>
            </div>
          </div>

          <div className="chat-preview-body">
            {/* Dynamic Chat Messages */}
            {chatMessages.map((msg, index) => (
              <div key={index} className={`bot-msg ${msg.sender === 'user' ? 'user-msg' : ''} ${msg.isHighlight ? 'highlight' : ''}`}>
                {msg.text}
              </div>
            ))}

            {/* Typing Indicator if needed (optional) */}
          </div>

          <div className="chat-preview-input">
            <input
              type="text"
              placeholder="Type your issue here..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
            />
            <button onClick={handleChatSend}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
              </svg>
            </button>
          </div>

        </div>

        {/* RIGHT SIDE – FORM STEPS */}
        <div className="chat-form-box">

          <h2>Get Instant Printer Support</h2>

          <div className="step-indicator">
            Step {step} of 4
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <h4>Select Your Printer Brand</h4>
              <div className="brand-grid">
                {brands.map((brand, index) => (
                  <div
                    key={index}
                    className={`brand-option ${selectedBrand === brand.name ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedBrand(brand.name);
                      setStep(2);
                    }}
                  >
                    <img src={brand.logo} alt={brand.name} />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <h4>What Issue Are You Facing?</h4>
              <div className="issue-grid">
                {issues.map((issue, index) => (
                  <button
                    key={index}
                    className="issue-option"
                    onClick={() => {
                      setSelectedIssue(issue);
                      setStep(3);
                    }}
                  >
                    {issue}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <h4>Have You Faced This Before?</h4>
              <div className="yes-no-buttons">
                <button
                  className="primary-btn"
                  onClick={() => {
                    setFacedBefore("Yes");
                    setStep(4);
                  }}
                >
                  Yes
                </button>
                <button
                  className="outline-btn"
                  onClick={() => {
                    setFacedBefore("No");
                    setStep(4);
                  }}
                >
                  No
                </button>
              </div>
            </>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <>
              <h4>Enter Your Details</h4>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>Detailed Description</label>
                <textarea
                  placeholder="Describe your issue (Optional)"
                  rows="4"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', resize: 'vertical' }}
                />
              </div>

              <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Submitting...' : 'Submit & Connect to Expert'}
              </button>
            </>
          )}

        </div>
      </div>

      {/* ================= TRUST LINE ================= */}
      <div className="chat-trust-line">
        We have successfully resolved over 10,000+ printer issues.
      </div>

    </div>
  );
};

export default ChatSupport;

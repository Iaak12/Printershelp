import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IssueCard from '../components/IssueCard';
import api from '../services/api';
import icon from '../assets/service/icon.png';
import technial from '../assets/service/technial.png';
import './Services.css';

const Services = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services');
        if (res.data.success) {
          setServices(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch services', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const goToChat = () => {
    navigate('/chat-support');
    window.scrollTo(0, 0);
  };

  return (
    <div className="services-page">

      {/* HERO */}
      <section className="services-hero">
        <div className="container">
          <h1>Printer Support Services</h1>
          <p>
            Professional troubleshooting assistance for all major printer brands.
          </p>
        </div>
      </section>


      {/* ISSUE GRID */}
      <section className="section section-gray">
        <div className="container">
          <h2 className="section-title text-center">
            Common Printer Issues We Resolve
          </h2>

          <div className="issues-grid">
            {loading ? (
              <div className="text-center">Loading services...</div>
            ) : (
              services.map((service, index) => (
                <IssueCard
                  key={service._id || index}
                  issue={service.title}
                  path={`/services/${service.slug}`}
                  icon={service.icon}
                />
              ))
            )}
          </div>

          <div className="text-center" style={{ marginTop: 'var(--spacing-2xl)' }}>
            <button
              className="btn btn-primary btn-large"
              onClick={goToChat}
            >
              Fix My Printer Issue
            </button>
          </div>
        </div>
      </section>


      {/* ================= 24/7 REMOTE SUPPORT SECTION ================= */}
      <section className="remote-support-section">
        <div className="container remote-support-wrapper">

          {/* LEFT ICON */}
          <div className="remote-support-icon">
            <img src={icon} alt="24/7 Support" />
          </div>

          {/* CONTENT */}
          <div className="remote-support-content">
            <h2>24/7 Remote Support Available</h2>
            <p>
              Get help anytime with our 24/7 remote support.
              Solve your printer issues quickly without leaving your home or office.
            </p>
            <button
              className="btn btn-light"
              onClick={goToChat}
            >
              Connect with Expert
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="remote-support-image">
            <img src={technial} alt="Technical Support Expert" />
          </div>

        </div>
      </section>

    </div>
  );
};

export default Services;

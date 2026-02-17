import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BrandCard.css';

const BrandCard = ({ brand, logo }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        const slug = brand.toLowerCase().replace(/\s+/g, '-');
        navigate(`/brands/${slug}-printer-support`);
    };

    return (
        <div className="brand-card" onClick={handleClick}>
            <div className="brand-logo-wrapper">
                <img 
                    src={logo} 
                    alt={`${brand} logo`} 
                    className="brand-logo" 
                />
            </div>

            <h3 className="brand-name"> Printers</h3>
            <p className="brand-subtitle">Expert Support</p>
        </div>
    );
};

export default BrandCard;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import './CategoryCard.css';

const CategoryCard = ({ category }) => {
    const navigate = useNavigate();

    // Get the icon component dynamically
    const IconComponent = FaIcons[category.icon] || FaIcons.FaLaptop;

    const handleClick = () => {
        navigate(`/category/${category._id}`);
    };

    return (
        <div className="category-card" onClick={handleClick}>
            <div className="category-icon">
                <IconComponent />
            </div>
            <h3 className="category-name">{category.name}</h3>
            <p className="category-count">
                <span>{category.questionCount || 0}</span> questions
            </p>
        </div>
    );
};

export default CategoryCard;

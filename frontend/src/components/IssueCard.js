import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPowerOff, FaPrint, FaWifi, FaCog, FaFileAlt, FaExclamationTriangle, FaTools } from 'react-icons/fa';
import { BiScan } from 'react-icons/bi';
import './IssueCard.css';

const IssueCard = ({ issue, path }) => {
    const navigate = useNavigate();

    const issueIcons = {
        'Printer Offline Issues': FaPowerOff,
        'Printer Not Printing': FaPrint,
        'Wireless / WiFi Printer Setup': FaWifi,
        'Printer Driver & Software Issues': FaCog,
        'Printer Paper Jam Issues': FaFileAlt,
        'Printer Scanner Not Working': BiScan,
        'Printer Error Codes': FaExclamationTriangle,
        'Printer Installation & Setup': FaTools
    };

    const Icon = issueIcons[issue] || FaTools;

    return (
        <div className="issue-card" onClick={() => navigate(path)}>
            <div className="issue-icon">
                <Icon />
            </div>
            <h4 className="issue-title">{issue}</h4>
            <p className="issue-cta">Get Help →</p>
        </div>
    );
};

export default IssueCard;

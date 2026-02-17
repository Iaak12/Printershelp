import React from 'react';
import { FaFileAlt, FaScan, FaExclamationTriangle, FaTools } from 'react-icons/fa';
import ServicePageTemplate from './ServicePageTemplate';

export const PaperJam = () => (
    <ServicePageTemplate
        icon={FaFileAlt}
        title="Printer Paper Jam Issues"
        description="Paper jams are frustrating and common. Learn how to safely remove jammed paper and prevent future jams with expert guidance."
        issues={['Paper jam removal', 'Preventing future jams', 'Feed roller issues', 'Paper tray problems']}
        slug="paper jam issues"
    />
);

export const ScannerIssues = () => (
    <ServicePageTemplate
        icon={FaScan}
        title="Printer Scanner Not Working"
        description="When your printer's scanner stops working, it can disrupt your workflow. Get help with scanner connectivity, software issues, and configuration."
        issues={['Scanner not detected', 'Scan quality problems', 'Scanner software issues', 'Connection problems']}
        slug="scanner issues"
    />
);

export const ErrorCodes = () => (
    <ServicePageTemplate
        icon={FaExclamationTriangle}
        title="Printer Error Codes"
        description="Printer error codes can be confusing. Our experts help you understand what error codes mean and how to resolve them."
        issues={['Error code interpretation', 'Common error solutions', 'Hardware error diagnosis', 'Software error fixes']}
        slug="error codes"
    />
);

export const Installation = () => (
    <ServicePageTemplate
        icon={FaTools}
        title="Printer Installation & Setup"
        description="Get your new printer up and running with professional installation and setup support for all major brands."
        issues={['New printer setup', 'Driver installation', 'Network configuration', 'Initial calibration']}
        slug="installation and setup"
    />
);

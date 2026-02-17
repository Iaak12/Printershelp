import React from 'react';
import { MdScanner } from 'react-icons/md';
import ServicePageTemplate from './ServicePageTemplate';

const ScannerIssues = () => {
    return (
        <ServicePageTemplate
            icon={MdScanner}
            title="Printer Scanner Not Working"
            description="When your printer's scanner stops working, it can disrupt your workflow. Get help with scanner connectivity, software issues, and configuration."
            issues={['Scanner not detected', 'Scan quality problems', 'Scanner software issues', 'Connection problems']}
            slug="scanner issues"
        />
    );
};

export default ScannerIssues;

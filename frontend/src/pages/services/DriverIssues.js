import React from 'react';
import { FaCog } from 'react-icons/fa';
import ServicePageTemplate from './ServicePageTemplate';

const DriverIssues = () => {
    return (
        <ServicePageTemplate
            icon={FaCog}
            title="Printer Driver & Software Issues"
            description="Driver and software problems can prevent your printer from working correctly. Our support team helps with driver installation, updates, compatibility issues, and software conflicts."
            issues={[
                'Driver installation and updates',
                'Compatibility problems',
                'Software conflicts',
                'Missing or corrupted drivers'
            ]}
            slug="driver and software issues"
        />
    );
};

export default DriverIssues;

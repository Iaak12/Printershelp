import React from 'react';
import { FaTools } from 'react-icons/fa';
import ServicePageTemplate from './ServicePageTemplate';

const Installation = () => {
    return (
        <ServicePageTemplate
            icon={FaTools}
            title="Printer Installation & Setup"
            description="Get your new printer up and running with professional installation and setup support for all major brands."
            issues={['New printer setup', 'Driver installation', 'Network configuration', 'Initial calibration']}
            slug="installation and setup"
        />
    );
};

export default Installation;

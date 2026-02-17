import React from 'react';
import { FaWifi } from 'react-icons/fa';
import ServicePageTemplate from './ServicePageTemplate';

const WirelessSetup = () => {
    return (
        <ServicePageTemplate
            icon={FaWifi}
            title="Wireless & WiFi Printer Setup Support"
            description="Setting up a wireless printer can be complex. Our experts guide you through WiFi configuration, network troubleshooting, and ensuring your printer connects reliably to your wireless network."
            issues={[
                'WiFi printer setup and configuration',
                'Network connectivity problems',
                'Wireless signal issues',
                'Router compatibility checks'
            ]}
            slug="wireless printer setup"
        />
    );
};

export default WirelessSetup;

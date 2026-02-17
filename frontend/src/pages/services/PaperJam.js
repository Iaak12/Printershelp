import React from 'react';
import { FaFileAlt } from 'react-icons/fa';
import ServicePageTemplate from './ServicePageTemplate';

const PaperJam = () => {
    return (
        <ServicePageTemplate
            icon={FaFileAlt}
            title="Printer Paper Jam Issues"
            description="Paper jams are frustrating and common. Learn how to safely remove jammed paper and prevent future jams with expert guidance."
            issues={['Paper jam removal', 'Preventing future jams', 'Feed roller issues', 'Paper tray problems']}
            slug="paper jam issues"
        />
    );
};

export default PaperJam;

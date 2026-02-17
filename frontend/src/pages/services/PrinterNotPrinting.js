import React from 'react';
import { FaPrint } from 'react-icons/fa';
import ServicePageTemplate from './ServicePageTemplate';

const PrinterNotPrinting = () => {
    return (
        <ServicePageTemplate
            icon={FaPrint}
            title="Printer Not Printing – Troubleshooting & Solutions"
            description="When your printer won't print, it can be frustrating. Common causes include driver issues, connectivity problems, empty cartridges, or print queue errors. Our experts help diagnose and resolve printing problems quickly."
            issues={[
                'Printer not responding to print commands',
                'Print jobs stuck in queue',
                'Blank pages printing',
                'Partial or incomplete prints'
            ]}
            slug="printer not printing issues"
        />
    );
};

export default PrinterNotPrinting;

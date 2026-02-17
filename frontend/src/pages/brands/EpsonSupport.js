import React from 'react';
import BrandPageTemplate from './BrandPageTemplate';
import epsonLogo from '../../assets/brands/epson.png'; // Make sure this path is correct

const EpsonSupport = () => (
    <BrandPageTemplate
        
        brandImage={epsonLogo}
        description="Expert support for Epson EcoTank, WorkForce, and Expression printers. Professional help with setup, drivers, and troubleshooting."
    />
);

export default EpsonSupport;

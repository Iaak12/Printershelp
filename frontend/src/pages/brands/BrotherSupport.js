import React from 'react';
import BrandPageTemplate from './BrandPageTemplate';
import brotherLogo from '../../assets/brands/brother.png'; // check path

const BrotherSupport = () => (
    <BrandPageTemplate
       
        brandImage={brotherLogo}
        description="Comprehensive support for Brother MFC, DCP, and HL series printers. Get help with wireless setup, drivers, and common issues."
    />
);

export default BrotherSupport;

import React from 'react';
import BrandPageTemplate from './BrandPageTemplate';
import canonLogo from '../../assets/brands/canon.png'; // check path

const CanonSupport = () => (
    <BrandPageTemplate
       
        brandImage={canonLogo}
        description="Specialized support for Canon PIXMA, ImageCLASS, and MAXIFY printers. Expert assistance with printing, scanning, and connectivity issues."
    />
);

export default CanonSupport;

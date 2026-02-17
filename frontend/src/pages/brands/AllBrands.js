import React from 'react';
import BrandPageTemplate from './BrandPageTemplate';

export const HPSupport = () => (
    <BrandPageTemplate
        brandName="HP"
        brandColor="#0096D6"
        description="Professional support for HP printers including LaserJet, OfficeJet, DeskJet, and Envy series. Get expert help with setup, troubleshooting, and maintenance."
    />
);

export const CanonSupport = () => (
    <BrandPageTemplate
        brandName="Canon"
        brandColor="#CC0000"
        description="Specialized support for Canon PIXMA, ImageCLASS, and MAXIFY printers. Expert assistance with printing, scanning, and connectivity issues."
    />
);

export const EpsonSupport = () => (
    <BrandPageTemplate
        brandName="Epson"
        brandColor="#003DA5"
        description="Expert support for Epson EcoTank, WorkForce, and Expression printers. Professional help with setup, drivers, and troubleshooting."
    />
);

export const BrotherSupport = () => (
    <BrandPageTemplate
        brandName="Brother"
        brandColor="#005BAA"
        description="Comprehensive support for Brother MFC, DCP, and HL series printers. Get help with wireless setup, drivers, and common issues."
    />
);

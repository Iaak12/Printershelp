import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import ServicePageTemplate from './ServicePageTemplate';

const ErrorCodes = () => {
    return (
        <ServicePageTemplate
            icon={FaExclamationTriangle}
            title="Printer Error Codes"
            description="Printer error codes can be confusing. Our experts help you understand what error codes mean and how to resolve them."
            issues={['Error code interpretation', 'Common error solutions', 'Hardware error diagnosis', 'Software error fixes']}
            slug="error codes"
        />
    );
};

export default ErrorCodes;

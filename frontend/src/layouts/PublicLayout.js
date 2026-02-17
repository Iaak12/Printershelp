import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';

const PublicLayout = () => {
    const [showChatbot, setShowChatbot] = useState(false);

    useEffect(() => {
        // Auto-open chatbot after 6 seconds
        const timer = setTimeout(() => {
            setShowChatbot(true);
        }, 6000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="public-layout">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
            <Chatbot show={showChatbot} onClose={() => setShowChatbot(false)} onOpen={() => setShowChatbot(true)} />
        </div>
    );
};

export default PublicLayout;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import FAQ from './pages/FAQ';
import ChatSupport from './pages/ChatSupport';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';

// Service Pages
import PrinterOffline from './pages/services/PrinterOffline';
import PrinterNotPrinting from './pages/services/PrinterNotPrinting';
import WirelessSetup from './pages/services/WirelessSetup';
import DriverIssues from './pages/services/DriverIssues';
import PaperJam from './pages/services/PaperJam';
import ScannerIssues from './pages/services/ScannerIssues';
import ErrorCodes from './pages/services/ErrorCodes';
import Installation from './pages/services/Installation';

// Brand Pages
import HPSupport from './pages/brands/HPSupport';
import CanonSupport from './pages/brands/CanonSupport';
import EpsonSupport from './pages/brands/EpsonSupport';
import BrotherSupport from './pages/brands/BrotherSupport';

// Legal Pages
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Disclaimer from './pages/Disclaimer';

// Admin Pages
import Login from './pages/admin/Login';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminHomeEditor from './pages/admin/AdminHomeEditor';
import AdminAboutEditor from './pages/admin/AdminAboutEditor';
import ManageServices from './pages/admin/ManageServices';
import ServiceEditor from './pages/admin/ServiceEditor';
import PageManager from './pages/admin/PageManager';
import PageEditor from './pages/admin/PageEditor';
import ManageFAQs from './pages/admin/ManageFAQs';
import FAQEditor from './pages/admin/FAQEditor';
import ManageBlogs from './pages/admin/ManageBlogs';
import BlogEditor from './pages/admin/BlogEditor';
import ManageInquiries from './pages/admin/ManageInquiries';
import AdminRoute from './components/admin/AdminRoute';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Public Routes wrapped in PublicLayout */}
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogDetail />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/chat-support" element={<ChatSupport />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/services/:slug" element={<ServiceDetail />} />

                        {/* Service Routes */}
                        <Route path="/services/printer-offline" element={<PrinterOffline />} />
                        <Route path="/services/printer-not-printing" element={<PrinterNotPrinting />} />
                        <Route path="/services/wireless-setup" element={<WirelessSetup />} />
                        <Route path="/services/driver-issues" element={<DriverIssues />} />
                        <Route path="/services/paper-jam" element={<PaperJam />} />
                        <Route path="/services/scanner-issues" element={<ScannerIssues />} />
                        <Route path="/services/error-codes" element={<ErrorCodes />} />
                        <Route path="/services/installation" element={<Installation />} />

                        {/* Brand Routes */}
                        <Route path="/brands/hp-printer-support" element={<HPSupport />} />
                        <Route path="/brands/canon-printer-support" element={<CanonSupport />} />
                        <Route path="/brands/epson-printer-support" element={<EpsonSupport />} />
                        <Route path="/brands/brother-printer-support" element={<BrotherSupport />} />

                        {/* Legal Routes */}
                        <Route path="/privacy-policy" element={<Privacy />} />
                        <Route path="/terms-conditions" element={<Terms />} />
                        <Route path="/disclaimer" element={<Disclaimer />} />
                    </Route>

                    {/* Admin Routes - No Header/Footer */}
                    <Route path="/admin/login" element={<Login />} />
                    <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
                        <Route index element={<Navigate to="/admin/dashboard" replace />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="home-page" element={<AdminHomeEditor />} />
                        <Route path="about-page" element={<AdminAboutEditor />} />
                        <Route path="services" element={<ManageServices />} />
                        <Route path="services/new" element={<ServiceEditor />} />
                        <Route path="services/edit/:id" element={<ServiceEditor />} />
                        <Route path="pages" element={<PageManager />} />
                        <Route path="pages/new" element={<PageEditor />} />
                        <Route path="pages/edit/:slug" element={<PageEditor />} />
                        <Route path="faqs" element={<ManageFAQs />} />
                        <Route path="faqs/new" element={<FAQEditor />} />
                        <Route path="faqs/edit/:id" element={<FAQEditor />} />
                        <Route path="blogs" element={<ManageBlogs />} />
                        <Route path="blogs/new" element={<BlogEditor />} />
                        <Route path="blogs/edit/:id" element={<BlogEditor />} />
                        <Route path="inquiries" element={<ManageInquiries />} />
                        <Route path="countries" element={<div style={{ padding: '20px' }}>Countries Management (Coming Soon)</div>} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;

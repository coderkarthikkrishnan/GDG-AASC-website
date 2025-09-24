// src/components/Footer.jsx
import React from 'react';
import '../styles/footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">

                <div className="footer-links">
                    <a
                        href="https://www.instagram.com/gdg_aasc/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                    >
                        Instagram
                    </a>
                    <a
                        href="https://www.linkedin.com/company/bca-alpha-arts-and-science-college/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                    >
                        LinkedIn
                    </a>
                </div>
                <p>&copy; {new Date().getFullYear()} GDG AASC. All rights reserved.</p>
                <p>Build by Karthik krishnan GS.</p>
            </div>
        </footer>
    );
};

export default Footer;

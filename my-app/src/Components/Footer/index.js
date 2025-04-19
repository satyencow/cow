import React, { useEffect, useState } from "react";
import "./styles.css"; // Import the footer styles

const Footer = () => {
    const [bgColor, setBgColor] = useState("transparent");

    useEffect(() => {
        const updateFooterColor = () => {
            let sections = document.querySelectorAll("section");

            sections.forEach(section => {
                let rect = section.getBoundingClientRect();
                if (rect.bottom >= window.innerHeight / 2) {
                    let bgColor = window.getComputedStyle(section).backgroundColor;
                    setBgColor(bgColor);
                }
            });
        };

        window.addEventListener("scroll", updateFooterColor);
        return () => window.removeEventListener("scroll", updateFooterColor);
    }, []);

    return (
        <footer id="footer" style={{ background: bgColor }}>
            &copy; {new Date().getFullYear()} COW. All rights reserved.
        </footer>
    );
};

export default Footer;

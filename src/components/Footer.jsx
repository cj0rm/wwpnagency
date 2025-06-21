import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const emailJsServiceId = 'service_ede84th';
const emailJsTemplateId = 'template_ypqwho4';
const emailJsPublicKey = 'Po_iya3V38Ko_II11';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const templateParams = {
      email: email,
      name: 'Newsletter Subscriber',
      service: 'Newsletter',
      message: `Please add ${email} to the newsletter list.`,
    };

    emailjs.send(emailJsServiceId, emailJsTemplateId, templateParams, emailJsPublicKey)
      .then((result) => {
          console.log('Newsletter subscription successful!', result.text);
          setIsSubmitted(true);
          setTimeout(() => {
            setIsSubmitted(false);
            setEmail('');
          }, 3000);
      }, (error) => {
          console.log('Newsletter subscription failed.', error.text);
          alert('Sorry, something went wrong. Please try again later.');
      });
  };

  return (
    <footer className="relative bg-black/50 backdrop-blur-lg border-t border-white/10 text-white py-12 mt-20 z-50">
      <div className="container-mobile grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div className="md:col-span-1">
          <h3 className="text-xl font-bold mb-4">WWPN Agency</h3>
          <p className="text-gray-400">
            Creative Digital Solutions for the modern era. We build experiences that inspire.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/web-development" className="text-gray-400 hover:text-white transition-colors">Web Dev</Link></li>
            <li><Link to="/graphic-design" className="text-gray-400 hover:text-white transition-colors">Design</Link></li>
            <li><Link to="/3d-projects" className="text-gray-400 hover:text-white transition-colors">3D</Link></li>
            <li><Link to="/motion-graphics" className="text-gray-400 hover:text-white transition-colors">Motion</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2">
            <li>
              <a href="mailto:faisalhaitham1123@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                faisalhaitham1123@gmail.com
              </a>
            </li>
            <li>
              <a href="https://wa.me/96896540991" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Join Our Newsletter</h3>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="cal-input w-full mb-2"
                required
              />
              <button type="submit" className="pixel-btn w-full">Subscribe</button>
            </form>
          ) : (
            <p className="text-green-400">Thank you for subscribing!</p>
          )}
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="container-mobile mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-center">
        <p className="text-gray-500 text-sm mb-4 sm:mb-0">
          &copy; {new Date().getFullYear()} WWPN Agency. All Rights Reserved.
        </p>
        <div className="flex items-center space-x-4">
          <a href="https://www.instagram.com/wwpn/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram className="text-2xl text-gray-400 hover:text-white transition-colors" />
          </a>
          <a href="https://wa.me/96896540991" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <FaWhatsapp className="text-2xl text-gray-400 hover:text-white transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
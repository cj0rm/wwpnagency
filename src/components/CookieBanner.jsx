import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setTimeout(() => {
        setIsVisible(true);
      }, 2000); // Delay banner appearance
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 max-w-lg p-6 bg-black/50 backdrop-blur-lg border border-white/10 rounded-lg shadow-2xl z-50"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="text-2xl">🍪</div>
            <div className="flex-grow">
              <h3 className="font-bold text-white">Cookie Consent</h3>
              <p className="text-gray-300 text-sm mt-1">
                We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
              </p>
            </div>
            <button
              onClick={handleAccept}
              className="pixel-btn mt-2 md:mt-0 w-full md:w-auto flex-shrink-0"
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner; 
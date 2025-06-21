import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { HeadProvider, Title, Meta } from 'react-head';
import emailjs from '@emailjs/browser';
import CheckoutForm from './components/CheckoutForm';
import InteractiveFeatures from './components/InteractiveFeatures';
import CatLogo from './assets/cat-logo.png';
import CatImage1 from './assets/catwwpn.png';
import CatImage2 from './assets/catwwpn1.png';
import CatImage3 from './assets/catwwpn2.png';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import LoadingScreen from './components/LoadingScreen';

// Helper for EmailJS - replace with your actual credentials
const emailJsServiceId = 'service_ede84th';
const emailJsTemplateId = 'template_ypqwho4';
const emailJsPublicKey = 'Po_iya3V38Ko_II11';

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Futuristic Scroll to Top Button
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.button
      className="scroll-to-top-btn"
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20
      }}
      whileHover={{ 
        scale: 1.1,
        boxShadow: "0 0 30px rgba(255,255,255,0.4)"
      }}
      whileTap={{ scale: 0.9 }}
      transition={{ 
        duration: 0.3,
        ease: "easeInOut"
      }}
    >
      <motion.div
        className="scroll-arrow"
        animate={{
          y: [0, -3, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        ↑
      </motion.div>
      <motion.div
        className="scroll-glow"
        animate={{
          opacity: [0.3, 0.8, 0.3],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.button>
  );
};

// Enhanced Background Components
const PixelBackground = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [0.3, 0.1]);

  return (
    <motion.div 
      className="pixel-background" 
      style={{ y, opacity }}
    ></motion.div>
  );
};

// CustomCursor component removed - using default browser cursor

// Enhanced Header - Always Visible
const Header = ({ theme, toggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  return (
    <header className="fixed-header">
      <div className="header-content">
        <div className="logo-section">
          <Link to="/" className="logo-pill">
            <img src={CatLogo} alt="WWPN Agency" className="logo-img" />
            <span className="logo-text">WWPN Agency</span>
          </Link>
          <div className="header-tagline">Creative Digital Solutions</div>
        </div>
        
        <button
          className="hamburger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          tabIndex={0}
          style={{ display: 'none' }}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="hamburger-bar" style={{ transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none' }} />
          <span className="hamburger-bar" style={{ opacity: menuOpen ? 0 : 1 }} />
          <span className="hamburger-bar" style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }} />
        </button>
        
        <nav className="header-nav" id="main-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/web-development" className="nav-link">Web Dev</Link>
          <Link to="/graphic-design" className="nav-link">Design</Link>
          <Link to="/3d-projects" className="nav-link">3D</Link>
          <Link to="/motion-graphics" className="nav-link">Motion</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>
        <div className="theme-toggle-section">
          <button 
            onClick={toggleTheme} 
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            <div className={`theme-dot ${theme === 'light' ? 'active' : ''}`}></div>
          </button>
        </div>
      </div>
    </header>
  );
};


// Main Page Sections (Re-styled with new classes)

// Enhanced Hero Section with cutting-edge animations
const HeroSection = () => {
  const catImages = [CatImage1, CatImage2, CatImage3];

  return (
    <section className="hero-section relative overflow-hidden min-h-screen">
      {/* Futuristic Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="pixel-grid opacity-30"
          animate={{ 
            backgroundPosition: ['0px 0px', '-200px -200px', '0px 0px']
          }}
          transition={{ 
            duration: 40, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        
        {/* Floating Cat Images */}
        <div className="absolute inset-0 pointer-events-none">
          {catImages.map((cat, i) => {
            const size = 60 + Math.random() * 50; // Random size between 60px and 110px
            return (
              <motion.img
                key={i}
                src={cat}
                alt={`Pixelated Cat ${i + 1}`}
                className="absolute"
                style={{
                  top: `${10 + Math.random() * 70}%`,
                  left: `${5 + Math.random() * 80}%`,
                  width: `${size}px`,
                  height: 'auto',
                }}
                animate={{
                  y: [0, Math.random() * 40 - 20, 0],
                  rotate: [Math.random() * -10, Math.random() * 10, Math.random() * -10],
                }}
                transition={{
                  duration: 8 + Math.random() * 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2
                }}
              />
            );
          })}
        </div>

        {/* Creative Floating 3D Cubes */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`cube-${i}`}
            className="floating-pixel-cube"
            style={{
              top: `${10 + Math.random() * 80}%`,
              left: `${10 + Math.random() * 80}%`,
              '--duration': `${15 + Math.random() * 10}s`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 0.2 + Math.random() * 0.8,
              opacity: 0.3 + Math.random() * 0.4,
              y: [0, Math.random() * 40 - 20, 0],
            }}
            transition={{
              scale: { duration: 2, delay: i * 0.1 },
              opacity: { duration: 2, delay: i * 0.1 },
              y: {
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <div className="cube">
              <div className="cube-face front"></div>
              <div className="cube-face back"></div>
              <div className="cube-face top"></div>
              <div className="cube-face bottom"></div>
              <div className="cube-face left"></div>
              <div className="cube-face right"></div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="container-mobile relative z-10 flex items-center justify-center min-h-screen">
        <motion.div 
          className="text-center max-w-6xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Animated Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium">Innovation in Motion</span>
          </motion.div>

          {/* Main Title with Glitch Effect */}
          <motion.h1 
            className="hero-title text-5xl sm:text-7xl md:text-9xl font-anton mb-6 sm:mb-8 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <motion.span
              className="block"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(255,255,255,0.5)",
                  "0 0 40px rgba(255,255,255,0.8)",
                  "0 0 20px rgba(255,255,255,0.5)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Creative
            </motion.span>
            <motion.span 
              className="block textGlow bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Digital
            </motion.span>
            <motion.span 
              className="block"
              animate={{ 
                filter: [
                  "hue-rotate(0deg)",
                  "hue-rotate(360deg)"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              Agency
            </motion.span>
          </motion.h1>
          
          {/* Subtitle with Typewriter Effect */}
          <motion.p 
            className="text-xl sm:text-2xl md:text-3xl text-gray-300 max-w-5xl mx-auto mb-8 sm:mb-12 px-4 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            We craft <span className="text-white font-semibold">exceptional digital experiences</span> that 
            <br className="hidden sm:block" />
            inspire, engage, and drive <span className="text-white font-semibold">real results</span>.
          </motion.p>

          {/* Stats Section */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {[
              { number: "500+", label: "Projects Delivered" },
              { number: "98%", label: "Client Satisfaction" },
              { number: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="text-3xl sm:text-4xl font-bold text-white mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + index * 0.2, type: "spring" }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 40px rgba(255,255,255,0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/contact" className="pixel-btn group text-lg px-8 py-4 relative overflow-hidden">
                <motion.span 
                  className="relative z-10"
                  whileHover={{
                    textShadow: "0 0 15px rgba(255,255,255,0.8)"
                  }}
                >
                  Start Your Project
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                  whileHover={{
                    x: ["-100%", "100%"],
                    opacity: [0, 0.4, 0]
                  }}
                  transition={{ duration: 0.8 }}
                />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/web-development" className="pixel-btn bg-transparent border-2 border-gray-600 hover:border-white text-lg px-8 py-4 group">
                <motion.span 
                  className="group-hover:scale-105 transition-transform duration-300"
                  whileHover={{
                    textShadow: "0 0 10px rgba(255,255,255,0.6)"
                  }}
                >
                  View Our Work
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-white/60 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Enhanced About Section with interactive elements
const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section 
      ref={ref}
      className="py-32 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 border border-white/10 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-32 h-32 border border-white/10 rounded-lg"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 0, 360]
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      <div className="container-mobile relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="text-sm font-medium">About WWPN Agency</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl sm:text-6xl md:text-7xl font-anton hero-title mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            We Don't Just Build
            <br />
            <span className="textGlow">We Create Magic</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            At WWPN Agency, we're not just another digital agency. We're a team of 
            <span className="text-white font-semibold"> passionate innovators</span> who believe that 
            every pixel, every line of code, and every animation should tell a story.
          </motion.p>
        </motion.div>

        {/* Interactive Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {[
            {
              icon: "🚀",
              title: "Lightning Fast",
              description: "We deliver projects at warp speed without compromising quality. Your vision becomes reality faster than you think.",
              stat: "3x Faster"
            },
            {
              icon: "🎯",
              title: "Pixel Perfect",
              description: "Every detail matters. We obsess over perfection, ensuring your brand looks flawless across all platforms.",
              stat: "99.9% Accuracy"
            },
            {
              icon: "💡",
              title: "Innovation First",
              description: "We stay ahead of the curve, using cutting-edge technologies to create experiences that set you apart.",
              stat: "Always Current"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="pixel-card text-center p-8 group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 1.2 + index * 0.2 }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                boxShadow: "0 20px 40px rgba(255,255,255,0.1)"
              }}
            >
              <motion.div 
                className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {feature.description}
              </p>
              <div className="pixel-btn">
                {feature.stat}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission Statement */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <motion.div
            className="max-w-4xl mx-auto p-8 pixel-card"
            whileHover={{ scale: 1.02 }}
          >
            <motion.h3 
              className="text-3xl sm:text-4xl font-anton mb-6"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(255,255,255,0.3)",
                  "0 0 30px rgba(255,255,255,0.5)",
                  "0 0 20px rgba(255,255,255,0.3)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Our Mission
            </motion.h3>
            <p className="text-xl text-gray-300 leading-relaxed">
              To transform businesses through <span className="text-white font-semibold">innovative digital solutions</span> that 
              not only meet expectations but exceed them. We believe in creating experiences that 
              <span className="text-white font-semibold"> inspire, engage, and convert</span>.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Contact Page
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    emailjs.send(emailJsServiceId, emailJsTemplateId, formData, emailJsPublicKey)
      .then((result) => {
          console.log('Email successfully sent!', result.text);
          setIsSubmitted(true);
      }, (error) => {
          console.log('Failed to send email.', error.text);
          alert('Sorry, something went wrong. Please try again later.');
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <div className="container-mobile main-content py-12 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-4xl font-anton hero-title mb-6">Thank You!</h1>
          <p className="text-xl text-gray-400 mb-8">
            We've received your message. Our team will get back to you within 24 hours.
          </p>
          <Link to="/" className="pixel-btn">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-mobile main-content py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-anton hero-title mb-6">Get In Touch</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Ready to start your project? Let's create something amazing together.
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                className="cal-input" 
                required 
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                className="cal-input" 
                required 
              />
            </div>
          </div>
          <div>
            <label htmlFor="service" className="block text-sm font-medium mb-2">Service Interest</label>
            <select 
              id="service" 
              name="service" 
              value={formData.service}
              onChange={handleChange}
              className="cal-input" 
              required
            >
              <option value="">Select a service</option>
              <option value="Web Development">Web Development</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="3D Projects">3D Projects</option>
              <option value="Motion Graphics">Motion Graphics</option>
              <option value="General Inquiry">General Inquiry</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
            <textarea 
              id="message" 
              name="message" 
              rows="6" 
              value={formData.message}
              onChange={handleChange}
              className="cal-input" 
              placeholder="Tell us about your project, goals, or any questions you have..."
              required
            ></textarea>
          </div>
          <button type="submit" className="pixel-btn w-full">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

// Enhanced Services Preview Section
const ServicesPreviewSection = () => {
  const services = [
    { 
      icon: "🌐", 
      title: "Web Development", 
      description: "Modern, responsive websites and web applications that drive results.",
      link: "/web-development",
      delay: 0.1
    },
    { 
      icon: "🎨", 
      title: "Graphic Design", 
      description: "Stunning visual identities and marketing materials that tell your story.",
      link: "/graphic-design",
      delay: 0.2
    },
    { 
      icon: "🎮", 
      title: "3D Projects", 
      description: "Immersive 3D models, animations, and visualizations that bring ideas to life.",
      link: "/3d-projects",
      delay: 0.3
    },
    { 
      icon: "📺", 
      title: "Motion Graphics", 
      description: "Coming soon – cinematic brand motion and visual storytelling that will revolutionize how your brand moves.",
      link: "/motion-graphics",
      delay: 0.4,
      comingSoon: true
    }
  ];

  return (
    <section className="py-16 sm:py-32">
      <div className="container-mobile">
        <motion.div 
          className="text-center mb-12 sm:mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-anton hero-title mb-4 sm:mb-8">Our Services</h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            We offer comprehensive digital solutions to help your business thrive in the digital age
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="pixel-card text-center p-6 sm:p-8 service-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: service.delay }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">{service.icon}</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{service.title}</h3>
              <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">{service.description}</p>
              
              {service.comingSoon ? (
                <div className="text-center">
                  <span className="text-sm text-gray-500 mb-2 block">Coming Soon</span>
                  <Link to={service.link} className="pixel-btn">
                    Stay Tuned
                  </Link>
                </div>
              ) : (
                <Link to={service.link} className="pixel-btn">
                  Learn More
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Enhanced CTA Section
const CTASection = () => {
  return (
    <motion.section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white/5 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 30, repeat: Infinity }}
        />
      </div>
      
      <div className="container-mobile relative z-10 text-center">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm font-medium">Ready to Start?</span>
        </motion.div>
        
        <motion.h2 
          className="text-4xl sm:text-6xl md:text-7xl font-anton hero-title mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Let's Create
          <br />
          <span className="textGlow">Something Amazing</span>
        </motion.h2>
        
        <motion.p 
          className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Ready to transform your digital presence? Let's discuss your project and bring your vision to life.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 40px rgba(255,255,255,0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/contact" className="pixel-btn group text-lg px-8 py-4 relative overflow-hidden">
              <motion.span 
                className="relative z-10"
                whileHover={{
                  textShadow: "0 0 15px rgba(255,255,255,0.8)"
                }}
              >
                Start Your Project
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                whileHover={{
                  x: ["-100%", "100%"],
                  opacity: [0, 0.4, 0]
                }}
                transition={{ duration: 0.8 }}
              />
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/web-development" className="pixel-btn bg-transparent border-2 border-gray-600 hover:border-white text-lg px-8 py-4 group">
              <motion.span 
                className="group-hover:scale-105 transition-transform duration-300"
                whileHover={{
                  textShadow: "0 0 10px rgba(255,255,255,0.6)"
                }}
              >
                View Our Work
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Enhanced Footer CTA
const FooterCTA = () => {
  return (
    <motion.section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute bottom-10 right-10 w-32 h-32 border border-white/10 rounded-lg"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>
      
      <div className="container-mobile relative z-10 text-center">
        <motion.div
          className="max-w-2xl mx-auto p-8 pixel-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.h3 
            className="text-2xl sm:text-3xl font-anton mb-4"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(255,255,255,0.3)",
                "0 0 30px rgba(255,255,255,0.5)",
                "0 0 20px rgba(255,255,255,0.3)"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Have a Question?
          </motion.h3>
          <p className="text-gray-300 mb-6">
            We're here to help! Get in touch with our team for a free consultation.
          </p>
          <Link to="/contact" className="pixel-btn">
            Get Free Consultation
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Complete HomePage Component
const HomePage = () => (
  <div className="min-h-screen">
    <PixelBackground />
    
    {/* Hero Section */}
    <HeroSection />
    
    {/* About Section */}
    <AboutSection />
    
    {/* Services Preview */}
    <ServicesPreviewSection />
    
    {/* Why Choose Us Section */}
    <motion.section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 border border-white/5 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 360]
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>
      
      <div className="container-mobile relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-sm font-medium">Why Choose WWPN</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl sm:text-6xl md:text-7xl font-anton hero-title mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            The Future of
            <br />
            <span className="textGlow">Digital Excellence</span>
          </motion.h2>
        </motion.div>

        {/* Interactive Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            {
              icon: "⚡",
              title: "Lightning Speed",
              description: "Projects delivered 3x faster than industry average",
              stat: "3x Faster"
            },
            {
              icon: "🎯",
              title: "Pixel Perfect",
              description: "99.9% accuracy in design and development",
              stat: "99.9% Accuracy"
            },
            {
              icon: "🚀",
              title: "Innovation First",
              description: "Cutting-edge tech and creative solutions",
              stat: "Always Current"
            },
            {
              icon: "💎",
              title: "Premium Quality",
              description: "Award-winning designs and flawless execution",
              stat: "5-Star Rated"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="pixel-card p-8 text-center group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                boxShadow: "0 25px 50px rgba(255,255,255,0.15)"
              }}
            >
              <motion.div 
                className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {item.icon}
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {item.description}
              </p>
              <div className="pixel-btn">
                {item.stat}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>

    {/* Testimonials Section */}
    <motion.section className="py-32 relative">
      <div className="container-mobile">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl sm:text-6xl md:text-7xl font-anton hero-title mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            What Our Clients
            <br />
            <span className="textGlow">Say About Us</span>
          </motion.h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {[
            {
              name: "Sarah Johnson",
              company: "TechStart Inc.",
              text: "WWPN Agency transformed our digital presence completely. Their innovative approach and attention to detail exceeded all our expectations. Our website now converts 3x better!",
              rating: 5
            },
            {
              name: "Ahmed Al-Rashid",
              company: "Digital Solutions",
              text: "Working with WWPN was a game-changer for our brand. Their creative vision and technical expertise delivered results beyond what we imagined possible.",
              rating: 5
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              className="pixel-card p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-white text-xl">⭐</span>
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic text-lg leading-relaxed">
                "{testimonial.text}"
              </p>
              <div>
                <div className="font-bold text-xl">{testimonial.name}</div>
                <div className="text-gray-400">{testimonial.company}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>

    {/* CTA Section */}
    <CTASection />
    
    {/* Footer CTA */}
    <FooterCTA />
  </div>
);

// Web Development Page
const WebDevelopmentPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    emailjs.send(emailJsServiceId, emailJsTemplateId, formData, emailJsPublicKey)
      .then((result) => {
          console.log('Email successfully sent!', result.text);
          setIsSubmitted(true);
      }, (error) => {
          console.log('Failed to send email.', error.text);
          alert('Sorry, something went wrong. Please try again later.');
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const services = [
    { icon: "🌐", title: "Custom Websites", description: "Modern, responsive websites built with cutting-edge technologies" },
    { icon: "📱", title: "Web Applications", description: "Full-stack web applications with advanced functionality" },
    { icon: "⚡", title: "E-commerce Solutions", description: "Complete online stores with payment processing" },
    { icon: "🔧", title: "API Development", description: "RESTful APIs and backend services" }
  ];

  const process = [
    { step: "01", title: "Discovery", description: "Understanding your needs and project requirements" },
    { step: "02", title: "Planning", description: "Creating detailed project roadmap and architecture" },
    { step: "03", title: "Development", description: "Building your solution with modern technologies" },
    { step: "04", title: "Testing", description: "Rigorous testing and quality assurance" },
    { step: "05", title: "Launch", description: "Deployment and ongoing support" }
  ];

  const faqs = [
    {
      question: "How long does it take to build a website?",
      answer: "Typically 2-4 weeks for a standard website, depending on complexity and features required."
    },
    {
      question: "Do you provide hosting and maintenance?",
      answer: "Yes, we offer comprehensive hosting solutions and ongoing maintenance packages."
    },
    {
      question: "Can you work with existing designs?",
      answer: "Absolutely! We can implement your existing designs or create new ones from scratch."
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen">
        <PixelBackground />
        <div className="container-mobile main-content py-12 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-4xl font-anton hero-title mb-6">Thank You!</h1>
            <p className="text-xl text-gray-400 mb-8">
              We've received your web development inquiry. Our team will get back to you within 24 hours.
            </p>
            <Link to="/" className="pixel-btn">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PixelBackground />
      
      {/* Hero Section */}
      <section className="py-32 text-center">
        <div className="container-mobile">
          <motion.h1 
            className="text-6xl md:text-8xl font-anton hero-title mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Web Development
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            We build modern, responsive websites and web applications that drive results and exceed expectations.
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32">
        <div className="container-mobile">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-anton hero-title mb-8">Our Services</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="pixel-card text-center p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32">
        <div className="container-mobile">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-anton hero-title mb-8">Our Process</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold mb-4 text-white">{step.step}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32">
        <div className="container-mobile">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-anton hero-title mb-8">Frequently Asked Questions</h2>
          </motion.div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="pixel-card p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold mb-4">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-32">
        <div className="container-mobile">
          <div className="max-w-2xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-anton hero-title mb-6">Start Your Project</h2>
              <p className="text-xl text-gray-400">
                Ready to build something amazing? Let's discuss your web development needs.
              </p>
            </motion.div>
            
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className="cal-input" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="cal-input" 
                    required 
                  />
                </div>
              </div>
              <div>
                <label htmlFor="service" className="block text-sm font-medium mb-2">Service Interest</label>
                <select 
                  id="service" 
                  name="service" 
                  value={formData.service}
                  onChange={handleChange}
                  className="cal-input" 
                  required
                >
                  <option value="">Select a service</option>
                  <option value="Custom Website">Custom Website</option>
                  <option value="Web Application">Web Application</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="API Development">API Development</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Project Details</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="6" 
                  value={formData.message}
                  onChange={handleChange}
                  className="cal-input" 
                  placeholder="Tell us about your project, goals, and any specific requirements..."
                  required
                ></textarea>
              </div>
              <button type="submit" className="pixel-btn w-full">
                Send Message
              </button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
};

// Graphic Design Page
const GraphicDesignPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    emailjs.send(emailJsServiceId, emailJsTemplateId, formData, emailJsPublicKey)
      .then((result) => {
          console.log('Email successfully sent!', result.text);
          setIsSubmitted(true);
      }, (error) => {
          console.log('Failed to send email.', error.text);
          alert('Sorry, something went wrong. Please try again later.');
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const services = [
    { icon: "🎨", title: "Logo Design", description: "Unique, memorable logos that represent your brand" },
    { icon: "📱", title: "Brand Identity", description: "Complete brand packages including guidelines" },
    { icon: "📄", title: "Marketing Materials", description: "Brochures, flyers, and promotional materials" },
    { icon: "🖼️", title: "Digital Graphics", description: "Social media graphics and digital assets" }
  ];

  const process = [
    { step: "01", title: "Brief", description: "Understanding your brand and design requirements" },
    { step: "02", title: "Concept", description: "Creating initial design concepts and mockups" },
    { step: "03", title: "Refinement", description: "Refining designs based on your feedback" },
    { step: "04", title: "Finalization", description: "Finalizing designs and preparing deliverables" }
  ];

  const faqs = [
    {
      question: "How many logo concepts do you provide?",
      answer: "We typically provide 3-5 initial concepts, then refine the chosen direction based on your feedback."
    },
    {
      question: "What file formats do you deliver?",
      answer: "We provide all necessary formats including vector files (AI, EPS), high-res PNG, and web-ready formats."
    },
    {
      question: "Can you work with existing brand guidelines?",
      answer: "Absolutely! We can work within your existing brand guidelines or help create new ones."
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen">
        <PixelBackground />
        <div className="container-mobile main-content py-12 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-4xl font-anton hero-title mb-6">Thank You!</h1>
            <p className="text-xl text-gray-400 mb-8">
              We've received your graphic design inquiry. Our team will get back to you within 24 hours.
            </p>
            <Link to="/" className="pixel-btn">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PixelBackground />
      
      {/* Hero Section */}
      <section className="py-32 text-center">
        <div className="container-mobile">
          <motion.h1 
            className="text-6xl md:text-8xl font-anton hero-title mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Graphic Design
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            We create stunning visual identities and marketing materials that tell your story and connect with your audience.
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32">
        <div className="container-mobile">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-anton hero-title mb-8">Our Services</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="pixel-card text-center p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32">
        <div className="container-mobile">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-anton hero-title mb-8">Our Process</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold mb-4 text-white">{step.step}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32">
        <div className="container-mobile">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-anton hero-title mb-8">Frequently Asked Questions</h2>
          </motion.div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="pixel-card p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold mb-4">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-32">
        <div className="container-mobile">
          <div className="max-w-2xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-anton hero-title mb-6">Start Your Project</h2>
              <p className="text-xl text-gray-400">
                Ready to create something beautiful? Let's discuss your design needs.
              </p>
            </motion.div>
            
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className="cal-input" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="cal-input" 
                    required 
                  />
                </div>
              </div>
              <div>
                <label htmlFor="service" className="block text-sm font-medium mb-2">Service Interest</label>
                <select 
                  id="service" 
                  name="service" 
                  value={formData.service}
                  onChange={handleChange}
                  className="cal-input" 
                  required
                >
                  <option value="">Select a service</option>
                  <option value="Logo Design">Logo Design</option>
                  <option value="Brand Identity">Brand Identity</option>
                  <option value="Marketing Materials">Marketing Materials</option>
                  <option value="Digital Graphics">Digital Graphics</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Project Details</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="6" 
                  value={formData.message}
                  onChange={handleChange}
                  className="cal-input" 
                  placeholder="Tell us about your project, brand, and any specific requirements..."
                  required
                ></textarea>
              </div>
              <button type="submit" className="pixel-btn w-full">
                Send Message
              </button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
};

// 3D Projects Page
const ThreeDProjectsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    emailjs.send(emailJsServiceId, emailJsTemplateId, formData, emailJsPublicKey)
      .then((result) => {
          console.log('Email successfully sent!', result.text);
          setIsSubmitted(true);
      }, (error) => {
          console.log('Failed to send email.', error.text);
          alert('Sorry, something went wrong. Please try again later.');
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const services = [
    { icon: "🎮", title: "3D Modeling", description: "High-quality 3D models for any purpose" },
    { icon: "🎬", title: "3D Animation", description: "Smooth animations and visual effects" },
    { icon: "🏗️", title: "Architectural Visualization", description: "Realistic architectural renders" },
    { icon: "🎨", title: "Product Visualization", description: "Stunning product renders and mockups" }
  ];

  const process = [
    { step: "01", title: "Concept", description: "Understanding your vision and requirements" },
    { step: "02", title: "Modeling", description: "Creating detailed 3D models" },
    { step: "03", title: "Texturing", description: "Adding materials and textures" },
    { step: "04", title: "Rendering", description: "Final rendering and delivery" }
  ];

  const faqs = [
    {
      question: "What 3D software do you use?",
      answer: "We use industry-standard software including Blender, Maya, and Cinema 4D for modeling and rendering."
    },
    {
      question: "Can you work with existing 3D models?",
      answer: "Yes, we can modify, enhance, or animate existing 3D models in various formats."
    },
    {
      question: "How long does a 3D project take?",
      answer: "Project timelines vary from 1-4 weeks depending on complexity and detail level required."
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen">
        <PixelBackground />
        <div className="container-mobile main-content py-12 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-4xl font-anton hero-title mb-6">Thank You!</h1>
            <p className="text-xl text-gray-400 mb-8">
              We've received your 3D projects inquiry. Our team will get back to you within 24 hours.
            </p>
            <Link to="/" className="pixel-btn">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PixelBackground />
      
      {/* Hero Section */}
      <section className="py-32 text-center">
        <div className="container-mobile">
          <motion.h1 
            className="text-6xl md:text-8xl font-anton hero-title mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            3D Projects
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            We create immersive 3D models, animations, and visualizations that bring your ideas to life.
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32">
        <div className="container-mobile">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-anton hero-title mb-8">Our Services</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="pixel-card text-center p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32">
        <div className="container-mobile">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-anton hero-title mb-8">Our Process</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold mb-4 text-white">{step.step}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32">
        <div className="container-mobile">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-anton hero-title mb-8">Frequently Asked Questions</h2>
          </motion.div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="pixel-card p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold mb-4">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-32">
        <div className="container-mobile">
          <div className="max-w-2xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-anton hero-title mb-6">Start Your Project</h2>
              <p className="text-xl text-gray-400">
                Ready to bring your ideas to life in 3D? Let's discuss your project.
              </p>
            </motion.div>
            
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className="cal-input" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="cal-input" 
                    required 
                  />
                </div>
              </div>
              <div>
                <label htmlFor="service" className="block text-sm font-medium mb-2">Service Interest</label>
                <select 
                  id="service" 
                  name="service" 
                  value={formData.service}
                  onChange={handleChange}
                  className="cal-input" 
                  required
                >
                  <option value="">Select a service</option>
                  <option value="3D Modeling">3D Modeling</option>
                  <option value="3D Animation">3D Animation</option>
                  <option value="Architectural Visualization">Architectural Visualization</option>
                  <option value="Product Visualization">Product Visualization</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Project Details</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="6" 
                  value={formData.message}
                  onChange={handleChange}
                  className="cal-input" 
                  placeholder="Tell us about your 3D project, requirements, and any reference materials..."
                  required
                ></textarea>
              </div>
              <button type="submit" className="pixel-btn w-full">
                Send Message
              </button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
};

// Motion Graphics Page - Coming Soon
const MotionGraphicsPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const teaserServices = [
    { icon: "🎬", title: "Brand Motion", description: "Cinematic brand storytelling" },
    { icon: "🎭", title: "Character Animation", description: "Expressive character design" },
    { icon: "✨", title: "Visual Effects", description: "Stunning VFX and compositing" },
    { icon: "🎪", title: "Motion Graphics", description: "Dynamic graphic animations" }
  ];

  return (
    <div className="min-h-screen">
      <PixelBackground />
      
      {/* Hero Section */}
      <motion.section 
        className="py-32 text-center relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container-mobile">
          <motion.div 
            className="text-8xl mb-8 animate-pulse"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🎬
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-8xl font-anton hero-title mb-8 glitch-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Motion Graphics
          </motion.h1>
          
          <motion.div
            className="text-4xl md:text-6xl font-anton text-gray-400 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="shimmer-effect">Coming Soon</span>
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            We're crafting something extraordinary. A new dimension of visual storytelling that will revolutionize how your brand moves and breathes.
          </motion.p>

          {/* Teaser Services */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            {teaserServices.map((service, index) => (
              <motion.div
                key={index}
                className="pixel-card text-center p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="text-4xl mb-4"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Email Signup */}
          <motion.div 
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Be the first to know when we launch
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="cal-input text-center" 
                    placeholder="Enter your email"
                    required 
                  />
                </div>
                <button type="submit" className="pixel-btn w-full group">
                  <span className="group-hover:scale-105 transition-transform duration-300">
                    Notify Me When Ready
                  </span>
                </button>
              </form>
            ) : (
              <motion.div 
                className="text-center p-6 pixel-card"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-xl font-bold mb-2">You're on the list!</h3>
                <p className="text-gray-400">
                  We'll notify you the moment our motion graphics services go live.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Back to Home */}
          <motion.div 
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <Link to="/" className="pixel-btn">
              Back to Home
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

// Pricing Page
const PricingPage = () => {
  return (
    <div className="min-h-screen">
      <PixelBackground />
      <div className="container-mobile main-content py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-anton hero-title mb-6">Pricing Plans</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose the perfect plan for your project needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Starter",
              price: "$999",
              description: "Perfect for small businesses",
              features: ["Basic Website", "Mobile Responsive", "Contact Form", "SEO Setup", "1 Month Support"]
            },
            {
              name: "Professional",
              price: "$2,499",
              description: "Ideal for growing businesses",
              features: ["Custom Website", "Advanced Animations", "CMS Integration", "Analytics Setup", "3 Months Support", "Priority Support"]
            },
            {
              name: "Enterprise",
              price: "Custom",
              description: "For large-scale projects",
              features: ["Full Custom Solution", "Advanced Features", "24/7 Support", "Dedicated Manager", "Custom Integrations", "Ongoing Maintenance"]
            }
          ].map((plan, index) => (
            <motion.div
              key={index}
              className="pixel-card p-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <div className="text-4xl font-bold mb-2">{plan.price}</div>
              <p className="text-gray-400 mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="text-gray-300">✓ {feature}</li>
                ))}
              </ul>
              <Link to="/contact" className="pixel-btn w-full">
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [theme, setTheme] = useState('dark');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading screen

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <HeadProvider>
      <Router>
        <div className={`App ${theme}`}>
          <ScrollToTop />
          <Header theme={theme} toggleTheme={toggleTheme} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/web-development" element={<WebDevelopmentPage />} />
            <Route path="/graphic-design" element={<GraphicDesignPage />} />
            <Route path="/3d-projects" element={<ThreeDProjectsPage />} />
            <Route path="/motion-graphics" element={<MotionGraphicsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/pricing" element={<PricingPage />} />
          </Routes>
          <Footer />
          <CookieBanner />
          <ScrollToTopButton />
        </div>
      </Router>
    </HeadProvider>
  );
}

export default App;

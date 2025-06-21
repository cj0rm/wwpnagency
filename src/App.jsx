import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import PricingPage from './components/PricingPage';
import CheckoutForm from './components/CheckoutForm';
import InteractiveFeatures from './components/InteractiveFeatures';

// Navigation Component
const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container-mobile">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">WWPN Agency</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/pricing" className="btn-primary">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.path
                      ? 'text-gray-900 bg-gray-100'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/pricing"
                className="block px-3 py-2 mt-4 bg-black text-white rounded-lg text-center font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section Component
const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero-section cal-background relative overflow-hidden">
      {/* Interactive Background */}
      <div 
        className="absolute inset-0 opacity-10 transition-all duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 80%)`
        }}
      />
      
      <div className="container-mobile relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Experience Design Like Never Before.
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              WWPN Agency merges creativity, technology, and interactivity to deliver digital experiences that feel alive — not just look good.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pricing" className="btn-gradient text-lg px-8 py-4">
                Get Started – Let's Build Your Brand
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Interactive Intro Section
const InteractiveIntroSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container-mobile">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Our Design Thinks With You.
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            At WWPN Agency, we don't just build websites — we engineer digital experiences. Every button you click, every section you scroll, every form you fill feels intentional and alive. Powered by smart animations and AI-assisted interactions, our websites talk back in a way that feels futuristic and human.
          </p>
        </div>
      </div>
    </section>
  );
};

// Services Preview Section
const ServicesPreviewSection = () => {
  const services = [
    {
      icon: "🧾",
      title: "Graphic Design",
      description: "Bold visuals, engaging layouts, and scroll-triggered animations."
    },
    {
      icon: "🌐",
      title: "Web Design",
      description: "Interactive websites with motion effects, smart layout behavior, and micro-interactions."
    },
    {
      icon: "🔗",
      title: "Branding",
      description: "From logo to full identity systems, with interactive reveal sections."
    },
    {
      icon: "🎨",
      title: "3D Modeling",
      description: "AI-assisted 3D environments, animated previews, and interactive render viewers."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-mobile">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tap, scroll, or hover — discover the services that bring your brand to life.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="card p-8 hover-lift text-center group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Terminal Section
const TerminalSection = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container-mobile">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-xl p-8 font-mono text-green-400">
            <div className="flex items-center mb-4">
              <div className="flex space-x-2 mr-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-400">Terminal</span>
            </div>
            <div className="space-y-2">
              <div>$ npm install wwpn-agency</div>
              <div className="text-green-400">✓ Installing latest version...</div>
              <div className="text-blue-400">✓ Dependencies resolved</div>
              <div className="text-yellow-400">✓ Building your digital experience</div>
              <div className="text-green-400">✓ Ready to deploy!</div>
              <div>$ npm start</div>
              <div className="text-green-400">🚀 Your website is now live!</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Stats Section
const StatsSection = () => {
  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "99%", label: "Client Satisfaction" },
    { number: "24/7", label: "Support Available" },
    { number: "50+", label: "Happy Clients" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-mobile">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-number text-gradient-blue">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container-mobile">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Don't just look professional. Feel smart.
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Choose a package built not just to look great — but to think smarter, interact smoother, and work harder for your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pricing" className="bg-white text-blue-600 font-medium py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
              Choose Your Plan
            </Link>
            <a 
              href="https://wa.me/96896540991" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border-2 border-white text-white font-medium py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container-mobile">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="text-xl font-semibold">WWPN Agency</span>
            </div>
            <p className="text-gray-400">
              Creating exceptional web experiences that drive business growth.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="footer-link">Web Development</a></li>
              <li><a href="#" className="footer-link">Graphic Design</a></li>
              <li><a href="#" className="footer-link">Branding</a></li>
              <li><a href="#" className="footer-link">3D Modeling</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="footer-link">About Us</a></li>
              <li><a href="#" className="footer-link">Our Work</a></li>
              <li><a href="#" className="footer-link">Contact</a></li>
              <li><a href="#" className="footer-link">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="https://wa.me/96896540991" className="footer-link">WhatsApp</a></li>
              <li><a href="mailto:faisalhaitham1123@gmail.com" className="footer-link">Email</a></li>
              <li><a href="#" className="footer-link">LinkedIn</a></li>
              <li><a href="#" className="footer-link">Twitter</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 WWPN Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Home Page Component
const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <InteractiveIntroSection />
      <ServicesPreviewSection />
      <TerminalSection />
      <StatsSection />
      <CTASection />
    </div>
  );
};

// Services Page Component
const ServicesPage = () => {
  const services = [
    {
      title: "Graphic Design",
      description: "Logos, posters, UI mockups, business cards, and digital campaigns — crafted with care and delivered with animation.",
      details: "From concept to final delivery, we create visual identities that speak volumes. Our designs are not just static images but living elements that enhance your brand's story."
    },
    {
      title: "Web Design",
      description: "Code-first websites built on React and Tailwind, infused with Framer Motion animations and responsive design logic.",
      details: "We build websites that don't just look good — they feel alive. Every interaction is purposeful, every animation serves a function, and every pixel is optimized for performance."
    },
    {
      title: "Branding",
      description: "We help define your voice, look, and message — from brand naming and logo to full guidelines and identity systems.",
      details: "Your brand is more than a logo. It's the complete story of who you are, what you stand for, and how you want to be remembered. We craft comprehensive brand experiences."
    },
    {
      title: "3D Modeling",
      description: "Products, spaces, and ideas — rendered in high-definition with interactive previews, scroll-triggered reveals, or AR-ready models.",
      details: "Bring your ideas to life in three dimensions. From product visualizations to architectural renders, we create immersive 3D experiences that captivate and convert."
    }
  ];

  return (
    <div className="py-20">
      <div className="container-mobile">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive creative and technical services to help your business succeed online.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="card p-8 hover-lift">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 font-medium">{service.description}</p>
              <p className="text-gray-600">{service.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// About Page Component
const AboutPage = () => {
  return (
    <div className="py-20">
      <div className="container-mobile">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Meet WWPN – Creative Meets Code.</h1>
            <p className="text-xl text-gray-600">
              We're passionate about creating exceptional web experiences that drive business growth.
            </p>
          </div>
          
          <div className="space-y-8 text-lg text-gray-600 leading-relaxed">
            <p>
              WWPN Agency was founded to blur the lines between art and code. We believe that websites shouldn't just be static pages — they should move, respond, and think like the people who use them.
            </p>
            
            <p>
              Whether it's a dynamic 3D product showcase or an AI form that answers your visitor's question before they ask it, our focus is building future-ready digital experiences.
            </p>
            
            <p>
              We work with ambitious clients who want something more than just "a website." We deliver identity, interactivity, and intelligence — all in one package.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Contact Page Component
const ContactPage = () => {
  return (
    <div className="py-20">
      <div className="container-mobile">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Let's Build Something Smart Together.</h1>
            <p className="text-xl text-gray-600">
              From concept to code, WWPN Agency is your partner in interactive, high-tech, and brand-driven web experiences. Whether you need a site, a brand refresh, or a full-scale digital system — we're ready.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">faisalhaitham1123@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                    <p className="text-gray-600">+968 9654 0991</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input type="text" className="cal-input" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" className="cal-input" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea rows="4" className="cal-input" placeholder="Tell us about your project..."></textarea>
                </div>
                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="/interactive" element={<InteractiveFeatures />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

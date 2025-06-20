import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, FileText, Mail, Sun, Moon, Linkedin, Twitter, Github, Menu, X, ArrowRight, Bot, Palette, Film, Code } from 'lucide-react';

// --- VITE ASSET IMPORT ---
// The user has uploaded a logo. I'm assuming it's in the assets folder.
// Since the project was scaffolded with vite, the `public` directory is the right place for static assets.
// I will assume the user has placed the logo in `public/logo.png`.
const logoUrl = '/logo.png'; 

// --- MOCK DATA ---
const services = [
  { title: "Website Development", icon: <Code size={40} />, description: "Crafting bespoke, high-performance websites from scratch.", details: "Our team specializes in creating responsive, fast, and SEO-friendly websites using the latest technologies. We handle everything from single-page applications to large-scale e-commerce platforms, ensuring a seamless user experience across all devices." },
  { title: "Graphic Design", icon: <Palette size={40} />, description: "Visual identities that tell your brand's story.", details: "We create compelling visual identities, including logos, branding guidelines, marketing materials, and digital assets. Our designs are not just beautiful; they are strategic tools that communicate your brand's essence and values." },
  { title: "Motion Graphics", icon: <Film size={40} />, description: "Bringing your brand to life with animation.", details: "From animated logos and explainer videos to complex UI animations, we add a dynamic layer to your brand's presence. Our motion graphics are designed to capture attention and engage your audience in a meaningful way." },
  { title: "3D Projects", icon: <Bot size={40} />, description: "Immersive 3D models and environments.", details: "We push the boundaries of digital art with our 3D modeling and rendering services. Whether for product visualization, architectural walkthroughs, or abstract art, we create immersive experiences that are both realistic and imaginative." }
];

const portfolioItems = [
  { id: 1, title: "Project Alpha", category: "Website Development", imgSrc: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", details: "A full-stack e-commerce platform with a custom CMS." },
  { id: 2, title: "Project Beta", category: "Graphic Design", imgSrc: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", details: "A complete branding package for a tech startup." },
  { id: 3, title: "Project Gamma", category: "Motion Graphics", imgSrc: "https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", details: "An animated explainer video for a new app." },
  { id: 4, title: "Project Delta", category: "3D Projects", imgSrc: "https://images.unsplash.com/photo-1554734867-bf3c00a49371?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", details: "Architectural visualization of a futuristic city." },
  { id: 5, title: "Project Epsilon", category: "Website Development", imgSrc: "https://images.unsplash.com/photo-1555774698-0b77e0ab232F?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", details: "A portfolio website for a renowned photographer." },
];

const testimonials = [
  { quote: "WWPN Agency transformed our vision into a digital masterpiece. Their process is as innovative as their designs.", author: "CEO, TechCorp" },
  { quote: "The attention to detail and creative prowess of this team is unmatched. Highly recommended.", author: "Art Director, Innovate Inc." },
  { quote: "Working with them was a breeze. They delivered beyond our expectations on a tight deadline.", author: "Founder, StartupX" },
];

const teamMembers = [
    { name: "Alex Turing", title: "Lead Futurist & CEO", imgSrc: `https://i.pravatar.cc/150?u=a042581f4e29026704d`, details: "Pioneering the future of digital interaction with AI-driven strategies." },
    { name: "Jada Lovelace", title: "Head of Design", imgSrc: `https://i.pravatar.cc/150?u=a042581f4e29026705d`, details: "Crafting visually stunning and intuitive user experiences." },
    { name: "Ken Thompson", title: "Chief Technology Officer", imgSrc: `https://i.pravatar.cc/150?u=a042581f4e29026706d`, details: "Architecting robust and scalable cutting-edge solutions." },
];


// --- CUSTOM HOOKS ---
const useTypewriter = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return displayText;
};

// --- PARTICLE BACKGROUND COMPONENT ---
const ParticleCanvas = ({ isDarkMode }) => {
    const canvasRef = useRef(null);

    const draw = useCallback((ctx, frameCount, particles) => {
        const particleColor = isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)';
        const lineColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > ctx.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > ctx.canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = particleColor;
            ctx.fill();
        });

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = lineColor;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }, [isDarkMode]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let frameCount = 0;
        let animationFrameId;
        
        const particles = [];
        const numParticles = Math.floor(window.innerWidth / 30);

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = document.body.scrollHeight; // Match body height
            particles.length = 0; // Reset particles on resize
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    radius: Math.random() * 1.5 + 1,
                });
            }
        };

        resizeCanvas();
        
        const render = () => {
            frameCount++;
            draw(ctx, frameCount, particles);
            animationFrameId = window.requestAnimationFrame(render);
        };
        render();

        window.addEventListener('resize', resizeCanvas);
        
        // Also observe body size changes for dynamic content
        const resizeObserver = new ResizeObserver(resizeCanvas);
        resizeObserver.observe(document.body);

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
            resizeObserver.disconnect();
        };
    }, [draw]);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};


// --- LAYOUT COMPONENTS ---
const Navbar = ({ currentPage, setPage, isDarkMode, toggleTheme }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', icon: <Home size={18}/>, page: 'Home' },
        { name: 'About', icon: <User size={18}/>, page: 'About' },
        { name: 'Services', icon: <Briefcase size={18}/>, page: 'Services' },
        { name: 'Portfolio', icon: <FileText size={18}/>, page: 'Portfolio' },
        { name: 'Contact', icon: <Mail size={18}/>, page: 'Contact' },
    ];

    return (
        <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-light/80 dark:bg-dark/80 backdrop-blur-sm' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <button onClick={() => setPage('Home')} className="flex-shrink-0 flex items-center gap-2">
                         <img src={logoUrl} alt="WWPN Agency Logo" className="h-10 w-10 rounded-full" />
                         <span className="font-bold text-xl hidden sm:inline">WWPN Agency</span>
                    </button>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navItems.map(item => (
                                <button key={item.name} onClick={() => setPage(item.page)} className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === item.page ? 'text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>
                                    {item.name}
                                    {currentPage === item.page && <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white" layoutId="underline" />}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 hover:text-gray-900 dark:hover:text-white focus:outline-none">
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                         <div className="md:hidden ml-2">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence>
            {isMenuOpen && (
                 <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map(item => (
                            <button key={item.name} onClick={() => { setPage(item.page); setIsMenuOpen(false); }} className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium ${currentPage === item.page ? 'bg-gray-200 dark:bg-gray-800' : ''}`}>
                                {item.icon} {item.name}
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}
            </AnimatePresence>
        </nav>
    );
};

const Footer = () => (
    <footer className="bg-gray-100 dark:bg-gray-900 mt-20">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                <div className="space-y-8 xl:col-span-1">
                    <img src={logoUrl} alt="WWPN Agency Logo" className="h-12 w-12 rounded-full" />
                    <p className="text-gray-500 dark:text-gray-400 text-base">
                        Futuristic solutions for visionary brands.
                    </p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-gray-500"><Linkedin /></a>
                        <a href="#" className="text-gray-400 hover:text-gray-500"><Twitter /></a>
                        <a href="#" className="text-gray-400 hover:text-gray-500"><Github /></a>
                    </div>
                </div>
                <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                    <div className="md:grid md:grid-cols-2 md:gap-8">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Services</h3>
                             <ul className="mt-4 space-y-4">
                                {services.map(s => <li key={s.title}><a href="#" className="text-base text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">{s.title}</a></li>)}
                            </ul>
                        </div>
                        <div className="mt-12 md:mt-0">
                            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
                            <ul className="mt-4 space-y-4">
                                <li><a href="#" className="text-base text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">About</a></li>
                                <li><a href="#" className="text-base text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Portfolio</a></li>
                                <li><a href="#" className="text-base text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Careers</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
                <p className="text-base text-gray-400 xl:text-center">&copy; {new Date().getFullYear()} WWPN Agency. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

const Modal = ({ item, onClose }) => (
    <AnimatePresence>
        {item && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-light dark:bg-dark rounded-lg shadow-xl max-w-2xl w-full overflow-hidden"
                >
                    <img src={item.imgSrc} alt={item.title} className="w-full h-64 object-cover" />
                    <div className="p-6">
                        <h3 className="text-2xl font-bold">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">{item.category}</p>
                        <p className="mt-4">{item.details}</p>
                        <button onClick={onClose} className="mt-6 float-right px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">Close</button>
                    </div>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

// --- PAGE COMPONENTS ---
const PageContainer = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
        {children}
    </motion.div>
);

const HomePage = () => {
    const tagline = useTypewriter("Building the Digital Frontier with Intelligent Design.", 60);
    const [testimonialIndex, setTestimonialIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 5000);
        return () => clearTimeout(timer);
    }, [testimonialIndex]);

    return (
        <PageContainer>
            {/* Hero Section */}
            <div className="h-screen flex flex-col justify-center items-center text-center -mt-20">
                <motion.h1 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter"
                >
                    WWPN Agency
                </motion.h1>
                <p className="mt-4 text-lg md:text-xl text-gray-500 dark:text-gray-400 h-8">
                    {tagline}
                    <span className="inline-block w-1 h-6 ml-1 bg-gray-800 dark:bg-gray-200 animate-ping"></span>
                </p>
            </div>

            {/* Services Preview */}
            <div className="py-24">
                <h2 className="text-4xl font-bold text-center mb-12">Our Core Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, i) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="text-center p-8 border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 group hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        >
                            <div className="inline-block p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4 text-gray-900 dark:text-white">
                                {React.cloneElement(service.icon, { className: 'transition-transform duration-300 group-hover:scale-110' })}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
            
            {/* Testimonials */}
             <div className="py-24">
                <h2 className="text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
                <div className="relative h-40 flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="sync">
                        <motion.div
                            key={testimonialIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.8 }}
                            className="absolute text-center"
                        >
                            <p className="text-2xl italic text-gray-800 dark:text-gray-200">"{testimonials[testimonialIndex].quote}"</p>
                            <p className="mt-4 text-lg font-semibold text-gray-600 dark:text-gray-400">- {testimonials[testimonialIndex].author}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </PageContainer>
    );
};

const AboutPage = () => (
    <PageContainer>
        <h1 className="text-5xl font-bold text-center mb-16">Who We Are</h1>
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
        >
            <p>At WWPN Agency, we are more than just a creative agency. We are architects of the future, pioneers of digital frontiers, and partners in innovation. Our mission is to blend artistry with artificial intelligence to create experiences that are not only visually stunning but also deeply intelligent and intuitive. We believe in pushing boundaries and challenging the status quo to build the digital world of tomorrow, today.</p>
        </motion.div>

        <div className="py-24">
            <h2 className="text-4xl font-bold text-center mb-12">Meet the Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {teamMembers.map((member, i) => (
                    <motion.div
                        key={member.name}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.15 }}
                        className="group relative text-center"
                    >
                        <img src={member.imgSrc} alt={member.name} className="w-40 h-40 rounded-full mx-auto mb-4 transition-all duration-300 group-hover:grayscale" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                            <p className="text-white text-sm">{member.details}</p>
                        </div>
                        <h3 className="text-xl font-bold">{member.name}</h3>
                        <p className="text-gray-500 dark:text-gray-400">{member.title}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </PageContainer>
);

const ServicesPage = () => (
    <PageContainer>
        <h1 className="text-5xl font-bold text-center mb-16">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {services.map((service, i) => (
                <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-start space-x-6 p-6 border border-gray-200 dark:border-gray-800 rounded-lg group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                    <div className="flex-shrink-0 text-gray-900 dark:text-white">
                         {React.cloneElement(service.icon, { className: 'transition-transform duration-300 group-hover:scale-110' })}
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{service.details}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    </PageContainer>
);

const PortfolioPage = () => {
    const [filter, setFilter] = useState('All');
    const [selectedItem, setSelectedItem] = useState(null);

    const categories = ['All', ...new Set(portfolioItems.map(item => item.category))];
    const filteredItems = filter === 'All' ? portfolioItems : portfolioItems.filter(item => item.category === filter);

    return (
        <PageContainer>
            <h1 className="text-5xl font-bold text-center mb-8">Our Work</h1>
            <div className="flex justify-center space-x-4 mb-12">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setFilter(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === category ? 'bg-gray-900 text-white dark:bg-white dark:text-black' : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                    {filteredItems.map(item => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setSelectedItem(item)}
                            className="group cursor-pointer overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800"
                        >
                            <div className="relative">
                                <img src={item.imgSrc} alt={item.title} className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-white text-lg font-bold">View Details</p>
                                </div>
                            </div>
                             <div className="p-4 bg-gray-50 dark:bg-gray-900">
                                <h3 className="font-bold">{item.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            
            <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
        </PageContainer>
    );
};

const ContactPage = () => {
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [clientDetails, setClientDetails] = useState({ name: '', email: '' });
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // IMPORTANT: Replace with your actual Gemini API Key
    const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE';
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

    const handleServiceSelect = async (service) => {
        setSelectedService(service);
        setStep(2);
        setIsLoading(true);
        setError('');

        if (GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
            setError("Please add your Gemini API key to the App.jsx file.");
            setQuestions([
                "What is the primary goal of your project?",
                "Who is your target audience?",
                "What is your estimated budget for this project?",
                "What is your desired timeline for completion?"
            ]);
            setIsLoading(false);
            return;
        }

        const prompt = `You are a friendly project intake assistant for a futuristic agency. A client is interested in '${service.title}'. Generate exactly 4 essential questions to understand their needs. Focus on functionality, target audience, budget, and timeline. Respond with ONLY a JSON object in the format: { "questions": ["question 1", "question 2", "question 3", "question 4"] }`;

        try {
            const response = await fetch(GEMINI_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                }),
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }

            const data = await response.json();
            // The response text is often wrapped in markdown, so we need to parse it
            const jsonString = data.candidates[0].content.parts[0].text.replace(/```json|```/g, '').trim();
            const parsed = JSON.parse(jsonString);
            setQuestions(parsed.questions);

        } catch (e) {
            console.error(e);
            setError("Failed to generate questions. Please try again later.");
            // Fallback questions
             setQuestions([
                "What is the primary goal of your project?",
                "Who is your target audience?",
                "What is your estimated budget for this project?",
                "What is your desired timeline for completion?"
            ]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleAnswersSubmit = (e) => {
        e.preventDefault();
        setStep(3);
    };
    
    const handleDetailsSubmit = async (e) => {
        e.preventDefault();
        setStep(4);
        setIsLoading(true);
        setError('');

        const qaString = questions.map((q, i) => `Q: ${q}\nA: ${answers[i] || 'Not provided'}`).join('\n\n');
        const prompt = `You are a project manager AI. Summarize the following client intake into a professional, concise project brief. Be friendly but professional. \n\nService: ${selectedService.title}\nClient: ${clientDetails.name} (${clientDetails.email})\n\n---CLIENT RESPONSES---\n${qaString}\n\n---END RESPONSES---\n\nConclude with a clear action item for the agency team, like scheduling a follow-up call.`;

        if (GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
            setSummary(`**Project Brief: ${selectedService.title} for ${clientDetails.name}**\n\nThis is a sample summary. The AI-powered summary generation is disabled because the Gemini API key has not been set.\n\nThe client has expressed interest in our ${selectedService.title} services and provided initial answers. \n\n**Action Item:** The WWPN team should review the details and reach out to ${clientDetails.email} to schedule a discovery call within 24 hours.`);
            setIsLoading(false);
            return;
        }
        
        try {
            const response = await fetch(GEMINI_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                }),
            });

            if (!response.ok) throw new Error('Failed to generate summary.');
            const data = await response.json();
            setSummary(data.candidates[0].content.parts[0].text);

        } catch (e) {
            setError("Failed to generate summary. Please try again.");
            setSummary("There was an error generating the project summary.");
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setStep(1);
        setSelectedService(null);
        setQuestions([]);
        setAnswers({});
        setClientDetails({ name: '', email: '' });
        setSummary('');
        setError('');
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <h2 className="text-3xl font-bold text-center mb-2">Let's start a new project</h2>
                        <p className="text-center text-gray-500 dark:text-gray-400 mb-10">What service are you interested in?</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {services.map(s => (
                                <button key={s.title} onClick={() => handleServiceSelect(s)} className="p-8 border border-gray-200 dark:border-gray-800 rounded-lg text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex items-center gap-6 group">
                                    <div className="text-gray-900 dark:text-white">
                                        {React.cloneElement(s.icon, { className: 'transition-transform duration-300 group-hover:scale-110' })}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{s.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400">{s.description}</p>
                                    </div>
                                    <ArrowRight className="ml-auto text-gray-400"/>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                );
            case 2:
                return (
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <h2 className="text-3xl font-bold text-center mb-4">Project: {selectedService.title}</h2>
                        <p className="text-center text-gray-500 dark:text-gray-400 mb-10">Please answer a few questions to help us understand your needs.</p>
                        {isLoading ? (
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
                                <p className="mt-4">Generating questions...</p>
                            </div>
                        ) : error ? (
                             <div className="text-center text-red-500 p-4 border border-red-500/50 rounded-md bg-red-500/10">{error}</div>
                        ) : (
                            <form onSubmit={handleAnswersSubmit}>
                                <div className="space-y-6">
                                {questions.map((q, i) => (
                                    <div key={i}>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{q}</label>
                                        <textarea
                                            rows="3"
                                            onChange={(e) => setAnswers({...answers, [i]: e.target.value})}
                                            className="w-full p-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none"
                                        />
                                    </div>
                                ))}
                                </div>
                                <button type="submit" className="mt-8 w-full py-3 px-4 bg-gray-900 text-white dark:bg-white dark:text-black rounded-md font-semibold hover:opacity-90 transition-opacity">Continue</button>
                            </form>
                        )}
                    </motion.div>
                );
             case 3:
                return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <h2 className="text-3xl font-bold text-center mb-4">Almost there!</h2>
                        <p className="text-center text-gray-500 dark:text-gray-400 mb-10">Please provide your contact details.</p>
                         <form onSubmit={handleDetailsSubmit}>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium">Full Name</label>
                                    <input type="text" value={clientDetails.name} onChange={(e) => setClientDetails({...clientDetails, name: e.target.value})} required className="mt-1 w-full p-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Email Address</label>
                                    <input type="email" value={clientDetails.email} onChange={(e) => setClientDetails({...clientDetails, email: e.target.value})} required className="mt-1 w-full p-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md"/>
                                </div>
                            </div>
                            <button type="submit" className="mt-8 w-full py-3 px-4 bg-gray-900 text-white dark:bg-white dark:text-black rounded-md font-semibold hover:opacity-90">Generate Project Brief</button>
                        </form>
                    </motion.div>
                );
            case 4:
                 return (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <h2 className="text-3xl font-bold text-center mb-4">Thank You, {clientDetails.name}!</h2>
                        <p className="text-center text-gray-500 dark:text-gray-400 mb-10">Here is a summary of your inquiry. A copy has been "sent" to our team.</p>
                        {isLoading ? (
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
                                <p className="mt-4">Generating summary...</p>
                            </div>
                        ) : error ? (
                             <div className="text-center text-red-500 p-4 border border-red-500/50 rounded-md bg-red-500/10">{error}</div>
                        ) : (
                            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-md space-y-4 prose prose-sm dark:prose-invert max-w-none">
                                {summary.split('\n').map((line, i) => {
                                    if (line.startsWith('**') && line.endsWith('**')) {
                                        return <h3 key={i} className="font-bold text-lg">{line.replace(/\*\*/g, '')}</h3>
                                    }
                                    if (line.startsWith('* ')) {
                                        return <li key={i}>{line.substring(2)}</li>
                                    }
                                    return <p key={i}>{line}</p>
                                })}
                            </div>
                        )}
                        <button onClick={resetForm} className="mt-8 w-full py-3 px-4 bg-gray-900 text-white dark:bg-white dark:text-black rounded-md font-semibold hover:opacity-90">Start a New Inquiry</button>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <PageContainer>
            <div className="max-w-4xl mx-auto">
                {renderStep()}
            </div>
        </PageContainer>
    );
};

// --- MAIN APP COMPONENT ---
export default function App() {
    const [currentPage, setCurrentPage] = useState('Home');
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const pages = {
        Home: <HomePage />,
        About: <AboutPage />,
        Services: <ServicesPage />,
        Portfolio: <PortfolioPage />,
        Contact: <ContactPage />,
    };

    const CurrentPageComponent = pages[currentPage];

    return (
        <div className={`min-h-screen font-sans transition-colors duration-500 ${isDarkMode ? 'dark' : ''}`}>
            <ParticleCanvas isDarkMode={isDarkMode} />
            <Navbar currentPage={currentPage} setPage={setCurrentPage} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            <main>
                <AnimatePresence mode="wait">
                    {React.cloneElement(CurrentPageComponent, { key: currentPage })}
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    );
}

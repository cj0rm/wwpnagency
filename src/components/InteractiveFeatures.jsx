import React, { useState, useEffect } from 'react';

const InteractiveFeatures = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      id: 'cursor',
      title: 'Custom Cursor',
      description: 'Interactive cursor that responds to your movement',
      icon: '🖱️',
      demo: 'Move your mouse around to see the custom cursor effect'
    },
    {
      id: 'particles',
      title: 'Particle System',
      description: 'Dynamic particle background with smooth animations',
      icon: '✨',
      demo: 'Watch the floating particles create an engaging background'
    },
    {
      id: 'gradients',
      title: 'Gradient Effects',
      description: 'Beautiful gradient overlays that enhance visual appeal',
      icon: '🎨',
      demo: 'Subtle gradients add depth and modern aesthetics'
    },
    {
      id: 'animations',
      title: 'Smooth Animations',
      description: 'Fluid transitions and hover effects throughout',
      icon: '⚡',
      demo: 'Hover over elements to see smooth animations'
    },
    {
      id: 'responsive',
      title: 'Responsive Design',
      description: 'Perfect experience on all devices and screen sizes',
      icon: '📱',
      demo: 'Resize your browser to see the responsive layout'
    },
    {
      id: 'performance',
      title: 'Performance Optimized',
      description: 'Fast loading and smooth interactions',
      icon: '🚀',
      demo: 'Experience lightning-fast page loads and interactions'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container-mobile">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Interactive Features
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the modern web with our interactive elements and smooth animations. 
            Each feature is designed to enhance user engagement and create memorable experiences.
          </p>
        </div>

        {/* Interactive Demo Section */}
        <div className="mb-16">
          <div className="card p-8 relative overflow-hidden">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Live Demo
              </h2>
              <p className="text-gray-600">
                Interact with the elements below to see our features in action
              </p>
            </div>

            {/* Mouse Tracking Demo */}
            <div className="relative h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl mb-8 overflow-hidden">
              <div 
                className="absolute w-4 h-4 bg-blue-500 rounded-full pointer-events-none transition-transform duration-100 ease-out"
                style={{
                  left: mousePosition.x - 8,
                  top: mousePosition.y - 8,
                  transform: 'translate(-50%, -50%)'
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-600 font-medium">
                  Move your mouse around to see the tracking effect
                </p>
              </div>
            </div>

            {/* Interactive Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className={`card p-6 cursor-pointer transition-all duration-300 hover-lift ${
                    activeFeature === feature.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onMouseEnter={() => setActiveFeature(feature.id)}
                  onMouseLeave={() => setActiveFeature(null)}
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="text-sm text-blue-600 font-medium">
                    {feature.demo}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Implementation Examples
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* CSS Example */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">CSS Animations</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`.hover-lift {
  @apply transition-all duration-200 
         hover:-translate-y-1 hover:shadow-lg;
}

.btn-gradient {
  @apply bg-gradient-to-r from-blue-600 
         to-purple-600 text-white font-medium 
         py-3 px-6 rounded-lg 
         hover:from-blue-700 hover:to-purple-700 
         transition-all duration-200;
}`}</pre>
              </div>
            </div>

            {/* React Example */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">React Components</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`const InteractiveCard = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="card hover-lift"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
};`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Performance Metrics
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">&lt;1s</div>
              <div className="text-gray-600">Load Time</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">Mobile Responsive</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">A+</div>
              <div className="text-gray-600">Performance Score</div>
            </div>
          </div>
        </div>

        {/* Interactive Elements Showcase */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Interactive Elements
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Button Showcase */}
            <div className="card p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Button Styles</h3>
              <div className="space-y-4">
                <button className="btn-primary w-full">Primary Button</button>
                <button className="btn-secondary w-full">Secondary Button</button>
                <button className="btn-gradient w-full">Gradient Button</button>
              </div>
            </div>

            {/* Form Elements */}
            <div className="card p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Form Elements</h3>
              <div className="space-y-4">
                <input 
                  type="text" 
                  className="cal-input" 
                  placeholder="Interactive input field"
                />
                <select className="cal-input">
                  <option>Select an option</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
                <textarea 
                  className="cal-input" 
                  rows="3" 
                  placeholder="Interactive textarea"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="card p-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-gray-600 mb-8">
              Let's create an interactive website that engages your visitors and drives results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-gradient">
                Start Your Project
              </button>
              <button className="btn-secondary">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveFeatures; 
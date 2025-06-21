import React from 'react';
import { Link } from 'react-router-dom';

const PricingPage = () => {
  const plans = [
    {
      name: "🟢 Starter",
      price: "120 OMR",
      description: "A sleek one-pager to introduce your brand online.",
      features: [
        "1-page responsive website",
        "Clean, elegant layout",
        "Fast delivery (7 days)",
        "Simple contact form",
      ],
      popular: false,
      cta: 'Choose Plan'
    },
    {
      name: "🌟 Basic",
      price: "220 OMR",
      description: "Smart design + built-in AI form logic.",
      features: [
        "3 custom-designed pages",
        "Contact form with auto-suggestions",
        "Dynamic animations & transitions",
        "14-day delivery",
      ],
      popular: true,
      cta: 'Choose Plan'
    },
    {
      name: "⚡ Standard",
      price: "420 OMR",
      description: "A high-functioning business site with smart interactions.",
      features: [
        "Up to 7 pages",
        "AI-integrated FAQ chatbot",
        "WhatsApp API integration",
        "Smart scroll animations",
      ],
      popular: false,
      cta: 'Choose Plan'
    },
    {
      name: "🚀 Premium",
      price: "550 OMR",
      description: "A complete digital experience with AI and advanced UI.",
      features: [
        "10+ pages (e.g. Shop, Blog)",
        "Full AI chatbot",
        "Advanced 3D elements",
        "1-month free support",
      ],
      popular: false,
      cta: 'Get a Quote'
    }
  ];

  return (
    <div className="container-mobile py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-anton hero-title">Flexible Pricing for Any Project</h1>
        <p className="mt-4 text-lg text-gray-400">Choose a plan that fits your needs.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan) => (
          <div key={plan.name} className={`pixel-card flex flex-col ${plan.popular ? 'border-green-400' : ''}`}>
            <div className="flex-grow">
              <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
              <p className="text-gray-400 text-sm mb-4 h-12">{plan.description}</p>
              <p className="text-4xl font-anton mb-6">{plan.price}</p>
              <ul className="space-y-3 text-gray-400">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <Link to="/checkout" className="pixel-btn w-full text-center">
                {plan.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage; 
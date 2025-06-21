import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PricingPage = () => {
  const plans = [
    {
      name: "🟢 Starter",
      price: "120 OMR",
      description: "A sleek one-pager to introduce your brand online.",
      subtitle: "Perfect for freelancers, portfolios, landing pages",
      features: [
        "1-page responsive website",
        "Clean, elegant layout",
        "Fast delivery (7 days)",
        "Simple contact form",
        "Fully mobile optimized",
        "1 free revision",
        "No AI features (this is a lightweight plan)"
      ],
      popular: false,
      deliveryTime: "7 days",
      bestFor: "Freelancers, portfolios, landing pages"
    },
    {
      name: "🌟 Basic",
      price: "220 OMR",
      description: "Smart design + built-in AI form logic",
      subtitle: "Perfect for small business owners, service providers, entrepreneurs",
      features: [
        "3 custom-designed pages",
        "Contact form with auto-suggestions and smart field validation",
        "AI-powered project intake suggestions (autofill based on industry)",
        "Dynamic animations & hover transitions",
        "14-day delivery",
        "Light & Dark mode support",
        "Fully mobile-first",
        "1 revision included"
      ],
      popular: true,
      deliveryTime: "14 days",
      bestFor: "Small business owners, service providers, entrepreneurs"
    },
    {
      name: "⚡ Standard",
      price: "420 OMR",
      description: "A high-functioning business site with smart interactions.",
      subtitle: "Perfect for coaches, growing brands, agencies",
      features: [
        "Up to 7 pages (e.g., Blog, Gallery, Services)",
        "AI-integrated FAQ chatbot or form assistant",
        "Portfolio with modals and hover-triggered effects",
        "WhatsApp API integration",
        "Smart scroll-linked animations",
        "SEO-friendly structure",
        "2 revisions",
        "Delivery: 14 days"
      ],
      popular: false,
      deliveryTime: "14 days",
      bestFor: "Coaches, growing brands, agencies"
    },
    {
      name: "🚀 Premium",
      price: "550 OMR",
      description: "A complete digital experience with AI and advanced UI",
      subtitle: "Perfect for premium brands, eCommerce, real estate, tech startups",
      features: [
        "10+ pages (Shop, Blog, Careers, FAQs...)",
        "Full AI chatbot that answers visitor questions",
        "Intelligent form handling: auto-categorize leads, send smart replies",
        "Advanced 3D elements (interactive previews or scroll-linked models)",
        "Animated SVGs, custom scroll behaviors",
        "Analytics integration with AI reporting preview",
        "Speed optimization",
        "1-month free support",
        "Free update after 1 month"
      ],
      popular: false,
      deliveryTime: "14 days",
      bestFor: "Premium brands, eCommerce, real estate, tech startups"
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="container-mobile">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Flexible Plans With Smart Technology Inside
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Choose a package built not just to look great — but to think smarter, interact smoother, and work harder for your goals.
            Our Basic, Standard, and Premium packages include AI-enhanced features, smart contact automation, and interactive experiences that engage visitors in real time.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`pricing-card ${plan.popular ? 'featured' : ''} hover-lift`}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-gray-900 mb-2">{plan.price}</div>
                <p className="text-gray-600 mb-2">{plan.description}</p>
                <p className="text-gray-500 text-sm mb-3">{plan.subtitle}</p>
                <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                  Best for: {plan.bestFor}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 mb-4">What's included:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Link
                  to="/checkout"
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  Start Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Work Policy */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Work Policy
          </h2>
          
          <div className="card p-8 max-w-4xl mx-auto">
            <p className="text-gray-600 mb-6">
              We prioritize transparency and quality. Here's our policy in simple terms:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">50% upfront required</h4>
                    <p className="text-gray-600 text-sm">Work begins after initial payment</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">7–14 days delivery</h4>
                    <p className="text-gray-600 text-sm">Standard delivery timeline</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Set pages & revisions</h4>
                    <p className="text-gray-600 text-sm">Each plan includes specified limits</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Extra changes: 10 OMR/page</h4>
                    <p className="text-gray-600 text-sm">After delivery completion</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">One project at a time</h4>
                    <p className="text-gray-600 text-sm">Full focus on your project</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Urgent requests: extra fees</h4>
                    <p className="text-gray-600 text-sm">For delivery in less than 5 days</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Cash or bank transfer</h4>
                    <p className="text-gray-600 text-sm">No deferred payments or installments</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Final files after full payment</h4>
                    <p className="text-gray-600 text-sm">Complete payment required</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Non-refundable deposit</h4>
                    <p className="text-gray-600 text-sm">After work begins</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Summer: full-time</h4>
                    <p className="text-gray-600 text-sm">University season: part-time schedule</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="card p-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Don't just look professional. Feel smart.
            </h2>
            <p className="text-gray-600 mb-8">
              Choose a package that matches your vision and let's build something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/checkout" className="btn-gradient">
                Choose Your Plan
              </Link>
              <a
                href="https://wa.me/96896540991"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage; 
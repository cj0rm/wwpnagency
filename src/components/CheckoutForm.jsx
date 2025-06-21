import React, { useState } from 'react';

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    chosenPlan: '',
    projectGoals: '',
    industry: '',
    addOns: []
  });

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const plans = [
    "🟢 Starter – 120 OMR",
    "🌟 Basic – 220 OMR",
    "⚡ Standard – 420 OMR", 
    "🚀 Premium – 550 OMR"
  ];

  const industries = [
    "Technology",
    "Healthcare",
    "Education",
    "Finance",
    "Real Estate",
    "E-commerce",
    "Food & Beverage",
    "Fashion & Beauty",
    "Travel & Tourism",
    "Professional Services",
    "Non-profit",
    "Entertainment",
    "Manufacturing",
    "Retail",
    "Other"
  ];

  const projectGoalSuggestions = {
    "Technology": [
      "SaaS platform website",
      "Mobile app landing page",
      "Developer portfolio",
      "Tech startup website",
      "API documentation site"
    ],
    "Healthcare": [
      "Medical practice website",
      "Telemedicine platform",
      "Healthcare provider directory",
      "Medical equipment showcase",
      "Health blog"
    ],
    "Education": [
      "Online course platform",
      "School website",
      "Tutoring service site",
      "Educational resources",
      "Student portal"
    ],
    "Finance": [
      "Financial advisor website",
      "Investment platform",
      "Banking services",
      "Insurance company site",
      "Financial blog"
    ],
    "Real Estate": [
      "Property listing site",
      "Real estate agency",
      "Property management",
      "Real estate blog",
      "Virtual tour platform"
    ],
    "E-commerce": [
      "Online store",
      "Product catalog",
      "Dropshipping site",
      "Marketplace platform",
      "Subscription service"
    ],
    "Food & Beverage": [
      "Restaurant website",
      "Food delivery platform",
      "Catering service",
      "Recipe blog",
      "Food truck site"
    ],
    "Fashion & Beauty": [
      "Fashion brand site",
      "Beauty salon website",
      "Fashion blog",
      "Beauty products store",
      "Styling service"
    ],
    "Travel & Tourism": [
      "Travel agency site",
      "Hotel booking platform",
      "Tour guide website",
      "Travel blog",
      "Vacation rental site"
    ],
    "Professional Services": [
      "Consulting firm site",
      "Law firm website",
      "Accounting services",
      "Marketing agency",
      "Design studio"
    ],
    "Non-profit": [
      "Charity organization",
      "Fundraising platform",
      "Volunteer portal",
      "Awareness campaign",
      "Community service"
    ],
    "Entertainment": [
      "Event venue site",
      "Entertainment agency",
      "Performance venue",
      "Artist portfolio",
      "Entertainment blog"
    ],
    "Manufacturing": [
      "Manufacturing company",
      "Product showcase",
      "Industrial services",
      "Equipment catalog",
      "B2B platform"
    ],
    "Retail": [
      "Retail store website",
      "Product catalog",
      "Customer portal",
      "Loyalty program",
      "Retail blog"
    ],
    "Other": [
      "Personal portfolio",
      "Blog website",
      "Community platform",
      "Hobby website",
      "Custom project"
    ]
  };

  const addOns = [
    "Shop page (+50 OMR)",
    "Blog section (+30 OMR)",
    "Portfolio gallery (+40 OMR)",
    "Contact form with AI (+25 OMR)",
    "WhatsApp integration (+20 OMR)",
    "SEO optimization (+35 OMR)",
    "Analytics setup (+20 OMR)",
    "Social media integration (+25 OMR)"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // AI auto-complete for project goals
    if (name === 'projectGoals') {
      const currentIndustry = formData.industry;
      if (currentIndustry && value.length > 2) {
        const industrySuggestions = projectGoalSuggestions[currentIndustry] || [];
        const filtered = industrySuggestions.filter(suggestion =>
          suggestion.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
      } else {
        setShowSuggestions(false);
      }
    }

    // Industry-specific form behavior
    if (name === 'industry') {
      setFormData(prev => ({
        ...prev,
        industry: value,
        projectGoals: '' // Reset project goals when industry changes
      }));
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData(prev => ({
      ...prev,
      projectGoals: suggestion
    }));
    setShowSuggestions(false);
  };

  const handleAddOnToggle = (addOn) => {
    setFormData(prev => ({
      ...prev,
      addOns: prev.addOns.includes(addOn)
        ? prev.addOns.filter(item => item !== addOn)
        : [...prev.addOns, addOn]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculate total cost
    let totalCost = 0;
    const planCosts = {
      "🟢 Starter – 120 OMR": 120,
      "🌟 Basic – 220 OMR": 220,
      "⚡ Standard – 420 OMR": 420,
      "🚀 Premium – 550 OMR": 550
    };
    
    totalCost += planCosts[formData.chosenPlan] || 0;
    
    // Add add-on costs
    formData.addOns.forEach(addOn => {
      const match = addOn.match(/\+(\d+)/);
      if (match) {
        totalCost += parseInt(match[1]);
      }
    });

    // Create email content
    const emailSubject = `New Project Inquiry - ${formData.fullName}`;
    const emailBody = `
New Project Inquiry from WWPN Agency Website

Client Information:
- Full Name: ${formData.fullName}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Business Name: ${formData.businessName || 'Not provided'}

Project Details:
- Chosen Plan: ${formData.chosenPlan}
- Industry: ${formData.industry}
- Project Goals: ${formData.projectGoals}
- Add-ons: ${formData.addOns.length > 0 ? formData.addOns.join(', ') : 'None'}

Estimated Total Cost: ${totalCost} OMR

Please review this inquiry and respond within 24 hours.

Best regards,
WWPN Agency Website
    `;

    // Open email client
    const mailtoLink = `mailto:faisalhaitham1123@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoLink);

    // Show success message
    alert('Thank you for your inquiry! An email has been opened with your project details. Please send it to complete your request.');
  };

  return (
    <div className="py-20 bg-gray-50">
      <div className="container-mobile">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Secure Your Spot – Start Your Project
            </h1>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll get back to you within 24 hours to discuss your project.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="card p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="cal-input"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="cal-input"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="cal-input"
                        placeholder="+968 9654 0991"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Name (optional)
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        className="cal-input"
                        placeholder="Your business name"
                      />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Chosen Plan *
                    </label>
                    <select
                      name="chosenPlan"
                      value={formData.chosenPlan}
                      onChange={handleInputChange}
                      required
                      className="cal-input"
                    >
                      <option value="">Select a plan</option>
                      {plans.map((plan, index) => (
                        <option key={index} value={plan}>{plan}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry *
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      required
                      className="cal-input"
                    >
                      <option value="">Select your industry</option>
                      {industries.map((industry, index) => (
                        <option key={index} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Goals (AI auto-complete suggestions) *
                    </label>
                    <input
                      type="text"
                      name="projectGoals"
                      value={formData.projectGoals}
                      onChange={handleInputChange}
                      required
                      className="cal-input"
                      placeholder="Describe your project goals..."
                    />
                    {showSuggestions && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                        {suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Interactive Add-ons */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Interactive Add-ons
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {addOns.map((addOn, index) => (
                        <label key={index} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.addOns.includes(addOn)}
                            onChange={() => handleAddOnToggle(addOn)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{addOn}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* AI-generated mini project brief summary */}
                  {formData.projectGoals && formData.industry && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">AI Project Summary</h4>
                      <p className="text-blue-800 text-sm">
                        Based on your {formData.industry.toLowerCase()} industry and goals, we recommend focusing on 
                        {formData.industry === 'E-commerce' ? ' conversion optimization and user experience' :
                         formData.industry === 'Technology' ? ' modern design and technical performance' :
                         formData.industry === 'Real Estate' ? ' visual appeal and lead generation' :
                         ' professional presentation and clear communication'}. 
                        Your project will benefit from our expertise in creating engaging, results-driven websites.
                      </p>
                    </div>
                  )}

                  <button type="submit" className="btn-gradient w-full py-4 text-lg">
                    Submit Project Inquiry
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Confirmation Text */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  You're about to start something amazing.
                </h3>
                <p className="text-gray-600 text-sm">
                  We'll review your request and reply within 24 hours with a detailed proposal and next steps.
                </p>
              </div>

              {/* Contact Information */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="text-sm text-gray-600">faisalhaitham1123@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span className="text-sm text-gray-600">+968 9654 0991</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <a
                    href="https://wa.me/96896540991"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-blue-600 hover:text-blue-800"
                  >
                    Chat on WhatsApp
                  </a>
                  <a
                    href="/pricing"
                    className="block text-sm text-blue-600 hover:text-blue-800"
                  >
                    View Pricing Plans
                  </a>
                  <a
                    href="/services"
                    className="block text-sm text-blue-600 hover:text-blue-800"
                  >
                    Our Services
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm; 
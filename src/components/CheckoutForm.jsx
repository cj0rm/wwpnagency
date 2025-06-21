import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const CheckoutForm = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    plan: '',
    brandName: '',
    description: '',
    projectGoal: '',
    industry: ''
  });
  const [suggestions, setSuggestions] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Get plan from URL params
  useEffect(() => {
    const plan = searchParams.get('plan');
    if (plan) {
      setFormData(prev => ({ ...prev, plan }));
    }
  }, [searchParams]);

  // AI Suggestions based on industry
  const generateSuggestions = (industry) => {
    const suggestionsMap = {
      'tech': {
        goals: ['Increase user engagement', 'Improve conversion rates', 'Showcase technical expertise'],
        mission: 'Empowering businesses through innovative technology solutions',
        layout: 'Modern, clean design with focus on functionality'
      },
      'healthcare': {
        goals: ['Build trust and credibility', 'Improve patient experience', 'Streamline operations'],
        mission: 'Providing compassionate care through advanced medical solutions',
        layout: 'Professional, trustworthy design with easy navigation'
      },
      'education': {
        goals: ['Enhance learning experience', 'Increase enrollment', 'Showcase academic excellence'],
        mission: 'Fostering knowledge and growth through quality education',
        layout: 'Engaging, informative design with clear content hierarchy'
      },
      'retail': {
        goals: ['Increase sales', 'Improve customer experience', 'Showcase products effectively'],
        mission: 'Delivering exceptional shopping experiences through quality products',
        layout: 'Visually appealing design with strong call-to-actions'
      },
      'finance': {
        goals: ['Build trust and security', 'Improve user experience', 'Increase conversions'],
        mission: 'Securing your financial future through reliable services',
        layout: 'Professional, secure design with clear value propositions'
      }
    };
    
    return suggestionsMap[industry] || {
      goals: ['Increase brand awareness', 'Improve user engagement', 'Drive conversions'],
      mission: 'Delivering exceptional value through innovative solutions',
      layout: 'Modern, responsive design optimized for your audience'
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Generate suggestions when industry changes
    if (name === 'industry' && value) {
      setSuggestions(generateSuggestions(value));
    }
  };

  const useSuggestion = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare email content
    const emailContent = `
New Web Development Project Inquiry

Name: ${formData.name}
Email: ${formData.email}
Plan: ${formData.plan}
Brand Name: ${formData.brandName}
Industry: ${formData.industry}

Project Description:
${formData.description}

Project Goal:
${formData.projectGoal}

---
This inquiry was submitted from the WWPN Agency website.
    `;

    // Send email using mailto (for now - you can replace with actual email service)
    const mailtoLink = `mailto:faisalhaitham1123@gmail.com?subject=New Web Development Project - ${formData.plan}&body=${encodeURIComponent(emailContent)}`;
    window.open(mailtoLink);

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="container-mobile py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="pixel-card p-8">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-3xl font-anton hero-title mb-6">Thank You!</h1>
            <p className="text-xl text-gray-400 mb-8">
              We've received your project inquiry. Our team will review your requirements and get back to you with a detailed proposal within 24 hours.
            </p>
            <button 
              onClick={() => window.location.href = '/'} 
              className="pixel-btn"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-mobile py-12">
      <div className="max-w-4xl mx-auto">
        <div className="pixel-card p-8">
          <h1 className="text-3xl font-anton hero-title mb-6 text-center">Start Your Project</h1>
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
              <label htmlFor="plan" className="block text-sm font-medium mb-2">Selected Plan</label>
              <select 
                id="plan" 
                name="plan" 
                value={formData.plan}
                onChange={handleChange}
                className="cal-input"
                required
              >
                <option value="">Select a plan</option>
                <option value="Starter – 120 OMR">Starter – 120 OMR</option>
                <option value="Basic – 220 OMR">Basic – 220 OMR</option>
                <option value="Standard – 420 OMR">Standard – 420 OMR</option>
                <option value="Premium – 550 OMR">Premium – 550 OMR</option>
              </select>
            </div>

            <div>
              <label htmlFor="brandName" className="block text-sm font-medium mb-2">Brand Name</label>
              <input
                type="text"
                id="brandName"
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                className="cal-input"
                placeholder="Your company or brand name"
                required
              />
            </div>

            <div>
              <label htmlFor="industry" className="block text-sm font-medium mb-2">Industry</label>
              <select 
                id="industry" 
                name="industry" 
                value={formData.industry}
                onChange={handleChange}
                className="cal-input"
                required
              >
                <option value="">Select your industry</option>
                <option value="tech">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="retail">Retail/E-commerce</option>
                <option value="finance">Finance</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">Project Description</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="cal-input"
                placeholder="Tell us about your project, what you want to achieve, and any specific requirements..."
                required
              ></textarea>
            </div>

            <div>
              <label htmlFor="projectGoal" className="block text-sm font-medium mb-2">Project Goal</label>
              <textarea
                id="projectGoal"
                name="projectGoal"
                rows="3"
                value={formData.projectGoal}
                onChange={handleChange}
                className="cal-input"
                placeholder="What is the main goal of this project?"
                required
              ></textarea>
            </div>

            {/* AI Suggestions Section */}
            {Object.keys(suggestions).length > 0 && (
              <div className="pixel-card bg-gray-800/50 p-6">
                <h3 className="text-lg font-semibold mb-4">🤖 AI Suggestions</h3>
                <div className="space-y-4">
                  {suggestions.goals && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Suggested Goals:</h4>
                      <div className="space-y-2">
                        {suggestions.goals.map((goal, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => useSuggestion('projectGoal', goal)}
                            className="block w-full text-left text-sm text-gray-400 hover:text-white p-2 rounded border border-gray-600 hover:border-gray-400 transition-colors"
                          >
                            Use: {goal}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {suggestions.mission && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Mission Statement Example:</h4>
                      <button
                        type="button"
                        onClick={() => useSuggestion('description', suggestions.mission)}
                        className="block w-full text-left text-sm text-gray-400 hover:text-white p-2 rounded border border-gray-600 hover:border-gray-400 transition-colors"
                      >
                        Use: {suggestions.mission}
                      </button>
                    </div>
                  )}
                  
                  {suggestions.layout && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Layout Recommendation:</h4>
                      <p className="text-sm text-gray-400">{suggestions.layout}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <button type="submit" className="pixel-btn w-full">
              Send Project Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm; 
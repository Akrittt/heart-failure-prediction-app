import React, { useState } from 'react';
import { Mail, User, MessageCircle, Send, CheckCircle, AlertCircle,Server } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setStatus('');

    try {
      const response = await fetch('localhost:8080/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="ContactUs" className="bg-gradient-to-r from-sky-50 to-sky-100 min-h-screen  flex items-center justify-center p-6 flex-col mb-15">

      <div className="max-w-2xl border border-sky-200 rounded-2xl w-full p-8 bg-gradient-to-b from-blue-100 to-blue-200 shadow-lg">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 ">
            Contact Us
          </h1>

          <p className="text-gray-600 text-sm ">
            Have a question or want to collaborate? Drop me a message!
          </p>
        </div>

        {/* Feature Highlight Box */}
        <div className="bg-gray-200 border border-gray-200 rounded-lg p-4 flex items-center gap-4 mb-8">
            <Server size={32} className="text-sky-700 flex-shrink-0" />
            <div>
                <h3 className="font-bold text-gray-700">Spring Boot Backend at Work</h3>
                <p className="text-sm text-gray-500">
                    When you submit this form, my Java backend will process it and use the <strong>JavaMailSender</strong> library to send you a "thank you" email automatically.
                </p>
            </div>
        </div>

        {/* Contact Form */}
        <div className="bg-sky-200 backdrop-blur-lg rounded-2xl p-8 shadow-md border-1 border-sky-400">
          <div className="space-y-6">
            {/* Name Field */}
            <div className="relative">
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-700 w-5 h-5" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/30 border border-white/20 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                  placeholder="Your full name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-700 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/30 border border-white/20 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {/* Subject Field */}
            <div className="relative">
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject
              </label>
              <div className="relative">
                <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-700 w-5 h-5" />
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/30 border border-white/20 rounded-lg  placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                  placeholder="What's this about?"
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="relative">
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-white/30 border border-white/20 rounded-lg  placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-none"
                placeholder="Tell me about your project, ideas, or just say hello..."
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-400 to-blue-400 hover:from-purple-500 hover:to-blue-500 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-101 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </div>

          {/* Status Messages */}
          {status === 'success' && (
            <div className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <p className="text-green-300 font-medium">Message sent successfully!</p>
                <p className="text-green-400 text-sm">Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center space-x-3">
              <AlertCircle className="w-6 h-6 text-red-400" />
              <div>
                <p className="text-red-300 font-medium">Failed to send message</p>
                <p className="text-red-400 text-sm">Please try again or contact me directly.</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ContactUs;
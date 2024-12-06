// src/components/features/Home/HomePage.jsx
import React from 'react';
import HeroSection from './HeroSection';
import { 
  Users, 
  Target, 
  Award,
  Zap,
  BrainCircuit,
  Shield,
  TrendingUp
} from 'lucide-react';
import { FeatureCard, StatsCard, TestimonialCard } from './HomeComponents';

const HomePage = () => {
  const stats = [
    { value: "1000+", label: "Active Users", icon: Users, delay: 0.2 },
    { value: "50+", label: "Training Scenarios", icon: Target, delay: 0.4 },
    { value: "95%", label: "Success Rate", icon: Award, delay: 0.6 },
    { value: "24/7", label: "AI Support", icon: Zap, delay: 0.8 }
  ];

  const features = [
    {
      icon: Users,
      title: "AI-Powered Client Personas",
      description: "Experience dynamic conversations with realistic client profiles that adapt to your approach.",
      delay: 0.3
    },
    {
      icon: BrainCircuit,
      title: "Intelligent Feedback System",
      description: "Receive real-time insights and personalized recommendations to enhance your advisory skills.",
      delay: 0.5
    },
    {
      icon: Shield,
      title: "Scenario-Based Learning",
      description: "Master complex client situations through immersive, real-world training scenarios.",
      delay: 0.7
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description: "Track your progress with detailed metrics and actionable insights for improvement.",
      delay: 0.9
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Financial Advisor",
      content: "Kirdar.ai has transformed how I approach client conversations. The AI scenarios are incredibly realistic!",
      delay: 0.4
    },
    {
      name: "Michael Chen",
      role: "Wealth Manager",
      content: "The instant feedback and personalized recommendations have accelerated my professional growth significantly.",
      delay: 0.6
    },
    {
      name: "Emma Davis",
      role: "Investment Consultant",
      content: "An invaluable tool for practicing complex client scenarios in a risk-free environment.",
      delay: 0.8
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Enhanced Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-900/10 to-transparent" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 via-black to-black" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 mb-4">
              Premium Features
            </h2>
            <p className="text-gray-400 text-lg">
              Everything you need to excel in financial advisory
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-sky-900/10 to-black" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 mb-4">
              What Our Users Say
            </h2>
            <p className="text-gray-400 text-lg">
              Join thousands of financial advisors who have transformed their practice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
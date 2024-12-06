// src/components/features/Home/HeroSection.jsx
import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <div ref={parallaxRef} className="absolute inset-0">
          {/* Improved Grid Pattern */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={`horizontal-${i}`}
                className="absolute h-px bg-gradient-to-r from-transparent via-sky-500 to-transparent"
                style={{
                  top: `${i * 5}%`,
                  left: '-100%',
                  right: '-100%',
                  opacity: '0.2',
                  animation: `slideRight ${8 + i % 3}s linear infinite`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
            {[...Array(20)].map((_, i) => (
              <div
                key={`vertical-${i}`}
                className="absolute w-px bg-gradient-to-b from-transparent via-sky-500 to-transparent"
                style={{
                  left: `${i * 5}%`,
                  top: '-100%',
                  bottom: '-100%',
                  opacity: '0.15',
                  animation: `slideDown ${10 + i % 4}s linear infinite`,
                  animationDelay: `${i * 0.3}s`
                }}
              />
            ))}
          </div>

          {/* Enhanced Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(40)].map((_, i) => (
              <div
                key={`particle-${i}`}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 6 + 2 + 'px',
                  height: Math.random() * 6 + 2 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  background: `rgba(${125 + Math.random() * 50}, ${200 + Math.random() * 55}, ${255}, ${0.3 + Math.random() * 0.4})`,
                  boxShadow: `0 0 ${10 + Math.random() * 10}px rgba(125, 211, 255, 0.5)`,
                  animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>

          {/* Radial Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/50 to-black pointer-events-none" />
        </div>
      </div>

      {/* Hero Content */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-6 animate-fadeIn relative">
          <div className="absolute inset-0 blur-2xl bg-sky-500/30 rounded-full animate-pulse" />
          <Sparkles className="relative inline-block text-sky-400 w-16 h-16 mb-4 animate-float" />
        </div>
        
        <h1 className="text-7xl font-bold mb-6 animate-fadeIn relative">
          <span className="relative inline-block">
            <span className="absolute -inset-1 bg-gradient-to-r from-sky-600/30 to-blue-600/30 blur-2xl" />
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
              Kirdar.ai
            </span>
          </span>
        </h1>
        
        <p className="text-3xl text-gray-300 mb-8 animate-fadeIn opacity-0" 
           style={{ animationDelay: '0.2s' }}>
          Elevate Your Advisory Practice
        </p>
        
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto animate-fadeIn opacity-0" 
           style={{ animationDelay: '0.4s' }}>
          Master client interactions through AI-powered simulations and receive real-time feedback to enhance your skills
        </p>
        
        <button
          onClick={() => navigate('/questionnaire')}
          className="group relative px-8 py-4 rounded-full font-medium text-lg animate-fadeIn opacity-0 overflow-hidden"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-blue-700 transition-transform duration-300 group-hover:scale-105" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-600" />
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          </div>
          <span className="relative flex items-center gap-2">
            Begin Your Journey
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>

      <style jsx="true">{`
        @keyframes slideRight {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }

        @keyframes slideDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(100%); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
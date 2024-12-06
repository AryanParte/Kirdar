import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  BrainCircuit, 
  Users, 
  ChartBar, 
  RefreshCw,
  Sparkles,
  ArrowDown,
  CheckCircle2,
  Star,
  Shield,
  Zap,
  MessagesSquare,
  TrendingUp,
  Target
} from 'lucide-react';

// Animated Number Counter Component
const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime;
    const endValue = parseInt(value.replace(/\D/g, ''));
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;
      
      if (progress < 1) {
        setCount(Math.floor(endValue * progress));
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value, duration]);
  
  return <span>{count.toLocaleString()}{value.includes('+') ? '+' : ''}</span>;
};

// Interactive Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative group bg-gray-900/50 p-8 rounded-xl border border-gray-800 transition-all duration-500 hover:border-sky-900/50"
      style={{
        animation: `fadeInUp 0.5s ease-out ${delay}s both`,
        transform: isHovered ? 'translateY(-8px)' : 'none'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-600/0 via-sky-600/10 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
      
      {/* Icon with Floating Animation */}
      <div className="relative">
        <div className="absolute inset-0 bg-sky-500/20 rounded-full blur-xl transform group-hover:scale-110 transition-transform duration-500" />
        <div className="relative text-sky-500 mb-6 transform transition-transform duration-500 group-hover:scale-110">
          <Icon size={48} strokeWidth={1.5} />
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-sky-400 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
        {description}
      </p>

      {/* Animated Border */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-sky-500 to-transparent" style={{ transform: 'translateX(-100%)', animation: 'slideRight 2s linear infinite' }} />
          <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-r from-transparent via-sky-500 to-transparent" style={{ transform: 'translateX(100%)', animation: 'slideLeft 2s linear infinite' }} />
        </div>
      </div>
    </div>
  );
};

// Stats Card with Animated Background
const StatsCard = ({ value, label, icon: Icon, delay = 0 }) => (
  <div 
    className="relative overflow-hidden bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-sky-900/50 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-900/20"
    style={{
      animation: `fadeInUp 0.5s ease-out ${delay}s both`
    }}
  >
    {/* Animated Background Pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-blue-500/20" 
           style={{ transform: 'skewY(-20deg)', animation: 'pulse 3s ease-in-out infinite' }} />
    </div>

    <div className="relative flex items-center gap-4">
      <div className="p-3 bg-sky-900/30 rounded-lg">
        <Icon className="w-6 h-6 text-sky-400" />
      </div>
      <div>
        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
          <AnimatedCounter value={value} />
        </div>
        <div className="text-gray-400 text-sm mt-1">{label}</div>
      </div>
    </div>
  </div>
);

// Testimonial Card Component
const TestimonialCard = ({ name, role, content, image, delay = 0 }) => (
  <div 
    className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 transition-all duration-300 hover:border-sky-900/50 transform hover:-translate-y-1"
    style={{
      animation: `fadeInUp 0.5s ease-out ${delay}s both`
    }}
  >
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <img 
          src={image || "/api/placeholder/64/64"} 
          alt={name} 
          className="w-12 h-12 rounded-full bg-gray-800"
        />
      </div>
      <div>
        <p className="text-gray-300 mb-4">{content}</p>
        <div>
          <p className="font-semibold text-sky-400">{name}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  </div>
);

export { AnimatedCounter, FeatureCard, StatsCard, TestimonialCard };
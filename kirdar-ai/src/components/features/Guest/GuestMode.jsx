// src/components/features/Guest/GuestMode.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  KeyRound, 
  ArrowRight, 
  Users, 
  Target,
  Loader,
  AlertCircle,
  Clock,
  BookOpen 
} from 'lucide-react';

// Guest Entry Component
const GuestEntry = () => {
  const [accessCode, setAccessCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      console.log('Validating guest code:', accessCode);
      const response = await fetch('http://localhost:5001/api/guest/validate-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: accessCode })
      });

      if (!response.ok) {
        throw new Error('Invalid access code');
      }

      const data = await response.json();
      console.log('Guest code validation response:', data);

      localStorage.setItem('guestCode', accessCode);
      
      navigate('/guest/selection', { 
        state: { 
          code: accessCode,
          assignments: data.assignments,
          features: data.features
        }
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-20 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 mb-4">
          Guest Access
        </h1>
        <p className="text-gray-400 mb-8">
          Enter your access code to begin the simulation. Don't have a code? Contact your administrator.
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-500">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2" htmlFor="accessCode">
              Access Code
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <input
                id="accessCode"
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                placeholder="Enter your access code"
                className="w-full bg-gray-900/50 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:border-sky-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!accessCode || isLoading}
            className="w-full bg-gradient-to-r from-sky-600 to-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:from-sky-500 hover:to-blue-600 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin h-5 w-5" />
                Validating...
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Ready to create an account?{' '}
            <Link to="/register" className="text-sky-400 hover:text-sky-300">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// Guest Selection Component
const GuestSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { code, assignments, features } = location.state || {};

  useEffect(() => {
    console.log('GuestSelection - Full state:', location.state);
    console.log('GuestSelection - Features:', features);
    
    if (!code || !assignments) {
      navigate('/guest', { replace: true });
    }
  }, [code, assignments, features, navigate]);

  const handleStartSimulation = (type, data) => {
    console.log('Starting simulation with features:', features);
    
    navigate('/guest/simulation', {
      state: {
        type,
        data,
        guestData: {
          code,
          assignments,
          features: {
            mentorEnabled: features?.mentorEnabled || false,
            evaluatorEnabled: features?.evaluatorEnabled || false
          }
        }
      }
    });
  };

  if (!code || !assignments) {
    return null;
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Expert':
        return 'bg-red-900/50 text-red-400';
      case 'Advanced':
        return 'bg-orange-900/50 text-orange-400';
      default:
        return 'bg-yellow-900/50 text-yellow-400';
    }
  };

  return (
    <div className="min-h-screen bg-black pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 mb-4">
          Choose Your Simulation
        </h1>
        <p className="text-gray-400 mb-8">
          Select a scenario or client persona to begin your simulation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personas Section */}
          {assignments.personas && assignments.personas.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-sky-400" />
                Client Personas
              </h2>
              {assignments.personas.map((persona) => (
                <button
                  key={persona._id}
                  onClick={() => handleStartSimulation('persona', persona)}
                  className="w-full bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-sky-900/50 text-left transition-all duration-300 hover:-translate-y-1"
                >
                  <h3 className="text-lg font-medium text-sky-400 mb-2">
                    {persona.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {persona.goals}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Age: {persona.age}</span>
                    <span className="mx-2">•</span>
                    <span>Risk: {persona.riskTolerance}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Scenarios Section */}
          {assignments.scenarios && assignments.scenarios.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-sky-400" />
                Practice Scenarios
              </h2>
              {assignments.scenarios.map((scenario) => (
                <button
                  key={scenario._id}
                  onClick={() => handleStartSimulation('scenario', scenario)}
                  className="w-full bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-sky-900/50 text-left transition-all duration-300 hover:-translate-y-1"
                >
                  <h3 className="text-lg font-medium text-sky-400 mb-2">
                    {scenario.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {scenario.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span>{scenario.category}</span>
                    <span className="text-gray-500">•</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${getDifficultyColor(scenario.difficulty)}`}>
                      {scenario.difficulty}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="flex items-center gap-1 text-gray-400">
                      <Clock className="w-4 h-4" />
                      {scenario.estimatedTime}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Empty State */}
          {(!assignments.personas?.length && !assignments.scenarios?.length) && (
            <div className="col-span-2 text-center py-12 bg-gray-900/50 rounded-xl border border-gray-800">
              <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">
                No content has been assigned to this guest code. Please contact the administrator.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { GuestEntry, GuestSelection };
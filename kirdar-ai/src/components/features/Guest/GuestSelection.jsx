// src/components/features/Guest/GuestSelection.jsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Users, Target, Clock, Loader, AlertCircle, BookOpen } from 'lucide-react';

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
      console.log('Starting simulation with features:', features); // Debug log
      
      navigate('/guest/simulation', {
        state: {
          type,
          data,
          guestData: {
            code,
            assignments,
            features: {
              mentorEnabled: true, // Force enable for testing
              evaluatorEnabled: true // Force enable for testing
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

export default GuestSelection;
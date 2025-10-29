import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface OrgJoinFlowProps {
  onBack?: () => void;
}

export function OrgJoinFlow({ onBack }: OrgJoinFlowProps) {
  const [inviteCode, setInviteCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
    setInviteCode(value);
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteCode.length !== 6) return;

    setIsLoading(true);
    setError('');

    try {
      // TODO: Replace with actual Supabase RPC call
      // const { data, error } = await supabase.rpc('join_organization', { p_code: inviteCode });
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate success response
      const mockResponse = { id: 'org_123', status: 'success' };
      
      if (mockResponse.status === 'success') {
        // TODO: Call refreshOrganizations()
        navigate(`/organization/${mockResponse.id}`);
      } else {
        setError('Invalid invite code. Please check and try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isValidCode = inviteCode.length === 6;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 px-6 py-8 text-center">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 className="font-news text-xl text-gray-900 mb-2">Join Your Team</h3>
        <p className="text-sm text-gray-600">Enter your invite code to access shared resources and collaborate with your team</p>
      </div>

      {/* Form Section */}
      <div className="px-6 py-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="inviteCode" className="block text-sm font-medium text-gray-700 mb-2">
              Invite Code
            </label>
            <input
              id="inviteCode"
              type="text"
              value={inviteCode}
              onChange={handleCodeChange}
              placeholder="Enter 6-character code"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-center text-lg font-mono tracking-widest uppercase focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              maxLength={6}
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <div className="flex">
                <svg className="w-5 h-5 text-red-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="ml-2 text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={!isValidCode || isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Joining...
              </div>
            ) : (
              'Join Organization'
            )}
          </button>
        </form>

        {onBack && (
          <button
            onClick={onBack}
            className="w-full mt-4 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
          >
            ← Back
          </button>
        )}
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">What you'll get:</h4>
        <div className="space-y-2">
          <div className="flex items-start">
            <svg className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-xs text-gray-600">Collaborative prep sessions with your team</span>
          </div>
          <div className="flex items-start">
            <svg className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-xs text-gray-600">Shared progress tracking and analytics</span>
          </div>
          <div className="flex items-start">
            <svg className="w-4 h-4 text-gray-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 20 20">
              <rect x="3" y="3" width="14" height="14" rx="2" ry="2" strokeWidth="2" />
            </svg>
            <span className="text-xs text-gray-600">Access to team resources and materials</span>
          </div>
        </div>
      </div>
    </div>
  );
}

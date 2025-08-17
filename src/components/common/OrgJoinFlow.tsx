import React from "react";

export const OrgJoinFlow: React.FC = () => {
  return (
    <div className="relative w-full aspect-[16/9] rounded-xl border border-gray-200 ring-1 ring-blue-100 shadow-lg p-2 sm:p-3">
      {/* Organization Panel (Right side) */}
      <div className="absolute right-0 top-0 w-[70%] h-full bg-white border border-gray-200 rounded-xl shadow-sm z-10 p-4 sm:p-6">
        {/* Organization Content */}
        <div className="h-full flex flex-col">
          <div className="mb-4">
            <h3 className="text-base font-semibold tracking-tight text-gray-900 mb-2">Organization Dashboard</h3>
            <p className="text-sm sm:text-base text-gray-700">Manage members, track analytics, and coordinate prep efforts.</p>
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div className="text-sm font-semibold text-gray-900 mb-1">Members</div>
              <div className="text-2xl font-bold text-blue-600">24</div>
              <div className="text-xs text-gray-600">Active users</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div className="text-sm font-semibold text-gray-900 mb-1">Sessions</div>
              <div className="text-2xl font-bold text-blue-600">156</div>
              <div className="text-xs text-gray-600">This week</div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm font-semibold text-gray-900 mb-2">Recent Activity</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>New member joined</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Mock interview completed</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Analytics updated</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Join Flow Card (Blue, left side) */}
      <div className="absolute left-2 top-[6%] w-[28%] h-[72%] bg-blue-600 border border-blue-600 rounded-xl shadow-lg z-20 flex items-center justify-center text-center p-4">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-white mb-2">Join Organization</h2>
          <p className="text-sm sm:text-base text-white mb-4">Enter your invite code to get started</p>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-xs text-white/80 mb-1">Invite Code</div>
            <div className="text-sm font-mono text-white">ROL-ABC123</div>
          </div>
        </div>
      </div>
    </div>
  );
};

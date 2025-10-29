export function CreateOrganizationFlow() {
  return (
    <div className="relative w-full border border-gray-200 ring-1 ring-blue-100 shadow-lg bg-gray-50">
      {/* Subtle texture pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      {/* Content */}
      <div className="relative p-3">
        {/* Step 1: Quick Setup */}
        <div className="space-y-2">
          <div>
            <div className="text-xs uppercase tracking-wider text-gray-600 mb-1">Name</div>
            <div className="w-full h-6 border border-gray-200 bg-white rounded px-2 flex items-center">
              <span className="text-xs text-gray-900">Investment Banking Club</span>
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-gray-600 mb-1">School</div>
            <div className="w-full h-6 border border-gray-200 bg-white rounded px-2 flex items-center">
              <span className="text-xs text-gray-900">Harvard University</span>
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-gray-600 mb-1">Join Policy</div>
            <div className="w-full h-6 border border-gray-200 bg-white rounded px-2 flex items-center">
              <span className="text-xs text-gray-900">Invite-Only</span>
            </div>
          </div>
        </div>

        {/* Step 2: Features Selection */}
        <div className="mt-3 space-y-1.5">
          <div className="border border-blue-200 p-1.5 bg-blue-50 rounded">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 border border-blue-300 bg-blue-100 rounded"></div>
              <div className="text-xs text-blue-900">Team Analytics</div>
            </div>
          </div>

          <div className="border border-indigo-200 p-1.5 bg-indigo-50 rounded">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 border border-indigo-300 bg-indigo-100 rounded"></div>
              <div className="text-xs text-indigo-900">Shared Resources</div>
            </div>
          </div>

          <div className="border border-purple-200 p-1.5 bg-purple-50 rounded">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 border border-purple-300 bg-purple-100 rounded"></div>
              <div className="text-xs text-purple-900">Mock Interviews</div>
            </div>
          </div>
        </div>

        {/* Step 3: Success & Invite */}
        <div className="mt-3 text-center">
          <div className="mb-2">
            <div className="text-xs font-semibold text-gray-900">Ready to Launch!</div>
          </div>

          <div className="border border-emerald-200 p-1.5 mb-2 bg-emerald-50 rounded">
            <div className="text-xs font-semibold text-emerald-900 mb-1">Invite Code</div>
            <div className="text-xs font-mono bg-white border border-emerald-200 px-2 py-0.5 text-emerald-700 rounded text-center">
              ABC123
            </div>
          </div>

          <div className="w-full h-6 border border-blue-600 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xs font-medium rounded shadow-sm">
            Create Organization
          </div>
        </div>
      </div>
    </div>
  );
}

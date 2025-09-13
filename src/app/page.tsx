export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      {/* Service Unavailable Message */}
      <div className="bg-gray-50 rounded-xl p-12 border-2 border-gray-200">
        <div className="mb-8">
          <svg 
            className="mx-auto h-16 w-16 text-gray-400 mb-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" 
            />
          </svg>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Service Unavailable</h1>
          <p className="text-xl text-gray-600 mb-6">
            This e-commerce service has been discontinued.
          </p>
          <p className="text-gray-500">
            We apologize for any inconvenience. The shopping functionality is no longer available.
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">What happened?</h2>
          <p className="text-gray-600 text-sm">
            The e-commerce functionality has been disabled per user request. 
            All shopping features including product browsing, cart management, and checkout have been turned off.
          </p>
        </div>
      </div>
    </div>
  );
}

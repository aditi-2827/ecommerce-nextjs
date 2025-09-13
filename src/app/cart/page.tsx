export default function Cart() {
  return (
    <div className="max-w-3xl mx-auto p-4 py-16 text-center">
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
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9zm0 0l1-7h13l1 7M9 11v6m6-6v6" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" 
            />
          </svg>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Shopping Cart Unavailable</h1>
          <p className="text-lg text-gray-600 mb-6">
            The shopping cart functionality has been disabled.
          </p>
          <p className="text-gray-500">
            Cart management and checkout features are no longer available.
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Service Discontinued</h2>
          <p className="text-gray-600 text-sm">
            All e-commerce functionality including shopping cart, product browsing, and checkout has been turned off per user request.
          </p>
        </div>
      </div>
    </div>
  );
}

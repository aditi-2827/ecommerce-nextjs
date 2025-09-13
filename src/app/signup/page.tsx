export default function Signup() {
  return (
    <div className="max-w-md mx-auto mt-8 p-6 text-center">
      <div className="bg-gray-50 rounded-xl p-8 border-2 border-gray-200">
        <div className="mb-6">
          <svg 
            className="mx-auto h-12 w-12 text-gray-400 mb-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" 
            />
          </svg>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Sign Up Unavailable</h1>
          <p className="text-gray-600 mb-4">
            User registration has been disabled.
          </p>
          <p className="text-gray-500 text-sm">
            Account creation is no longer available as the e-commerce service has been discontinued.
          </p>
        </div>
      </div>
    </div>
  );
}

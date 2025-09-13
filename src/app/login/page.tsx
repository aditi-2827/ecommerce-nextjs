export default function Login() {
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
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" 
            />
          </svg>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Login Unavailable</h1>
          <p className="text-gray-600 mb-4">
            User authentication has been disabled.
          </p>
          <p className="text-gray-500 text-sm">
            Login functionality is no longer available as the e-commerce service has been discontinued.
          </p>
        </div>
      </div>
    </div>
  );
}

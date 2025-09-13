const Navbar = () => {
  return (
    <nav className="bg-white text-gray-800 shadow-md sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-400 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            E-Shop (Discontinued)
          </div>

          <div className="flex items-center space-x-8">
            <span className="font-medium text-gray-400 cursor-not-allowed">
              Home
            </span>
            
            <span className="font-medium text-gray-400 cursor-not-allowed">
              Products
            </span>
            
            <span className="font-medium text-gray-400 cursor-not-allowed">
              Categories
            </span>

            <span className="flex items-center text-gray-400 cursor-not-allowed">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </span>

            <div className="flex items-center space-x-4">
              <span className="text-gray-400 font-medium cursor-not-allowed">
                Login
              </span>
              <span className="bg-gray-300 text-gray-500 px-5 py-2 rounded-lg font-medium cursor-not-allowed">
                Sign Up
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

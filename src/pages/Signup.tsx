// import React from 'react';
// import { Link } from 'react-router-dom';

// const Signup: React.FC = () => {
//   const handleGoogleSignup = () => {
//     window.location.href = '/auth/google';
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 flex items-center justify-center">
//       <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-3xl font-bold text-white mb-6 text-center">Sign Up</h2>
//         <button
//           onClick={handleGoogleSignup}
//           className="w-full bg-white text-gray-800 font-bold py-2 px-4 rounded mb-4 inline-flex items-center justify-center"
//         >
//           <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
//             <path
//               fill="#4285F4"
//               d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
//             />
//           </svg>
//           <span>Sign up with Google</span>
//         </button>
//         <p className="text-white text-center">
//           Already have an account?{' '}
//           <Link to="/login" className="text-blue-400 hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleSignup = () => {
    window.location.href = '/auth/google';
  };

  useEffect(() => {
    // Check if the user is already logged in
    fetch('/api/user')
      .then(response => response.json())
      .then(data => {
        if (data.user) {
          navigate('/');
        }
      })
      .catch(error => console.error('Error:', error));
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Sign Up</h2>
        <button
          onClick={handleGoogleSignup}
          className="w-full bg-white text-gray-800 font-bold py-2 px-4 rounded mb-4 inline-flex items-center justify-center"
        >
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
            />
          </svg>
          <span>Sign up with Google</span>
        </button>
        <p className="text-white text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;


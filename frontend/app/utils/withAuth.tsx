// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Cookies from 'js-cookie';



// const withAuth = (WrappedComponent: React.ComponentType) => {
//   const AuthComponent: React.FC = (props) => {
//     const router = useRouter();

//     useEffect(() => {
    
//       const jwtToken = Cookies.get('currentUser');

//       if (!jwtToken) {
//         router.push('/');
//         return;
//       }

//     },  [router]);

//     return <WrappedComponent {...props} />;
//   };

//   return AuthComponent;
// };

// export default withAuth;

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthComponent: React.FC = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const jwtToken = Cookies.get('currentUser');

      if (!jwtToken) {
        // if no JWT token, redirect to Homepage
        router.push('/');
      } else {
        // if have JWT token, meaning the user is verified and logged in
        setIsAuthenticated(true);
      }

      // set loading status to false
      setLoading(false);
    }, [router]);

    if (loading) {
      // show Loading when checking for Authentication status
      return <div>Loading...</div>;
    }

    // when verified, render corresponding page components
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return AuthComponent;
};

export default withAuth;
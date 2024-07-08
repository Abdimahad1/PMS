import { Navigate } from 'react-router-dom';

// ProtectedRoute component ensures that only authenticated users can access certain routes
const ProtectedRoute = ({ user, children }) => {
  // If the user is not authenticated, redirect to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the children components
  return children;
};

export default ProtectedRoute;

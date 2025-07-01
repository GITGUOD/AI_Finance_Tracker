import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/Context/AuthContext';
import { JSX } from 'react';

interface Props {
  children: JSX.Element;
}

function Redirection({ children }: Props) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default Redirection;

import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { localStorageManager } from 'utils/localeStorage';

interface AuthCheckProp {
  children: ReactNode;
}

export const AuthCheck = (props: AuthCheckProp) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const token = localStorageManager.get('accessToken');

  useEffect(() => {
    if (token) {
      return navigate('/dashboard');
    }
    setLoading(false);
  }, [token, navigate]);

  if (loading) {
    // While checking token, render nothing or a loading indicator
    return <div>Loading</div>;
  }

  return <>{props.children}</>;
};

import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { localStorageManager } from 'utils/localeStorage';

interface ProtectRouteProp {
  children: ReactNode;
}
export const AuthProvider = (props: ProtectRouteProp) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const token = localStorageManager.get('accessToken');

  useEffect(() => {
    if (!token) {
      return navigate('/signIn');
    }
    setLoading(false);
  }, [token, navigate]);

  if (loading) {
    return <div>"Loading"</div>;
  }

  return <div>{props.children}</div>;
};

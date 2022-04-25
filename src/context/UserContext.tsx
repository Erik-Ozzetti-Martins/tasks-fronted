import React from 'react';
import { LOGIN_USER, LOGOUT_USER, USER_GET } from '../service/api';
import { useNavigate } from 'react-router-dom';
import { DataInput, IData, UserContextData, UserProviderProps } from '../interfaces/interfaces';

export const UserContext = React.createContext<UserContextData>({} as UserContextData);

export const UserStorage = ({ children }:UserProviderProps) => {
  const [data, setData] = React.useState<IData | null>(null);
  const [login, setLogin] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setError('');
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem('token');
      navigate('/');
    },
    [navigate],
  );
  
  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          setError('');
          setLoading(true);
          const { url, options } = USER_GET(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error('Token invalido');
          await getUser(token);
        } catch (error) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  async function getUser(token:string) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  }
  async function userRegister({nome, email ,password }: IData) {
    try {
      setError('');
      setLoading(true);
      const { url, options } = LOGOUT_USER({ nome, email, password });
      const tokenResponse = await fetch(url, options);
      if (!tokenResponse) {
        throw new Error('email ja existe no sistema');
      }
      const { token } = await tokenResponse.json();
      window.localStorage.setItem('token', token);
      await getUser(token);
      navigate('/home');
    } catch (error:any) {
      setError(error.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }
  async function userLogin({email, password}:DataInput) {
    try {
      setError('');
      setLoading(true);
      const { url, options } = LOGIN_USER({ email, password });
      const tokenRes = await fetch(url, options);
      if (!tokenRes.ok) {
        throw new Error('senha Incorreta ou email');
      }

      const { token } = await tokenRes.json();

      window.localStorage.setItem('token', token);

      await getUser(token);

      navigate('/home');
    } catch (error:any ) {
      setError(error.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }
  return (
    <UserContext.Provider
      value={{
        userLogin,
        userLogout,
        userRegister,
        getUser,
        data,
        error,
        loading,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

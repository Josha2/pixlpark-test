import { useState, useEffect } from 'react';
import {getRequestToken, getAccessToken} from '../service/apiService';

const useToken = () => {
  const [isTokenLoading, setIsTokenLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestToken, setRequestToken] = useState('');
  const [accessTokenData, setAccessTokenData] = useState({});

  //получаем RequestToken
  useEffect(() => {
    getRequestToken() 
      .then(responce => setRequestToken(responce.RequestToken));
  }, []);

  //получаем AccessToken
  useEffect(() => {
    const timer = setTimeout(() => {
      getAccessToken(requestToken)
        .then(responce => {
          setAccessTokenData({
            accessToken: responce.AccessToken,
            expires: responce.Expires,
            refreshToken: responce.RefreshToken
          });
          setIsTokenLoading(false);
        })
        .catch(error => {
          setError(error.responce.Error);
          setIsTokenLoading(false);
        });
    }, 1000)
    return () => clearTimeout(timer);
  }, []);

  return [{isTokenLoading, error, accessTokenData}];
};

export default useToken;
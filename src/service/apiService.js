const sha1 = require('js-sha1');

//Адрес прокси для доступа к api (использовался nginx)
const proxyUrl = 'http://localhost:82/';

//Ключи доступа
const publicKey = '38cd79b5f2b2486d86f562e3c43034f8';
const privateKey = '8e49ff607b1f46e1a5e8f6ad5d312a80';

//Функции для получения токенов и вывода товаров
const getRequestToken = async ()  => {
  const responce = await fetch(`${proxyUrl}oauth/requesttoken`);
  if(!responce.ok) {
    throw new Error(`Could not fetch url, received ${responce.status}`);
  }
  return responce.json();
};

const getAccessToken = async (token) => {
  const hash = sha1(token.concat(privateKey));
  const responce = await fetch(`${proxyUrl}oauth/accesstoken?oauth_token=${token}&grant_type=api&username=${publicKey}&password=${hash}`)
  if(!responce.ok) {
    throw new Error(`Could not fetch url, received ${responce.status}`);
  }
  return responce.json();
};

const getOrderItems = async (token) => {
  const responce = await fetch(`${proxyUrl}orders?oauth_token=${token}&take=15`);
  if(!responce.ok) {
    throw new Error(`Could not fetch url, received ${responce.status}`);
  }
  return responce.json();
};

export {
  getRequestToken,
  getAccessToken,
  getOrderItems
};
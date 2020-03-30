import config from "../config";
import decode from 'jwt-decode';


const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, JSON.stringify(token));
  },
  getAuthToken() {
    return JSON.parse(window.localStorage.getItem(config.TOKEN_KEY));
  },
  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY);
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },
  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`);
  },
  decodeAuthToken() {
    console.log(TokenService.getAuthToken())
    return decode(TokenService.getAuthToken());
    
  }
};

export default TokenService;

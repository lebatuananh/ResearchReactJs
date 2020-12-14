import jwtDecode from 'jwt-decode';

class AuthHelper {
  login = async (userInfo) => {
    if (!userInfo.username || !userInfo.password) {
      return { error: 'please fill in the input' };
    }
    // return await SuperFetch.post('login', userInfo).then(response => {
    //   return this.checkExpirity(response.token);
    // });
  };
  checkExpirity = (token) => {
    if (!token) {
      return {
        error: 'not matched',
      };
    }
    try {
      const profile = jwtDecode(token);

      const expiredAt = profile.expiredAt || profile.exp * 1000;

      if (expiredAt > new Date().getTime()) {
        return {
          ...profile,
          token,
          expiredAt: new Date(expiredAt),
        };
      } else {
        return { error: 'Token expired' };
      }
    } catch (e) {
      console.log(e);

      return { error: 'Server Error' };
    }
  };

  setSession = (authResult) => {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(authResult.expires_at * 1000 + new Date().getTime());
    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('refresh_token', authResult.refresh_token);
    localStorage.setItem('id_token', authResult.id_token);
    localStorage.setItem('expires_at', expiresAt);

    const tokenInfo = jwtDecode(authResult.access_token);
    localStorage.setItem('sub', tokenInfo.sub);
  };
  clearSession = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('sub');
  };

  isAuthenticated = () => {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  };
}
export default new AuthHelper();

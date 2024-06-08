import Cookie from 'js-cookie'
const TOKEN_NAME = 'token';

export class TokenService {
  static getToken(): string | undefined {
    return Cookie.get(TOKEN_NAME);
  }

  static setToken(token: string, expiresIn: number = 60 * 60) {
    const expires = new Date(Date.now() + expiresIn * 1000);
    Cookie.set(TOKEN_NAME, token, {
      expires,
      secure: process.env.NODE_ENV === 'production',
    });
  }

  static removeToken() {
    Cookie.remove(TOKEN_NAME);
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

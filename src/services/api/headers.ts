export class ApiHeaders {
  static getAuthHeader() {
    // TODO: Check for other api and based on that add token here. Currently for login we are passing Google's idToken as raw json body
    const token = '';

    return token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};
  }

  static getHeaders() {
    return {
      ...ApiHeaders.getAuthHeader(),
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }
}

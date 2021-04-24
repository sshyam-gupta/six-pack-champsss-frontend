export class ApiHeaders {
  static getAuthHeader() {
    const token = ''; //get token

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

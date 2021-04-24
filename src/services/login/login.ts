import ApiService from '../api';
class LoginService {
  static async loginUser() {
    return await ApiService.post('/login', { username: 's', password: 's' });
  }
  static async du() {
    return await ApiService.get('/posts');
  }
}

export default LoginService;

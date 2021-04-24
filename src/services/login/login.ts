import ApiService from '../api';
class LoginService {
  static async loginUser(id_token: string) {
    return await ApiService.post('/auth/login', { id_token });
  }
}

export default LoginService;

import ApiService from '../api';
import { LOGIN } from '../api/endpoints';
class LoginService {
  static async loginUser(id_token: string) {
    return await ApiService.post(LOGIN, { id_token });
  }
}

export default LoginService;

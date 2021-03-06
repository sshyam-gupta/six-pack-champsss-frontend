import ApiService from '../api';
import { GET_USER, LOGIN } from '../api/endpoints';
class LoginService {
  static async loginUser(id_token: string, name: string, image: string) {
    return await ApiService.post(LOGIN, { id_token, name, image });
  }
  static async getCurrentUser(id: string, headers) {
    return await ApiService.get(`${GET_USER}/${id}`, {}, headers);
  }
}

export default LoginService;

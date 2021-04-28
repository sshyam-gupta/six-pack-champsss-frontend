import ApiService from '../api';
import { ASSIGN_USER_ROLE } from '../api/endpoints';
class UserService {
  static async assignRole(data: any) {
    return await ApiService.put(ASSIGN_USER_ROLE.replace('{{id}}', data.user_id), data);
  }
}

export default UserService;
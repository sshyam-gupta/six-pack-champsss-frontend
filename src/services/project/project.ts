import ApiService from '../api';
import { ADD_USERS, PROJECTS, ADD_ACTIVITY } from '../api/endpoints';
class ProjectService {
  static async addMembers(data: any) {
    return await ApiService.post(ADD_USERS.replace('{{id}}', data.project_id), data);
  }
  static async addProject(name: string) {
    return await ApiService.post(PROJECTS, { name });
  }
  static async addActivity(data: any) {
    return await ApiService.post(ADD_ACTIVITY, data);
  }
}

export default ProjectService;

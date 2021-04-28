import ApiService from '../api';
import { ADD_USERS, PROJECTS } from '../api/endpoints';
class ProjectService {
  static async addMembers(data: any) {
    return await ApiService.post(ADD_USERS.replace('{{id}}', data.project_id), data);
  }
  static async addProject(name: string) {
    return await ApiService.post(PROJECTS, { name });
  }
}

export default ProjectService;

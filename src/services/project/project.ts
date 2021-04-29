import ApiService from '../api';
import { ADD_USERS, ALL_PROJECTS, ADD_ACTIVITY, ACTIVITIES } from '../api/endpoints';
class ProjectService {
  static async addMembers(data: any) {
    return await ApiService.post(ADD_USERS.replace('{{id}}', data.project_id), data);
  }

  static async addProject(name: string) {
    return await ApiService.post(ALL_PROJECTS, { name });
  }
  static async editProject(data: any) {
    return await ApiService.put(`${ALL_PROJECTS}/${data.id}`, data);
  }
  static async addActivity(data: any) {
    return await ApiService.post(ADD_ACTIVITY, data);
  }
  static async updateActivityStatus(url: string, data: any) {
    return await ApiService.put(url, data);
  }
  static async updateRedemptionStatus(url: string, data: any) {
    return await ApiService.put(url, data);
  }
  static async deleteActivity(id: number) {
    return await ApiService.delete(`${ACTIVITIES}/${id}`);
  }
  static async deleteProject(id: number) {
    return await ApiService.delete(`${ALL_PROJECTS}/${id}`);
  }
  static async editActivity(id: number, data: any) {
    return await ApiService.put(`${ACTIVITIES}/${id}`, data);
  }
}

export default ProjectService;

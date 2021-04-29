const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const LOGIN = '/auth/login';
export const GET_USER = `${baseUrl}users`;
export const ADD_ACTIVITY = '/activities';
export const USER_PROJECTS = `${baseUrl}projects`;
export const ALL_PROJECTS = `${baseUrl}admin/projects`;
export const PROJECT_BY_ID = `${baseUrl}projects/{{id}}`;
export const USERS = `${baseUrl}users`;
export const ACTIVITIES = `${baseUrl}activities`;
export const ADMIN_ACTIVITIES = `${baseUrl}admin/activities`;
export const ADD_USERS = `${baseUrl}projects/{{id}}/users`;
export const REDEEM_POINTS = `${baseUrl}redeem_requests`;
export const REDEEM_REQUESTS = `${baseUrl}admin/redeem_requests`;

export const ASSIGN_USER_ROLE = `${baseUrl}users/{{id}}/assign_role`;
export const REMOVE_USERS_FROM_PROJECT = `${baseUrl}projects/{{id}}/users/remove`;

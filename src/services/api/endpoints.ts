const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const LOGIN = '/auth/login';
export const GET_USER = '/users';
export const ADD_ACTIVITY = '/activities';
export const PROJECTS = `${baseUrl}projects`;
export const PROJECT_BY_ID = `${baseUrl}projects/{{id}}`;
export const USERS = `${baseUrl}users`;
export const ACTIVITIES = `${baseUrl}activities`;
export const ADMIN_ACTIVITIES = `${baseUrl}admin/activities`;
export const ADD_USERS = `${baseUrl}projects/{{id}}/users`;
export const REDEEM_POINTS = `${baseUrl}redeem_requests`;
export const REDEEM_REQUESTS = `${baseUrl}admin/redeem_requests`;

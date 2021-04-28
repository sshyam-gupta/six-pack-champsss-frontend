const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const LOGIN = '/auth/login';
export const GET_USER = '/users';
export const PROJECTS = `${baseUrl}projects`;
export const PROJECT_BY_ID = `${baseUrl}projects/{{id}}`;
export const USERS = `${baseUrl}users`;
export const ADD_USERS = `${baseUrl}projects/{{id}}/users`;

import axios from 'axios';
import { getSession, signOut } from 'next-auth/client';

axios.interceptors.request.use(
  async config => {
    const session = await getSession();
    const token = session?.accessToken;

    config.headers = {
      ...config.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    return {
      ...config,
    };
  },
  error => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  res => res,
  err => {
    if (err.response.status === 401) {
      signOut();
      return;
    }
    throw err;
  },
);

const fetcher = url => axios.get(url).then(res => res.data);

export default fetcher;

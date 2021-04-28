import axios from 'axios';

const fetcher = (url, config) => axios.get(url, config).then(res => res.data);

export default fetcher;

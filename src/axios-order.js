import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-credentials.firebaseio.com/'
});

export default instance;

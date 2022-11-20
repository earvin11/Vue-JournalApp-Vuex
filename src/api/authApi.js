
import axios from 'axios';

const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params: {
        key: 'AIzaSyAwVAldg6mVhPn3xAaUlpkSFUiu4UxKfDE'
    }
});


export default authApi;
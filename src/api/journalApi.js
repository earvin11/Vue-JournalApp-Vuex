
import axios from 'axios';

const journalApi = axios.create({
    baseURL: 'https://vue-demos-d887a-default-rtdb.firebaseio.com'
});


export default journalApi;
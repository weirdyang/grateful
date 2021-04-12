import API_URL from './config';
import axios from 'axios';
import { SIGN_OUT } from '@/store/types/actions.types';
import { Router } from 'vue-router'
import { Store } from 'vuex'
import { showToastWithButton } from '@/common';
export const InitAxios = (router: Router, store: Store<any>) => {

    axios.defaults.baseURL = API_URL
    axios.defaults.withCredentials = true;
    axios.interceptors.response.use(undefined, function (err) {
        return new Promise(function (resolve, reject) {
            if (err.response.status && err.response.status === 401) {
                // if you ever get an unauthorized, logout the user
                store.dispatch(SIGN_OUT)
                // you can also redirect to /login if needed !
                showToastWithButton('Please login', 'warning');
                router.push('/login')
            }
            throw err;
        });
    });
    return axios;
}


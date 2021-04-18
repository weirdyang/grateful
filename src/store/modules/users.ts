import axios from 'axios';
import { User, UserLogin } from '../../types/user'
import { Commit } from 'vuex';
import userService from '@/services/user.service';
import { setHeaders } from '@/services/api.service';
interface State {
    user: User | null;
    isAuthenticated: boolean;
}
export default {
    namespaced: true,
    state() {
        return {
            user: {},
            isAuthenticated: userService.getUser() !== null,
        };
    },
    mutations: {
        setUser(state: State, user: User) {
            state.user = user;
            state.isAuthenticated = true;

        },
        purgeUser(state: State) {
            state.user = null;
            state.isAuthenticated = false;
        }
    },
    getters: {
        isAuthenticated(state: State) {
            return state.isAuthenticated
        },
        userName(state: State) {
            return state.user?.username;
        }
    },
    actions: {
        async signIn({ commit }: { commit: Commit }, userLogin: UserLogin) {
            setHeaders();
            const { data } = await axios.post('/auth/login', userLogin);
            userService.setUser(data.user);
            commit('setUser', data.user);

        },
        async logOut({ commit }: { commit: Commit }) {
            await axios.get('/auth/logout');
            console.log('sign out')
            userService.deleteUser();
            commit('purgeUser');
        },
        async checkAuth({ commit, state }: { commit: Commit; state: State }) {
            if (!userService.getUser()) {
                console.log('purging user');
                commit('purgeUser');
            } else {
                const { data } = await axios.get('/users/self');
                console.log('getting user');
                commit('setUser', data.user)
            }
        },
    },
};

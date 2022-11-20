import { computed } from 'vue'
import { useStore } from 'vuex'

const useAuth = () => {

    const store = useStore()

    const createUser = async( user ) => {
        const resp = await store.dispatch('auth/createUser', user)
        return resp
    }

    const loginUser = async( user ) => {
        const resp = await store.dispatch('auth/signInUser', user)
        return resp
    }

    const checkAuthStatus = async() => {
        const resp = await store.dispatch('auth/checkAuthentication')
        return resp
    }

    const logout = () => {
        store.commit('auth/logout')
        // Limpiar entries
        store.commit('journal/clearEntries')
    }


    return {
        checkAuthStatus,
        createUser,
        loginUser,
        logout,

        // guarda una computada con lo que regrese el getter currentState del modulo auth 
        authStatus: computed(() => store.getters['auth/currentState']),
        userName: computed(() => store.getters['auth/userName'])
    }

}

export default useAuth
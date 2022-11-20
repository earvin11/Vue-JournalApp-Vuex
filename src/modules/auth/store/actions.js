import authApi from '@/api/authApi';

// export const myActions = async({ commit }) => {


// }

export const createUser = async({ commit }, user) => {

    const { name, email, password } = user;

    try {

        const { data } = await authApi.post(':signUp', { email, password, returnSecureToken: true })
        const { idToken, refreshToken } = data

        // Luego de registrar el usuario, actualizar el displayName del mismo
         await authApi.post(':update', { displayName: name, idToken, refreshToken })

        // Luego logea al user, elimina el password del objeto user
        delete user.password
        // Haz el commit enviando los datos
        commit('loginUser', { user, idToken, refreshToken })

        return { ok: true }
        
    } catch (error) {
        // console.log(error.response.data.error.message)
        return {
            ok: false,
            msg: error.response.data.error.message
        }
    }

}

export const signInUser = async({ commit }, user) => {

    const { email, password } = user;

    try {

        const { data } = await authApi.post(':signInWithPassword', { email, password, returnSecureToken: true })
        const { displayName, idToken, refreshToken } = data

        //ponle username al user para el state
        user.name = displayName

        // Haz el commit enviando los datos para logear el user
        commit('loginUser', { user, idToken, refreshToken })

        return { ok: true }
        
    } catch (error) {
        // console.log(error.response.data.error.message)
        return {
            ok: false,
            msg: error.response.data.error.message
        }
    }

}

export const checkAuthentication = async({ commit }) => {

    // Captura el token de localStorage
    const idToken = localStorage.getItem('idToken')
    const refreshToken = localStorage.getItem('refreshToken')

    // Si no hay haz un logout
    if(!idToken) {
        commit('logout')
        return { ok: false, msg: 'No hay token' }
    }

    // Consulta a la api por este token
    try {

        const { data } = await authApi.post(':lookup', { idToken })

        // De la respuesta de la api, trae el displayename y el email
        const { displayName, email } = data.users[0]

        // Crea un user para rellenar el state con los datos
        const user = {
            name: displayName,
            email
        }

        // utiliza este commit para mutar el state con estos datos
        commit('loginUser', { user, idToken, refreshToken })

        return { ok: true }
        
    } catch (error) {
        commit('auth/logout')
        return { ok: false, msg: error.response.data.error.message }
    }

}
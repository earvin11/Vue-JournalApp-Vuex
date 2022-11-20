<template>
  <h1 v-if="authStatus === 'authenticating'">{{ authStatus }}</h1>
  <router-view v-else/>
</template>

<script>
import useAuth from './modules/auth/composables/useAuth'

export default {

  setup() {

    
    const { authStatus, checkAuthStatus } = useAuth()
    
    console.log(authStatus)
    // Al crear el componente ejecuta la funcion checkAuthStatus para validar el token si lo hay y renderizar las rutas de la app
    checkAuthStatus()

    return {
      authStatus
    }

  }
}

</script>
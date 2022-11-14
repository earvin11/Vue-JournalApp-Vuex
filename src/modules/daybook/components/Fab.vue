<template>
  <!-- cuando se haga click sobre este boton emite un evento personalizado de nombre on:click al elemento padre de este component -->
  <button
    @click="$emit('on:click')"
    :class="`btn btn-${ color }`">
    <i :class="`fa fa-2x ${ icon }`"></i>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'fa-plus'
    },
    color: {
      type: String,
      default: 'primary'
    }
  }
}
</script>

<style lang="scss" scoped>
button {
    border-radius: 100%;
    bottom: 20px;
    height: 80px;
    position: fixed;
    right: 20px;
    width: 80px;
}
</style>
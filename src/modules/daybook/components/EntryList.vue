
<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
        <input 
            type="text"
            class="form-control"
            placeholder="Buscar entrada"
            v-model="term">
    </div>

    <div class="mt-2 d-flex flex-column">
        <button class="btn btn-primary mx-3"
        @click="$router.push({ name: 'entry', params: { id: 'new' } })">
            Nueva entrada
            <i class="fa fa-plus-circle"></i>
        </button>
    </div>

    <div class="entry-scrollarea">
        <Entry
            v-for="entry in entriesByTerm"
            :key="entry.id"
            :entry="entry"
        />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'

export default {
    components: {
        Entry: defineAsyncComponent(() => import('./Entry.vue'))
    },
    data() {
        return {
            term: ''
        }
    },
    computed: {
        // Mapeo los getters del store, el primer argumento es el modulo del state en este caso joruanl
        // en el segundo extraigo los getters que quiero de ese modulo
        // le doy el nombre con el que quiero crear esta propiedad computada en ese component
        // lo igualo al getter del modulo
        ...mapGetters( 'journal', {
            getEntriesByTerm: 'getEntriesByTerm'
        }),
        // Otra propiedad computada que recibe el termino para filtrar las entries a mostrar
        entriesByTerm() {
            return this.getEntriesByTerm( this.term )
        }
    }
}
</script>

<style lang="scss" scoped>
.entry-list-container{
    border-right: 1px solid #2c3e50;
    height: calc( 100vh - 56px );
}
.entry-scrollarea{
    height: calc( 100vh - 100px );
    overflow: scroll;
}
</style>
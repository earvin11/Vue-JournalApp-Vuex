<template>
    <template v-if="entry">

        <div  class="entry-title d-flex justify-content-between p-2">
          
          <div>
              <span class="text-success fs-3 fw-bold">{{ day }}</span>
              <span class="mx-1 fs-3">{{ month }}</span>
              <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
          </div>

          <!-- ref para crear una referencia de esta etiqueta, v-show false para hacerlo invisible, accept para indicar que archivos acepta -->
          <input
            @change="onSelectedImage"
            ref="imageSelector" 
            type="file"
            v-show="false"
            accept="image/png, image/jpeg">
      
          <div>
            <!-- Muestra el boton si la entrada tiene id, sino tiene estas creando una nueva -->
              <button 
                v-if="entry.id"
                @click="onDeleteEntry"
                class="btn btn-danger mx-2">
                  Borrar
                  <i class="fa fa-trash-alt"></i>
              </button>
              
              <!-- En realidad este le hace referencia al input file mediante el metodo onSelectImage -->
              <button
                @click="onSelectImage"
                class="btn btn-primary">
                  Subir foto
                  <i class="fa fa-upload"></i>
              </button>
          </div>
      
        </div>
      
        <hr>
        <div class="d-flex flex-column px-3 h-75">
          <textarea
              placeholder="Que sucedio hoy?"
              v-model="entry.text"
          ></textarea>
      
          <img
            v-if="entry.picture && !localImage"
            :src="entry.picture" 
            alt="entry-picture"
            class="img-thumbnail">

            <img 
                v-if="localImage"
                :src="localImage" 
                alt="entry-picture"
                class="img-thumbnail">

        </div>

    </template>

  <Fab
    icon="fa-save"
    color="success"
    @on:click="saveEntry"
   />


</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import Swal from 'sweetalert2'

import getDayMonthYear from '../helpers/getDayMonthYear'
import uploadImage from '../helpers/uploadImage'

export default {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    components: {
        Fab: defineAsyncComponent( () => import('../components/Fab.vue') )
    },
    data() {
        return {
            entry: null,
            localImage: null,
            file: null
        }
    },
    computed: {
        ...mapGetters('journal',{
            getEntryById: 'getEntryById'
        }),
        day() {
            // Envia la fecha que viene en la entry en formato string 
            //Extrae el dia de lo que retorne este helper
            const { day } = getDayMonthYear( this.entry.date )

            return day
        },
        month() {
            const { month } = getDayMonthYear( this.entry.date )
            return month
        },
        yearDay() {
            const { yearDay } = getDayMonthYear( this.entry.date )
            return yearDay
        }
    },
    methods: {
        ...mapActions('journal', {
            updateEntry: 'updateEntry',
            createEntry: 'createEntry',
            deleteEntry: 'deleteEntry'
        }),
        loadEntry() {

            let entry;

            if( this.id === 'new' ) {
                entry = {
                    text: '',
                    date: new Date().getTime()
                }
            }else {
                entry = this.getEntryById( this.id )
                if(!entry) return this.$router.push({ name: 'no-entry' }) // Si no hay entry con ese id redirecciona
            }

            this.entry = entry
        },
        async saveEntry() {

            new Swal({
                title: 'Espere por favor...',
                allowOutsideClick: false
            })

            Swal.showLoading()

            // Para guardar la imagen usando el helper
            const picture = await uploadImage( this.file )

            // Establecele a la entry el valor regresado por el helper de guardar imagen
            this.entry.picture = picture

            // Si la entrada tiene id
            if( this.entry.id ) {
                // Quiere actualizar dicha entry
                await this.updateEntry( this.entry )   
            }else {
                // Sino quiere crear una nueva entry
                // Esta funcion retorna el id de la entry creada
                const idNewEntry = await this.createEntry( this.entry )
                // Redirige a la entry creada usando su id
                this.$router.push({ name: 'entry', params: { id: idNewEntry } })           
            }
            
            // Limpia el file luego de guardar
            this.file = null

            Swal.fire('Guardado', 'Entrada guardada con exito', 'success')
        },
        async onDeleteEntry() {

            const result = await Swal.fire({
                title: 'Esta seguro?',
                text: 'Una vez borrado no se puede recuperar',
                showDenyButton: true,
                confirmButtonText: 'Si, estoy seguro'
            })

            if( result.isConfirmed ) {
                new Swal({
                    title: 'Espere por favor',
                    allowOutsideClick: false
                })
                Swal.showLoading()
                await this.deleteEntry( this.entry.id )
                this.$router.push({ name: 'no-entry' })
                Swal.fire('Eliminado', '', 'success')
            }

        },
        onSelectedImage(e) {
            const file = e.target.files[0]
            if(!file) {
                this.localImage = null
                this.file = null
                return
            }

            this.file = file

            const fr = new FileReader()
            fr.onload = () => this.localImage = fr.result
            fr.readAsDataURL( file )
        },
        onSelectImage() {
            // Busca el elemento que tenga esta referencia y haz click en el con este metodo
            this.$refs.imageSelector.click()
        }
    },
    created() {
        this.loadEntry()
        // console.log(this.id)
    },
    //Observadores
    watch: {
        // Cuando el id cambie, dispara nuevmante loadEntry
        id() {
            this.loadEntry()
        }
    }
}
</script>

<style lang="scss" scoped>

textarea {
    font-size: 20px;
    border: none;
    height: 100%;

    &:focus {
        outline: none
    }
}

img {
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}

</style>
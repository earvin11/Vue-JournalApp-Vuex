import journalApi from "@/api/journalApi"

// export const myActions = async({ commit }) => {


// }

export const loadEntries = async({ commit }) => {

    const { data } = await journalApi.get('/entries.json')

    if(!data) {
        commit('setEntries', [])
        return
    }

    const entries = []

    // Barre los keys de la data que vino en la peticion
    for( let id of Object.keys( data ) ) {
        // Agrega al arreglo objetos que tendran id y todo lo demas que tenga ese id con su clave valor
        entries.push({
            id,
            ...data[id]
        })
    }

    // Cuando ya tengas todo haz el commit de la mutation al setEntries y enviale las entradas
    commit( 'setEntries', entries )

}

export const updateEntry = async({ commit }, entry) => {

    // Extrae el id y lo demas de la data aparte, usa el id para la URL de la peticion PUT y la informacion para enviarle al update
    const { id, ...rest } = entry
    const { data } = await journalApi.put(`/entries/${ id }.json`, rest )

    // Operador spreed para evitar que la entry pase por referencia a la real en el state
    commit( 'updateEntry', {...entry} )

}

export const createEntry = async({ commit }, entry) => {
    // Extrae texto y fecha y guardalo en un object para enviarlo en la peticion
    const { text, date, picture } = entry
    const dataToSave = { text, date, picture }
    // Haz la peticion
    const { data } = await journalApi.post('/entries.json', dataToSave)
    // la respuesta de la peticion trae el id en el campo name, ponle este id a la entry
    dataToSave.id = data.name
    // Envia la data usada en la peticion para la mutation
    commit('addEntry', dataToSave)

    return data.name

}

export const deleteEntry = async({ commit }, id) => {

    const { data } = await journalApi.delete(`/entries/${ id }.json`)
    commit('deleteEntry', id)

    return id

}

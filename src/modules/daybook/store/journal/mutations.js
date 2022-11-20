
// export const myMutation = ( state ) => {

// }

export const setEntries = ( state, entries ) => {

    // Esparce todo lo que habia en las entries del state y agrega las nuevas entries que vienen en los argumentos
    state.entries = [ ...state.entries, ...entries ]
    state.isLoading = false

}

export const updateEntry = ( state, entry ) => {

    // Crea un nuevo arr mapeando las entries del state y solo guardando los ids, 
    // de ese arreglo solo devuelve el index del que coincida con el id del entry que recibo como parametro
    const idx = state.entries.map( e => e.id ).indexOf( entry.id )
    // en las entries del state en la posicion idx de lo que obtuvimos arriba iguala a la entry que recibimos
    state.entries[idx] = entry





}

export const addEntry = ( state, entry ) => {
    // Agrega la entry recibida al principio del array
    state.entries = [ entry, ...state.entries ]
}

export const deleteEntry = ( state, id ) => {
    // retorna un nuevo array donde solo vengan los que tienen el id distinto del que acabas de recibir por parametro
    state.entries = state.entries.filter( entry => entry.id !== id )

}

export const clearEntries = ( state, id ) => {
    state.entries = []
}
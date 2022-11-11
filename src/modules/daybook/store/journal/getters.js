
// export const myGetter = ( state ) => {
//     return state.prop
// }

// Este getter retorna una funcion que recibe como paramaetro el term
export const getEntriesByTerm = ( state ) => ( term = '' ) => {
    // Si el term esta vacio muestra todas las entries
    if(!term.length) return state.entries
    // filtra las entries y regresa la que tenga coincidencia en su texto con el term
    // convierte a lowerCase para poder comparar
    return state.entries.filter( entry => entry.text.toLowerCase().includes( term.toLowerCase() ) )
    
}

export const getEntryById = ( state ) => ( id ='' ) => {
   const entry = state.entries.find( entry => entry.id === id );

   if(!entry) return;

   return { ... entry };
}

// export const myGetter = ( state ) => {
//     return state.prop
// }

import state from "./state"

export const currentState = ( state ) => {
        return state.status
}

export const userName = ( state ) => {
        return state.user?.name || ''
}
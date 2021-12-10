//action
import {DRAWER_OPEN, DRAWER_ClOSE} from './types'

//left menu open
export const open = () =>{
    return{
        type: DRAWER_OPEN,
        
    }
}

//left menu close
export const close = () =>{
    return{
        type: DRAWER_ClOSE,
        
    }
}


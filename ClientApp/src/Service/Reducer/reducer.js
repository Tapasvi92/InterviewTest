import {EMPLOYEE} from '../constants';

export const employee = (state = [], action) =>{
    switch(action.type){
        case EMPLOYEE:
           
            return [ 
                ...state,
                action.data
            ]
        default:
            return state;
    }
}
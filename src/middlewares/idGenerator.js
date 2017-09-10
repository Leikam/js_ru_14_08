import { } from '../constants'
import {ADD_COMMENT} from '../constants';

//export default store => next => action => { /*...*/ next(action) };
export default store => {
    //console.log('–––> middleware step 1', store);
    return next => {
        //console.log('–––> middleware step 2', next);
        return action => {
            //console.log('–––> middleware step 3', action);

            if (action.type === ADD_COMMENT) {
                let id = "––" + Math.random().toString(16).split('.')[1];
                console.log('–––> ', 'id generator', id);
                action.payload.cID = id;
            }

            next(action);
        }
    }
}
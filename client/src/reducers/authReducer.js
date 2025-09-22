// eslint-disable-next-line import/no-anonymous-default-export
import { FETCH_USER } from '../actions/types';

export default function rootReducer(state = null, action) {
   console.log(action);
   switch (action.type) {
      case FETCH_USER:
         return action.payload || false;
      default:
         return state;
   }
}

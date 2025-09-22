// eslint-disable-next-line import/no-anonymous-default-export
export default function rootReducer(state = null, action) {
   console.log(action);
   switch (action.type) {
      default:
         return state;
   }
}

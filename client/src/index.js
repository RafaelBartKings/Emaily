import 'materialize-css/dist/css/materialize.min.css';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import reduxThunk from 'redux-thunk';

// Development  only: axios setup
import axios from 'axios';
window.axios = axios;

const store = configureStore({
   reducer: rootReducer,
   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(reduxThunk)
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
   <Provider store={store}>
      <App />
   </Provider>
);

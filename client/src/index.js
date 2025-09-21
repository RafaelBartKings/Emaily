import materializeCSS from 'materialize-css/dist/css/materialize.min.css';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
   reducer: rootReducer
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
   <Provider store={store}>
      <App />
   </Provider>
);

import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

// O Axios defaults withCredentials é configurado globalmente para enviar cookies/sessão.
axios.defaults.withCredentials = true;

export const fetchUser = () => async dispatch => {
   const res = await axios.get('/api/current_user');
   dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
   const res = await axios.post('/api/stripe', token);
   dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
   try {
      const res = await axios.post('/api/surveys', values);

      // Se o servidor retornar 200 OK (sucesso)
      history.push('/surveys');
      dispatch({ type: FETCH_USER, payload: res.data });
   } catch (error) {
      // --- Lógica de Tratamento do Erro 403 ---
      if (error.response && error.response.status === 403) {
         // Exibe a mensagem de erro do backend ("Not enough credits!")
         const errorMessage =
            error.response.data.error ||
            'Erro: Permissão negada por falta de saldo.';
         alert(errorMessage);

         // Redireciona o usuário para a página onde ele pode adicionar créditos
         // Assumimos que a rota para adicionar créditos é '/billing' ou '/' (home)
         history.push('/billing');
      } else if (error.response && error.response.status === 401) {
         // Trata o caso de sessão realmente expirada (401)
         alert('Sua sessão expirou. Por favor, faça login novamente.');
      } else {
         // Trata outros erros de rede ou servidor (500, etc.)
         alert('Ocorreu um erro desconhecido ao enviar a pesquisa.');
         console.error('Erro de envio desconhecido:', error);
      }
   }
};

export const fetchSurveys = () => async dispatch => {
   const res = await axios.get('/api/surveys');
   dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

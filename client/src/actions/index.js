import axios from 'axios';
import { FETCH_USER, SUBMIT_SURVEY_SUCCESS } from './types';

// Configuração global: envia cookies/sessão em todas as requisições
axios.defaults.withCredentials = true;

// 1. Ação para buscar o usuário logado
export const fetchUser = () => async dispatch => {
   // Não precisa de withCredentials aqui, pois já está no defaults
   try {
      const res = await axios.get('/api/current_user');
      dispatch({ type: FETCH_USER, payload: res.data });
   } catch (error) {
      // Trate erros de 401 aqui, talvez despachando um payload 'null'
      console.error('Falha ao buscar usuário:', error);
   }
};

// 2. Ação para lidar com a cobrança via Stripe
export const handleToken = token => async dispatch => {
   try {
      const res = await axios.post('/api/stripe', token);
      // Assumindo que a resposta retorna o objeto de usuário atualizado com novos créditos
      dispatch({ type: FETCH_USER, payload: res.data });
   } catch (error) {
      console.error('Falha na cobrança Stripe:', error);
   }
};

// 3. Ação para submeter a pesquisa
export const submitSurvey = (values, history) => async dispatch => {
   try {
      // O withCredentials já está no defaults, não precisa repetir aqui
      const res = await axios.post('/api/surveys', values);

      // 1. Redireciona o usuário para a lista de pesquisas
      history.push('/surveys');

      // 2. Atualiza o objeto de usuário no Redux
      // O 'res.data' deve conter o objeto de usuário ATUALIZADO (com créditos debitados)
      dispatch({ type: FETCH_USER, payload: res.data });

      // Opcionalmente, você pode disparar uma ação específica de sucesso:
      // dispatch({ type: SUBMIT_SURVEY_SUCCESS });
   } catch (error) {
      // ESSENCIAL: Tratar o erro 401/403/402 aqui para dar feedback ao usuário
      console.error(
         'Erro de envio (Provavelmente 401 Unauthorized):',
         error.response
      );

      if (error.response && error.response.status === 401) {
         alert('Sua sessão expirou. Por favor, faça login novamente.');
      } else if (error.response && error.response.status === 402) {
         alert('Créditos insuficientes. Por favor, adicione créditos.');
      } else {
         alert('Ocorreu um erro ao enviar a pesquisa.');
      }
   }
};

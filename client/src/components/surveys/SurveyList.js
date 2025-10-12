import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
   componentDidMount() {
      this.props.fetchSurveys();
   }

   renderSurveys() {
      // 1. Verificação de Loading
      if (!this.props.surveys || this.props.surveys.length === 0) {
         return (
            <div className="text-center p-4 text-gray-500">
               <p>Nenhuma pesquisa encontrada. Crie a sua primeira!</p>
            </div>
         );
      }

      // --- CORREÇÃO DE IMUTABILIDADE AQUI ---
      // Usamos .slice() para criar uma cópia superficial do array
      // ANTES de chamar .reverse(). O método reverse() agora modifica APENAS a cópia.
      return this.props.surveys
         .slice()
         .reverse()
         .map(survey => {
            return (
               <div className="card darken-1" key={survey._id}>
                  <div className="card-content">
                     <span className="card-title">{survey.title}</span>
                     <p>{survey.body}</p>
                     <p className="right">
                        Enviada em:{' '}
                        {new Date(survey.dateSent).toLocaleDateString()}
                     </p>
                  </div>
                  <div className="card-action">
                     <a>Sim: {survey.yes}</a>
                     <a>Não: {survey.no}</a>
                  </div>
               </div>
            );
         });
   }

   render() {
      return (
         <div>
            <h4 className="text-2xl font-bold mb-4">Minhas Pesquisas</h4>
            {this.renderSurveys()}
         </div>
      );
   }
}

function mapStateToProps({ surveys }) {
   return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);

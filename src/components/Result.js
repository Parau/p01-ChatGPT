import React from 'react';
import {consoleLogEscopo} from '../lib/debug';

function mapAnswersToIds(userAnswers, questions) {

  return userAnswers.map((answer) => {
    for (const question of questions) {
      const optionIndex = question.options.indexOf(answer); // Busca o índice da resposta no array de opções

      if (optionIndex !== -1) {
        return { questionId: question.id, optionId: question.ids[optionIndex] }; // Retorna o ID da pergunta e o ID da opção
      }
    }
    return { questionId: null, optionId: null }; // Retorna null se a resposta não for encontrada
  });
}

function Result({ questions, userAnswers, onRestart }) {
  consoleLogEscopo('RESULT', 'userAnswers:', userAnswers);
  consoleLogEscopo('RESULT', 'questions:', questions);
  
  
  
    //APAGAR DEPOIS
    // Mapeia as respostas do usuário para os IDs correspondentes
    const answerMappings = mapAnswersToIds(userAnswers, questions);

    const score = userAnswers.filter((answer, index) => {
    const question = questions[index];

    return Array.isArray(question.correctAnswer)
      ? question.correctAnswer.every((a) => answer.includes(a))
      : answer === question.correctAnswer;
    }).length;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Quiz Results</h2>
      <p className="text-lg mb-4 text-gray-700 text-center">
        You scored {score} out of {questions.length}
      </p>

      <h3 className="text-lg mb-4 text-gray-700">Respostas Selecionadas:</h3>
      <ul className="text-gray-700 mb-4">
        {answerMappings.map(({ questionId, optionId }, index) => (
          <li key={index}>
            Pergunta {questionId || 'N/A'} - ID da Opção: {optionId || 'N/A'}
          </li>
        ))}
      </ul>


      <button
        onClick={onRestart}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Restart Quiz
      </button>
    </div>
  );
}

export default Result;

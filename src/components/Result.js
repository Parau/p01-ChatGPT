import React from 'react';
import {consoleLogEscopo} from '../lib/debug';

import processandoVideo from '../animacao/media/videos/teste/400p15/Processando.mp4'; // Importe o vídeo

let skillResult = 0; // Resultado das maior habilidade mapeada
const skillLevel = [
  'Curioso',
  'Iniciação',
  'Explorador',
  'Construtor',
  'Criador',
  'Estrategista',
  'Mestre'
];

function mapAnswersToIds(userAnswers, questions) {
  return userAnswers.reduce((acc, answerIds) => {
    for (const question of questions) {
      const options = question.options.filter(opt => answerIds.includes(opt.id)); // Busca as opções pelos IDs

      if (options.length > 0) {
        options.forEach(option => {
          acc.push({
            questionId: question.id,
            optionId: option.id,
            question: option.text,
            skill: option.skill
          });
        });
        return acc; // Retorna o acumulador se encontrar opções correspondentes
      }
    }
    return acc; // Retorna o acumulador sem adicionar nada se não encontrar opções correspondentes
  }, []);
}

function Result({ questions, userAnswers, onRestart }) {
  consoleLogEscopo('RESULT', 'userAnswers:', userAnswers);
  consoleLogEscopo('RESULT', 'questions:', questions);
  
  const answerMappings = mapAnswersToIds(userAnswers, questions);
  consoleLogEscopo('RESULT', 'answerMappings:', answerMappings);

  answerMappings.forEach(({ skill }, index) => {
    if (skill > skillResult)  //guarda a maior habilidade mapeada
      skillResult = skill;
  });
  
  consoleLogEscopo('RESULT','Skill:', skillResult);
  
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Resultado
        </h2>
        <p className="text-lg mb-4 text-gray-700 text-center">
          {skillLevel[skillResult]}
        </p>
        <video width="100%" autoPlay loop muted>
          <source src={processandoVideo} type="video/mp4" />
          Seu navegador não suporta o elemento de vídeo.
        </video>

        <h3 className="text-lg mb-4 text-gray-700">Respostas Selecionadas:</h3>
        <ul className="text-gray-700 mb-4">
          {answerMappings.map(
            ({ questionId, optionId, question, skill }, index) => (
              <li key={index}>
                Alternativa escolhida ID = {optionId || "N/A"} - texto:{" "}
                {question || "N/A"} - Skill: {skill || "N/A"}
              </li>
            )
          )}
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

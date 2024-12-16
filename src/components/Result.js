import React, { useState } from 'react';
import {consoleLogEscopo} from '../lib/debug';

import processandoVideo from '../animacao/media/videos/teste/400p15/Processando.mp4'; // Importe o vídeo

let skillResult = 0; // Resultado das maior habilidade mapeada
const skillLevel = [
  { name: 'Curioso', max: 0, acumulado: 0 },
  { name: 'Iniciante', max: 1, acumulado: 1 },
  { name: 'Explorador', max: 3, acumulado: 4 },
  { name: 'Construtor', max: 2, acumulado: 6 },
  { name: 'Criador', max: 2, acumulado: 8 },
  { name: 'Estrategista', max: 3, acumulado: 11 },
  { name: 'Mestre', max: 1, acumulado: 12 }
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

  //// Calcular o saldo de habilidades
  // Inicializar o array skillCounts com zeros
  const skillCounts = new Array(skillLevel.length).fill(0);
  
  answerMappings.forEach(({ skill }) => {
    let skillAbs = Math.abs(skill);
    skillCounts[skillAbs] += skill > 0 ? 1 : -1;
  });
  consoleLogEscopo('RESULT','skillCounts:', skillCounts);
  consoleLogEscopo('RESULT','skillLevel:', skillLevel);
  
  const skillAtingido = skillCounts.reduce((acc, val) => acc + val, 0);
  consoleLogEscopo('RESULT','skillAtingido:', skillAtingido);

  let i = 0;
  skillResult = 0
  while (i < skillLevel.length && skillAtingido >= skillLevel[i].acumulado) {
    skillResult = i;
    i++;
  }
  
  // Estado para controlar a visibilidade do elemento
  const [showElement, setShowElement] = useState(false);

    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
        {!showElement && (
          <>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
              Processando...
            </h2>
          <video
            width="100%"
            autoPlay
            muted
            onEnded={() => { setShowElement(true)}}
          >
            <source src={processandoVideo} type="video/mp4" />
            Seu navegador não suporta o elemento de vídeo.
          </video>
          </>
        )}

        {showElement && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
              Resultado
            </h2>
            <p className="text-lg mb-4 text-gray-700 text-center">
              {skillLevel[skillResult].name}
            </p>

            <h3 className="text-lg mb-4 text-gray-700">
              Respostas Selecionadas:
            </h3>
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
          </>
        )}
      </div>
    );
}

export default Result;

import React, { useState } from 'react';
import Question from './Question';
import Result from './Result';

const questions = [
  {
    group: 1,
    type: 'multiple',
    question: 'Você utiliza o ChatGPT para realizar buscas na internet?',
    options: [
      { id: 1, text: 'O ChatGPT não tem este recurso.', skill: -1 },
      { id: 2, text: 'Não, prefiro usar a pesquisa do Google ou Microsoft Bing.', skill: 2 },
      //{ id: 3, text: 'Não, prefiro usar a pesquisa do Microsoft Bing.', skill: 2 },
      { id: 4, text: 'Sim, simplesmente escrevo o que quero pesquisar.', skill: -1 },
      { id: 5, text: 'Sim, uso o ChatGPT para perguntas gerais, mas sei que ele não tem acesso a informações atualizadas.', skill: 2 },
      { id: 6, text: 'Sim, ativo o modo de busca do ChatGPT antes de enviar a minha pergunta.', skill: 1 },
      { id: 7, text: 'Sim, faço a pergunta no ChatGPT e depois procuro complementar no Google, se necessário.', skill: 5 },
      { id: 8, text: 'Acho que o ChatGPT faz buscas na internet automaticamente.', skill: -1 }
    ],
    correctAnswer: 'NOT'
  },
  {
    group: 2,
    type: 'multiple',
    question: 'Você utiliza o ChatGPT para resumir conteúdos, como artigos e documentos?',
    options: [
      { id: 9, text: 'Sim, ele consegue criar resumos claros e objetivos.', skill: 3 },
      { id: 10, text: 'Sim, mas reviso os resumos antes de usar para garantir a precisão.', skill: 5 },
      { id: 11, text: 'Tento usar, mas os resumos geralmente ficam genéricos ou incompletos.', skill: -3 },
      { id: 12, text: 'Não sei como pedir um resumo eficaz ao ChatGPT.', skill: -3 },
      { id: 13, text: 'Prefiro resumir os textos manualmente.', skill: -3 },
      { id: 14, text: 'Acho que o ChatGPT não é bom para resumir textos mais complexos ou longos.', skill: -4 },
      { id: 15, text: 'Nunca tentei usar o ChatGPT para essa finalidade.', skill: -3 },
      { id: 16, text: 'Sim, gosto de copiar e colar trechos específicos para que ele resuma apenas partes importantes.', skill: 3 }
    ],
    correctAnswer: 'NOT'
  },
  { 
    group: 3,
    type: 'multiple',
    question: 'Como você usa o ChatGPT para criar textos?',
    options: [
      { id: 17, text: 'Sim, solicito rascunhos ou estruturas iniciais.', skill: 4 },
      { id: 18, text: 'Sim, forneço tópicos ou exemplos específicos para que o ChatGPT utilize como base ao criar o texto.', skill: 6 },
      { id: 19, text: 'Sim, oriento o ChatGPT a ajustar o tom, como formal ou informal, conforme necessário.', skill: 4 },
      { id: 20, text: 'Sim, mas reviso sempre o conteúdo antes de utilizá-lo.', skill: 5 },
      { id: 21, text: 'Não, acho que ele não atende bem a tarefas criativas ou avançadas.', skill: -4 },
      { id: 22, text: 'Nunca tentei usar o ChatGPT para criar textos.', skill: -4 }
    ],
    correctAnswer: 'NOT'
  }
];


function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer) => {
    setUserAnswers([...userAnswers, answer]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion>0)
      setCurrentQuestion(currentQuestion - 1);
  }

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setShowResult(false);
  };

  if (showResult) {
    return <Result questions={questions} userAnswers={userAnswers} onRestart={restartQuiz} />;
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Question
        question={questions[currentQuestion]}
        onAnswer={handleAnswer}
        onBack={handleBack}
        currentQuestion={currentQuestion + 1}
        totalQuestions={questions.length}
      />
    </div>
  );
}

export default Quiz;

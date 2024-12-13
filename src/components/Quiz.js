import React, { useState } from 'react';
import Question from './Question';
import Result from './Result';

const questions = [
  {
    id: 1,
    type: 'multiple',
    question: 'Você utiliza o ChatGPT para realizar buscas na internet?',
    options: [
      'O ChatGPT não tem este recurso.',
      'Não, prefiro usar a pesquisa do Google.',
      'Não, prefiro usar a pesquisa do Microsoft Bing.',
      'Sim, simplesmente escrevo o que quero pesquisar.',
      'Sim, uso o ChatGPT para perguntas gerais, mas sei que ele não tem acesso a informações atualizadas.',
      'Sim, ativo o modo de busca do ChatGPT antes de enviar a minha pergunta.',
      'Sim, faço a pergunta no ChatGPT e depois procuro complementar no Google, se necessário.',
      'Acho que o ChatGPT faz buscas na internet automaticamente.'
    ],
    ids: 
    [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8
    ],
    correctAnswer: 'NOT'
  },
  {
    id: 2,
    type: 'multiple',
    question: 'Como você utiliza o ChatGPT para resumir artigos ou documentos?',
    options: [
      'Sim, ele consegue criar resumos claros e objetivos.',
      'Sim, mas reviso os resumos antes de usar para garantir a precisão.',
      'Tento usar, mas os resumos geralmente ficam genéricos ou incompletos.',
      'Não sei como pedir um resumo eficaz ao ChatGPT.',
      'Prefiro resumir os textos manualmente.',
      'Acho que o ChatGPT não é bom para resumir textos mais complexos ou longos.',
      'Nunca tentei usar o ChatGPT para essa finalidade.',
      'Gosto de copiar e colar trechos específicos para que ele resuma apenas partes importantes.'
    ],
    ids: 
    [
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16
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

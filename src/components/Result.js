import React from 'react';

function Result({ questions, userAnswers, onRestart }) {
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

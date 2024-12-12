import React, { useState } from 'react';

function Question({ question, onAnswer, currentQuestion, totalQuestions }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [textAnswer, setTextAnswer] = useState('');

  const handleOptionChange = (option) => {
    if (question.type === 'single') {
      setSelectedOptions([option]);
    } else {
      setSelectedOptions((prev) =>
        prev.includes(option)
          ? prev.filter((item) => item !== option)
          : [...prev, option]
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.type === 'text') {
      onAnswer(textAnswer);
    } else {
      onAnswer(selectedOptions);
    }
    setSelectedOptions([]);
    setTextAnswer('');
  };

  return (
    <div className="space-y-3 bg-white rounded-lg shadow-lg p-6 animate-fade-in max-w-md mx-auto">
      <h3 className="text-1xl mb-2 text-gray-800 text-right">
        Pergunta {currentQuestion} de {totalQuestions}
      </h3>
      <p className="text-2xl font-bold mb-4 text-gray-700 text-left">{question.question}</p>
      <form onSubmit={handleSubmit}>
        {question.type === 'text' ? (
          <input
            type="text"
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
        ) : (
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <label key={index} className="flex items-start space-x-2">
                <input
                  type={question.type === 'single' ? 'radio' : 'checkbox'}
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleOptionChange(option)}
                  className="h-6 w-6 text-blue-600 border-gray-300 rounded flex-shrink-0"
                  required={question.type === 'single'}
                />
                <span className="text-gray-700 text-left">{option}</span>
              </label>
            ))}
          </div>
        )}
        <button
          type="submit"
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Next
        </button>
      </form>
    </div>
  );
}

export default Question;
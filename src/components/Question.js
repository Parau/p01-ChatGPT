import React, { useState } from 'react';

function Question({ question, onAnswer, onBack, currentQuestion, totalQuestions }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [textAnswer, setTextAnswer] = useState('');

  const handleOptionChange = (option, e) => {
    const optionId = e.target.dataset.info; // Obtém o id da opção a partir de data-info

    if (question.type === 'single') {
      setSelectedOptions([optionId]);
    } else {

      if (e.target.checked) {
        //alert(e.target.dataset.info);
      }

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

  const handleBack = () => {
    // Lógica para o botão Voltar
    onBack();
    // Insira aqui a lógica para retornar à pergunta anterior ou outra ação
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
                  data-info={question.ids[index]} 
                  checked={selectedOptions.includes(option)}
                  onChange={(e) => handleOptionChange(option, e)}
                  className="h-6 w-6 text-blue-600 border-gray-300 rounded flex-shrink-0"
                  required={question.type === 'single'}
                />
                <span className="text-gray-700 text-left">{option}</span>
              </label>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between mt-4">
          {/* Botão Voltar */}
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-black font-medium py-1 px-3 rounded transition duration-300"
            onClick={handleBack}
          >
            &laquo;
          </button>

          {/* Botão Próximo */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-9 rounded transition duration-300"
          >
            Próximo
          </button>
        </div>

      </form>
    </div>
  );
}

export default Question;
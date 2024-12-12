// Updated App.js
import React from 'react';
import Quiz from './components/Quiz';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
      <Quiz />
    </div>
  );
}

export default App;


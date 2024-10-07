import React from 'react';
import PaymentWorkflow from './PaymentWorkflow';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Interactive Payment Provider Workflow</h1>
      </header>
      <main className="App-main">
        <div className="App-container fade-in">
          <PaymentWorkflow />
        </div>
      </main>
    </div>
  );
};

export default App;

import React from 'react';

interface ControlButtonsProps {
  onSolve: () => void;
  onReset: () => void;
  onScramble: () => void;
  onSetSolved: () => void;
  isLoading: boolean;
  loadingMessage: string;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  onSolve,
  onReset,
  onScramble,
  onSetSolved,
  isLoading,
  loadingMessage
}) => {
  return (
    <div className="control-buttons">
      <h3>🎮 Controls</h3>
      <button
        id="solve-btn"
        className={`btn primary ${isLoading ? 'loading' : ''}`}
        onClick={onSolve}
        disabled={isLoading}
      >
        {isLoading ? `⏳ ${loadingMessage}` : '🚀 Start Solving'}
      </button>
      <button className="btn secondary" onClick={onReset}>
        🔄 Reset Cube
      </button>
      <button className="btn secondary" onClick={onScramble}>
        🎲 Scramble
      </button>
      <button className="btn secondary" onClick={onSetSolved}>
        ✅ Set Solved
      </button>
    </div>
  );
};

export default ControlButtons;

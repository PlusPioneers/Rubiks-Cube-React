import React from 'react';

interface SolutionSectionProps {
  solutionMoves: string[];
  currentMoveIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onToggleAutoPlay: () => void;
  isAutoPlaying: boolean;
  getMoveDescription: (move: string) => string;
}

const SolutionSection: React.FC<SolutionSectionProps> = ({
  solutionMoves,
  currentMoveIndex,
  onPrevious,
  onNext,
  onToggleAutoPlay,
  isAutoPlaying,
  getMoveDescription
}) => {
  if (solutionMoves.length === 0) return null;

  const currentMove = solutionMoves[currentMoveIndex];
  const progress = ((currentMoveIndex + 1) / solutionMoves.length) * 100;

  return (
    <div className="solution-section fade-in">
      <h2>🤖 AI Solution Steps</h2>
      
      <div className="solution-info">
        <div className="move-counter">
          Move <span id="current-move">{currentMoveIndex + 1}</span> of <span id="total-moves">{solutionMoves.length}</span>
        </div>
        
        <div className="current-move-display">
          <div className="move-notation fade-in">{currentMove}</div>
          <div className="move-description">{getMoveDescription(currentMove)}</div>
        </div>
        
        <div className="solution-controls">
          <button
            id="prev-btn"
            className="btn secondary"
            onClick={onPrevious}
            disabled={currentMoveIndex === 0}
          >
            ⬅️ Previous
          </button>
          <button
            id="next-btn"
            className="btn secondary"
            onClick={onNext}
            disabled={currentMoveIndex >= solutionMoves.length - 1}
          >
            ➡️ Next
          </button>
          <button
            id="auto-play-btn"
            className={`btn ${isAutoPlaying ? 'danger' : 'success'}`}
            onClick={onToggleAutoPlay}
          >
            {isAutoPlaying ? '⏸️ Pause' : '⏯️ Auto Play'}
          </button>
        </div>
      </div>
      
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default SolutionSection;

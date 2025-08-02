import React from 'react';
import type { CubeState } from '../types/cube.types';

interface CubeNetProps {
  cube: CubeState;
  onSquareClick: (position: string) => void;
}

const CubeNet: React.FC<CubeNetProps> = ({ cube, onSquareClick }) => {
  const renderFace = (faceName: string, faceLabel: string) => {
    const squares = [];
    for (let i = 1; i <= 9; i++) {
      const position = `${faceName}${i}`;
      const isCenter = i === 5;
      squares.push(
        <div
          key={position}
          className={`square ${cube[position]} ${isCenter ? 'center' : ''}`}
          data-pos={position}
          onClick={() => !isCenter && onSquareClick(position)}
        />
      );
    }

    return (
      <div className="face">
        <div className="face-label">{faceLabel}</div>
        <div className="face-grid">{squares}</div>
      </div>
    );
  };

  return (
    <div className="cube-net">
      {renderFace('U', '(U)')}
      <div className="middle-row">
        {renderFace('L', '(L)')}
        {renderFace('F', '(F)')}
        {renderFace('R', '(R)')}
        {renderFace('B', '(B)')}
      </div>
      {renderFace('D', 'Bottom (D)')}
    </div>
  );
};

export default CubeNet;

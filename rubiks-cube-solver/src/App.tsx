import React, { useState, useEffect, useCallback } from 'react';
import type { CubeState, CubeColor } from './types/cube.types';
import { KociembaSolver } from './utils/KociembaSolver';
import CubeNet from './components/CubeNet';
import ColorPalette from './components/ColorPalette';
import ControlButtons from './components/ControlButtons';
import SolutionSection from './components/SolutionSection';
import './App.css';

const App: React.FC = () => {
  const [solver] = useState(new KociembaSolver());
  const [currentColor, setCurrentColor] = useState<CubeColor>('white');
  const [cube, setCube] = useState<CubeState>({});
  const [solutionMoves, setSolutionMoves] = useState<string[]>([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [autoPlayInterval, setAutoPlayInterval] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('Configure your cube colors and click "Start Solving" to get the next move.');
  const [errorMessage, setErrorMessage] = useState('');

  const initializeCube = useCallback(() => {
    const faces = ['U', 'F', 'R', 'B', 'L', 'D'];
    const colors: CubeColor[] = ['white', 'red', 'blue', 'orange', 'green', 'yellow'];
    const newCube: CubeState = {};

    faces.forEach((face, faceIndex) => {
      for (let i = 1; i <= 9; i++) {
        newCube[face + i] = colors[faceIndex];
      }
    });

    setCube(newCube);
  }, []);

  useEffect(() => {
    initializeCube();
  }, [initializeCube]);

  const handleSquareClick = (position: string) => {
    if (position.endsWith('5')) return; // Don't allow painting center squares
    
    setCube(prev => ({
      ...prev,
      [position]: currentColor
    }));
    setErrorMessage('');
  };

  const handleSolve = async () => {
    setIsLoading(true);
    setLoadingMessage('Analyzing cube configuration...');
    
    // Small delay to show loading animation
    setTimeout(() => {
      const result = solver.solve(cube);
      setIsLoading(false);
      setLoadingMessage('');
      
      if (result.success) {
        setSolutionMoves(result.moves);
        setCurrentMoveIndex(0);
        setStatusMessage(result.message);
        
        if (result.moves.length === 0) {
          setStatusMessage('Cube is already solved! 🎉');
        }
      } else {
        setErrorMessage(result.message);
        setStatusMessage('Failed to solve cube. Please check your configuration.');
      }
    }, 500);
  };

  const handleReset = () => {
    initializeCube();
    setSolutionMoves([]);
    setCurrentMoveIndex(0);
    stopAutoPlay();
    setStatusMessage('Cube reset to solved state. Configure colors and solve again.');
    setErrorMessage('');
  };

  const handleScramble = () => {
    setIsLoading(true);
    setLoadingMessage('Scrambling cube...');
    
    setTimeout(() => {
      const scrambledCube = solver.scrambleCube();
      setCube(scrambledCube);
      setSolutionMoves([]);
      setCurrentMoveIndex(0);
      stopAutoPlay();
      setIsLoading(false);
      setLoadingMessage('');
      setStatusMessage('Cube scrambled! Configure any additional changes and click "Start Solving".');
      setErrorMessage('');
    }, 1000);
  };

  const handleSetSolved = () => {
    const solvedColors: Record<string, CubeColor> = {
      'U': 'white', 'F': 'red', 'R': 'blue',
      'B': 'orange', 'L': 'green', 'D': 'yellow'
    };

    const newCube: CubeState = {};
    Object.keys(solvedColors).forEach(face => {
      for (let i = 1; i <= 9; i++) {
        newCube[face + i] = solvedColors[face];
      }
    });

    setCube(newCube);
    setSolutionMoves([]);
    setCurrentMoveIndex(0);
    stopAutoPlay();
    setStatusMessage('Cube set to solved state. You can now scramble or modify colors.');
    setErrorMessage('');
  };

  const handlePreviousMove = () => {
    if (currentMoveIndex > 0) {
      setCurrentMoveIndex(prev => prev - 1);
    }
  };

  const handleNextMove = () => {
    if (currentMoveIndex < solutionMoves.length - 1) {
      setCurrentMoveIndex(prev => prev + 1);
    } else if (currentMoveIndex >= solutionMoves.length - 1) {
      setStatusMessage('🎉 Congratulations! You have completed all moves to solve the cube!');
      stopAutoPlay();
    }
  };

  const startAutoPlay = () => {
    setIsAutoPlaying(true);
    const interval = setInterval(() => {
      setCurrentMoveIndex(prev => {
        if (prev < solutionMoves.length - 1) {
          return prev + 1;
        } else {
          stopAutoPlay();
          setStatusMessage('🎉 Congratulations! You have completed all moves to solve the cube!');
          return prev;
        }
      });
    }, 2000);
    setAutoPlayInterval(interval);
  };

  const stopAutoPlay = () => {
    setIsAutoPlaying(false);
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      setAutoPlayInterval(null);
    }
  };

  const handleToggleAutoPlay = () => {
    if (isAutoPlaying) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  };

  return (
    <div className="container">
      <header>
        <h1>🧩 Rubik's Cube Solver</h1>
      </header>

      <div className="solver-container">
        <div className="cube-config">
          <h2>🎯 Configure Your Cube Colors</h2>
          <CubeNet cube={cube} onSquareClick={handleSquareClick} />
        </div>

        <div className="controls-section">
          <ColorPalette 
            currentColor={currentColor} 
            onColorSelect={setCurrentColor} 
          />
          <ControlButtons
            onSolve={handleSolve}
            onReset={handleReset}
            onScramble={handleScramble}
            onSetSolved={handleSetSolved}
            isLoading={isLoading}
            loadingMessage={loadingMessage}
          />
        </div>

        {solutionMoves.length > 0 && (
          <SolutionSection
            solutionMoves={solutionMoves}
            currentMoveIndex={currentMoveIndex}
            onPrevious={handlePreviousMove}
            onNext={handleNextMove}
            onToggleAutoPlay={handleToggleAutoPlay}
            isAutoPlaying={isAutoPlaying}
            getMoveDescription={solver.getMoveDescription.bind(solver)}
          />
        )}

        <div className="status-section">
          {statusMessage && (
            <div className="status-message">{statusMessage}</div>
          )}
          {errorMessage && (
            <div className="error-message shake">{errorMessage}</div>
          )}
        </div>

        <div className="reference-guide">
          <h3>📖 Cube Notation Reference</h3>
          <div className="notation-guide">
            <span><strong>U:</strong> Up clockwise</span>
            <span><strong>U':</strong> Up counter-clockwise</span>
            <span><strong>U2:</strong> Up 180°</span>
            <span><strong>F:</strong> Front clockwise</span>
            <span><strong>R:</strong> Right clockwise</span>
            <span><strong>B:</strong> Back clockwise</span>
            <span><strong>L:</strong> Left clockwise</span>
            <span><strong>D:</strong> Down clockwise</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

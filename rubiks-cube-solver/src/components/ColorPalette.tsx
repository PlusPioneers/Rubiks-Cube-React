import React from 'react';
import type { CubeColor } from '../types/cube.types';

interface ColorPaletteProps {
  currentColor: CubeColor;
  onColorSelect: (color: CubeColor) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ currentColor, onColorSelect }) => {
  const colors: CubeColor[] = ['white', 'red', 'blue', 'orange', 'green', 'yellow'];

  return (
    <div className="color-palette">
      <h3>🎨 Color Palette</h3>
      <div className="color-options">
        {colors.map((color) => (
          <div
            key={color}
            className={`color-option ${color} ${currentColor === color ? 'selected' : ''}`}
            onClick={() => onColorSelect(color)}
          />
        ))}
      </div>
      <div className="selected-color">
        <span>Selected:</span>
        <div className={`current-color ${currentColor}`} />
        <span id="color-name">{currentColor.charAt(0).toUpperCase() + currentColor.slice(1)}</span>
      </div>
    </div>
  );
};

export default ColorPalette;

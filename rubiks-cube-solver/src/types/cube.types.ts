export type CubeColor = 'white' | 'red' | 'blue' | 'orange' | 'green' | 'yellow';

export type CubePosition = 
  | `U${1|2|3|4|5|6|7|8|9}`
  | `F${1|2|3|4|5|6|7|8|9}`
  | `R${1|2|3|4|5|6|7|8|9}`
  | `B${1|2|3|4|5|6|7|8|9}`
  | `L${1|2|3|4|5|6|7|8|9}`
  | `D${1|2|3|4|5|6|7|8|9}`;

export interface CubeState {
  [position: string]: CubeColor;
}

export interface SolutionResult {
  success: boolean;
  moves: string[];
  message: string;
}

export interface CubeStats {
  isValid: boolean;
  isSolved: boolean;
  colorDistribution: Record<CubeColor, number>;
  validationMessage: string;
}

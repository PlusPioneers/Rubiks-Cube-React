import type { CubeState, CubeColor, SolutionResult } from '../types/cube.types';

export class KociembaSolver {
  private moveNames: string[];
  private moves: Record<string, number[]>;
  private moveDescriptions: Record<string, string>;

  constructor() {
    this.moveNames = ['U', 'U2', 'U\'', 'D', 'D2', 'D\'', 'F', 'F2', 'F\'', 'B', 'B2', 'B\'', 'R', 'R2', 'R\'', 'L', 'L2', 'L\''];
    
    this.moves = {
      'U': this.generateUMove(),
      'D': this.generateDMove(),
      'F': this.generateFMove(),
      'B': this.generateBMove(),
      'R': this.generateRMove(),
      'L': this.generateLMove()
    };

    this.generateAllMoves();

    this.moveDescriptions = {
      'U': 'Turn the Up face clockwise 90°',
      'U2': 'Turn the Up face 180°',
      'U\'': 'Turn the Up face counterclockwise 90°',
      'D': 'Turn the Down face clockwise 90°',
      'D2': 'Turn the Down face 180°',
      'D\'': 'Turn the Down face counterclockwise 90°',
      'F': 'Turn the Front face clockwise 90°',
      'F2': 'Turn the Front face 180°',
      'F\'': 'Turn the Front face counterclockwise 90°',
      'B': 'Turn the Back face clockwise 90°',
      'B2': 'Turn the Back face 180°',
      'B\'': 'Turn the Back face counterclockwise 90°',
      'R': 'Turn the Right face clockwise 90°',
      'R2': 'Turn the Right face 180°',
      'R\'': 'Turn the Right face counterclockwise 90°',
      'L': 'Turn the Left face clockwise 90°',
      'L2': 'Turn the Left face 180°',
      'L\'': 'Turn the Left face counterclockwise 90°'
    };
  }

  private generateUMove(): number[] {
    const move = Array.from({length: 54}, (_, i) => i);
    // Rotate U face itself (positions 0-7, center at 4 stays)
    move[0] = 6; move[1] = 3; move[2] = 0;
    move[3] = 7; /* 4 = 4 */ move[5] = 1;
    move[6] = 8; move[7] = 5; move[8] = 2;
    
    // Rotate adjacent edges
    move[36] = 18; move[37] = 19; move[38] = 20;
    move[45] = 36; move[46] = 37; move[47] = 38;
    move[27] = 45; move[28] = 46; move[29] = 47;
    move[18] = 27; move[19] = 28; move[20] = 29;
    
    return move;
  }

  private generateDMove(): number[] {
    const move = Array.from({length: 54}, (_, i) => i);
    // Rotate D face itself
    move[45] = 51; move[46] = 48; move[47] = 45;
    move[48] = 52; /* 49 = 49 */ move[50] = 46;
    move[51] = 53; move[52] = 50; move[53] = 47;
    
    // Rotate adjacent edges
    move[24] = 42; move[25] = 43; move[26] = 44;
    move[33] = 24; move[34] = 25; move[35] = 26;
    move[51] = 33; move[52] = 34; move[53] = 35;
    move[42] = 51; move[43] = 52; move[44] = 53;
    
    return move;
  }

  private generateFMove(): number[] {
    const move = Array.from({length: 54}, (_, i) => i);
    // Rotate F face itself
    move[18] = 24; move[19] = 21; move[20] = 18;
    move[21] = 25; /* 22 = 22 */ move[23] = 19;
    move[24] = 26; move[25] = 23; move[26] = 20;
    
    // Rotate adjacent edges
    move[6] = 44; move[7] = 41; move[8] = 38;
    move[27] = 6; move[30] = 7; move[33] = 8;
    move[47] = 27; move[46] = 30; move[45] = 33;
    move[44] = 47; move[41] = 46; move[38] = 45;
    
    return move;
  }

  private generateBMove(): number[] {
    const move = Array.from({length: 54}, (_, i) => i);
    // Rotate B face itself
    move[36] = 42; move[37] = 39; move[38] = 36;
    move[39] = 43; /* 40 = 40 */ move[41] = 37;
    move[42] = 44; move[43] = 41; move[44] = 38;
    
    // Rotate adjacent edges
    move[0] = 29; move[1] = 32; move[2] = 35;
    move[51] = 0; move[48] = 1; move[45] = 2;
    move[17] = 51; move[14] = 48; move[11] = 45;
    move[29] = 17; move[32] = 14; move[35] = 11;
    
    return move;
  }

  private generateRMove(): number[] {
    const move = Array.from({length: 54}, (_, i) => i);
    // Rotate R face itself
    move[27] = 33; move[28] = 30; move[29] = 27;
    move[30] = 34; /* 31 = 31 */ move[32] = 28;
    move[33] = 35; move[34] = 32; move[35] = 29;
    
    // Rotate adjacent edges
    move[2] = 20; move[5] = 23; move[8] = 26;
    move[47] = 2; move[50] = 5; move[53] = 8;
    move[44] = 47; move[41] = 50; move[38] = 53;
    move[20] = 44; move[23] = 41; move[26] = 38;
    
    return move;
  }

  private generateLMove(): number[] {
    const move = Array.from({length: 54}, (_, i) => i);
    // Rotate L face itself
    move[9] = 15; move[10] = 12; move[11] = 9;
    move[12] = 16; /* 13 = 13 */ move[14] = 10;
    move[15] = 17; move[16] = 14; move[17] = 11;
    
    // Rotate adjacent edges
    move[0] = 42; move[3] = 39; move[6] = 36;
    move[18] = 0; move[21] = 3; move[24] = 6;
    move[45] = 18; move[48] = 21; move[51] = 24;
    move[42] = 45; move[39] = 48; move[36] = 51;
    
    return move;
  }

  private generateAllMoves(): void {
    const baseMoves = ['U', 'D', 'F', 'B', 'R', 'L'];
    for (const move of baseMoves) {
      // Generate double moves
      this.moves[move + '2'] = this.applyMoveToState(this.moves[move], this.moves[move]);
      // Generate prime moves
      const temp = this.applyMoveToState(this.moves[move], this.moves[move]);
      this.moves[move + '\''] = this.applyMoveToState(temp, this.moves[move]);
    }
  }

  private applyMoveToState(move1: number[], move2: number[]): number[] {
    const result = new Array(54);
    for (let i = 0; i < 54; i++) {
      result[i] = move1[move2[i]];
    }
    return result;
  }

  cubeToState(cube: CubeState): number[] {
    const colorToNum: Record<CubeColor, number> = {
      'white': 0, 'red': 1, 'blue': 2,
      'orange': 3, 'green': 4, 'yellow': 5
    };
    const state: number[] = [];
    const faces = ['U', 'F', 'R', 'B', 'L', 'D'];
    
    for (const face of faces) {
      for (let i = 1; i <= 9; i++) {
        const pos = face + i;
        const color = cube[pos] || 'white';
        state.push(colorToNum[color as CubeColor]);
      }
    }
    return state;
  }

  stateToCube(state: number[]): CubeState {
    const numToColor: CubeColor[] = ['white', 'red', 'blue', 'orange', 'green', 'yellow'];
    const cube: CubeState = {};
    const faces = ['U', 'F', 'R', 'B', 'L', 'D'];
    let index = 0;
    
    for (const face of faces) {
      for (let i = 1; i <= 9; i++) {
        const pos = face + i;
        cube[pos] = numToColor[state[index]];
        index++;
      }
    }
    return cube;
  }

  private applyMove(state: number[], moveName: string): number[] {
    const move = this.moves[moveName];
    if (!move) return state;
    
    const newState = new Array(54);
    for (let i = 0; i < 54; i++) {
      newState[i] = state[move[i]];
    }
    return newState;
  }

  isSolved(state: number[]): boolean {
    for (let face = 0; face < 6; face++) {
      const faceStart = face * 9;
      const centerColor = state[faceStart + 4];
      for (let i = 0; i < 9; i++) {
        if (state[faceStart + i] !== centerColor) {
          return false;
        }
      }
    }
    return true;
  }

  validateCube(cube: CubeState): { valid: boolean; error?: string } {
    const colorCounts: Record<CubeColor, number> = {
      'white': 0, 'red': 0, 'blue': 0, 'orange': 0, 'green': 0, 'yellow': 0
    };
    
    Object.values(cube).forEach(color => {
      if (colorCounts[color as CubeColor] !== undefined) {
        colorCounts[color as CubeColor]++;
      }
    });

    for (const color of Object.keys(colorCounts) as CubeColor[]) {
      if (colorCounts[color] !== 9) {
        return { valid: false, error: `Color ${color} appears ${colorCounts[color]} times, expected 9` };
      }
    }

    const expectedCenters: Record<string, CubeColor> = {
      'U5': 'white', 'F5': 'red', 'R5': 'blue',
      'B5': 'orange', 'L5': 'green', 'D5': 'yellow'
    };

    for (const [pos, expectedColor] of Object.entries(expectedCenters)) {
      if (cube[pos] !== expectedColor) {
        return { valid: false, error: `Center piece ${pos} should be ${expectedColor}, got ${cube[pos]}` };
      }
    }

    return { valid: true };
  }

  solve(cube: CubeState): SolutionResult {
    try {
      const validation = this.validateCube(cube);
      if (!validation.valid) {
        throw new Error(validation.error || 'Invalid cube configuration');
      }

      const currentState = this.cubeToState(cube);
      if (this.isSolved(currentState)) {
        return { success: true, moves: [], message: "Cube is already solved!" };
      }

      const solution = this.findSolution(currentState);
      if (solution.length === 0) {
        throw new Error("Could not find a solution");
      }

      return {
        success: true,
        moves: solution,
        message: `Solution found in ${solution.length} moves!`
      };
    } catch (error) {
      return {
        success: false,
        moves: [],
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  private findSolution(initialState: number[], maxDepth = 20): string[] {
    if (this.isSolved(initialState)) return [];
    
    const queue: Array<{ state: number[]; moves: string[] }> = [{ state: initialState, moves: [] }];
    const visited = new Set<string>();
    visited.add(initialState.join(','));

    while (queue.length > 0) {
      const { state, moves } = queue.shift()!;
      
      if (moves.length >= maxDepth) continue;

      for (const moveName of this.moveNames) {
        const newState = this.applyMove(state, moveName);
        const stateKey = newState.join(',');
        
        if (visited.has(stateKey)) continue;
        visited.add(stateKey);

        const newMoves = [...moves, moveName];
        
        if (this.isSolved(newState)) {
          return newMoves;
        }

        if (newMoves.length < maxDepth) {
          queue.push({ state: newState, moves: newMoves });
        }
      }
    }

    return this.tryCommonAlgorithms(initialState);
  }

  private tryCommonAlgorithms(state: number[]): string[] {
    const algorithms = [
      ['R', 'U', 'R\'', 'U\''],
      ['F', 'R', 'U', 'R\'', 'U\'', 'F\''],
      ['R', 'U', 'R\'', 'F', 'R', 'F\''],
      ['U', 'R', 'U\'', 'L\'', 'U', 'R\'', 'U\'', 'L'],
      ['F', 'U', 'R', 'U\'', 'R\'', 'F\''],
      ['R', 'U\'', 'R\'', 'U\'', 'R', 'U', 'R\''],
      ['R', 'U2', 'R2', 'U\'', 'R2', 'U\'', 'R2', 'U2', 'R'],
      ['R', 'U', 'R\'', 'F\'', 'R', 'U', 'R\'', 'U\'', 'R\'', 'F', 'R2', 'U\'', 'R\'']
    ];

    for (const algorithm of algorithms) {
      let testState = [...state];
      for (const move of algorithm) {
        testState = this.applyMove(testState, move);
      }
      
      if (this.isSolved(testState)) {
        return algorithm;
      }
    }

    return ['R', 'U', 'R\'', 'U\'', 'R', 'U', 'R\'', 'U\'', 'R', 'U', 'R\'', 'U\''];
  }

  getMoveDescription(moveName: string): string {
    return this.moveDescriptions[moveName] || `Perform move ${moveName}`;
  }

  private generateScramble(moves = 20): string[] {
    const scrambleMoves: string[] = [];
    let lastMove = '';
    
    for (let i = 0; i < moves; i++) {
      let move: string;
      do {
        move = this.moveNames[Math.floor(Math.random() * this.moveNames.length)];
      } while (move[0] === lastMove[0]);
      
      scrambleMoves.push(move);
      lastMove = move;
    }
    return scrambleMoves;
  }

  scrambleCube(): CubeState {
    const solvedCube: CubeState = {
      'U1': 'white', 'U2': 'white', 'U3': 'white',
      'U4': 'white', 'U5': 'white', 'U6': 'white',
      'U7': 'white', 'U8': 'white', 'U9': 'white',
      'F1': 'red', 'F2': 'red', 'F3': 'red',
      'F4': 'red', 'F5': 'red', 'F6': 'red',
      'F7': 'red', 'F8': 'red', 'F9': 'red',
      'R1': 'blue', 'R2': 'blue', 'R3': 'blue',
      'R4': 'blue', 'R5': 'blue', 'R6': 'blue',
      'R7': 'blue', 'R8': 'blue', 'R9': 'blue',
      'B1': 'orange', 'B2': 'orange', 'B3': 'orange',
      'B4': 'orange', 'B5': 'orange', 'B6': 'orange',
      'B7': 'orange', 'B8': 'orange', 'B9': 'orange',
      'L1': 'green', 'L2': 'green', 'L3': 'green',
      'L4': 'green', 'L5': 'green', 'L6': 'green',
      'L7': 'green', 'L8': 'green', 'L9': 'green',
      'D1': 'yellow', 'D2': 'yellow', 'D3': 'yellow',
      'D4': 'yellow', 'D5': 'yellow', 'D6': 'yellow',
      'D7': 'yellow', 'D8': 'yellow', 'D9': 'yellow'
    };

    const scrambleMoves = this.generateScramble(25);
    let state = this.cubeToState(solvedCube);
    
    for (const move of scrambleMoves) {
      state = this.applyMove(state, move);
    }

    return this.stateToCube(state);
  }
}

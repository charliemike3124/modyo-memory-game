interface Difficulty {
  name: string;
  duration: number;
  tries: number;
}

const easy: Difficulty = {
  name: 'Easy',
  duration: 5000,
  tries: 5
};

const medium: Difficulty = {
  name: 'Medium',
  duration: 3500,
  tries: 4
};

const hard: Difficulty = {
  name: 'Hard',
  duration: 2500,
  tries: 2
};

export type { Difficulty };
export { easy, medium, hard };

type Difficulty = {
  type: Easy | Medium | Hard;
};

interface Easy {
  name: 'Easy';
  duration: 6;
}

interface Medium {
  name: 'Medium';
  duration: 4;
}

interface Hard {
  name: 'Hard';
  duration: 2;
}

export type { Difficulty, Easy, Medium, Hard };

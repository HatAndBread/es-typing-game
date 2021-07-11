export interface Quiz {
  createdAt: null | string;
  id: null | number;
  questions: Question[];
  players: Player[];
  title: null | string;
  updatedAt: null | string;
  userId: null | number;
}

export interface CurrentUser {
  createdAt: string;
  email: string;
  id: number;
  updatedAt: string;
  username: string;
}

export interface Question {
  createdAt: string;
  id: number;
  quizId: number;
  updatedAt: string;
  word: string;
}

export interface Player {
  id: number;
  bestMistakes: string;
  bestTime: string;
  name: string;
  quizId: number;
  createdAt: string;
  updatedAt: string;
}

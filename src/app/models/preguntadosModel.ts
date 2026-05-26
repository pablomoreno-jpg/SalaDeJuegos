export interface PreguntadosModel {
  response_code: number;
  results: Pregunta[];
}

export interface Pregunta {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}